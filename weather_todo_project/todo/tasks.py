from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import Task
from datetime import date, timedelta

@shared_task
def send_task_reminders():
    """Send email reminders for tasks due tomorrow"""
    tomorrow = date.today() + timedelta(days=1)
    tasks_due = Task.objects.filter(
        due_date=tomorrow,
        status='in_progress'
    ).select_related('created_by').prefetch_related('assigned_to')
    
    reminders_sent = 0
    
    for task in tasks_due:
        recipients = []
        if task.created_by.email and task.created_by.profile.receive_email_notifications:
            recipients.append(task.created_by.email)
        
        for user in task.assigned_to.all():
            if user.email and user.profile.receive_email_notifications:
                recipients.append(user.email)
        
        if recipients:
            subject = f'Reminder: Task "{task.title}" is due tomorrow'
            
            context = {
                'task': task,
                'due_date': tomorrow,
                'site_url': settings.SITE_URL
            }
            
            html_message = render_to_string('todo/email/task_reminder.html', context)
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject,
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                recipients,
                html_message=html_message,
                fail_silently=False,
            )
            reminders_sent += 1
    
    return f'Sent {reminders_sent} task reminders'

@shared_task
def send_shared_task_notification(task_id, shared_by_id, recipient_email):
    """Send notification when a task is shared"""
    from .models import Task
    from django.contrib.auth.models import User
    
    task = Task.objects.get(id=task_id)
    shared_by = User.objects.get(id=shared_by_id)
    
    subject = f"{shared_by.username} shared a task with you: {task.title}"
    
    context = {
        'task': task,
        'shared_by': shared_by,
        'site_url': settings.SITE_URL
    }
    
    html_message = render_to_string('todo/email/share_task.html', context)
    plain_message = strip_tags(html_message)
    
    send_mail(
        subject,
        plain_message,
        settings.DEFAULT_FROM_EMAIL,
        [recipient_email],
        html_message=html_message,
        fail_silently=False,
    )
    
    return f'Shared task notification sent to {recipient_email}'