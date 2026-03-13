from django import forms
from .models import Task, TaskCategory
from django.contrib.auth.models import User

class TaskForm(forms.ModelForm):
    due_date = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        required=False
    )
    due_time = forms.TimeField(
        widget=forms.TimeInput(attrs={'type': 'time', 'class': 'form-control'}),
        required=False
    )
    assigned_to = forms.ModelMultipleChoiceField(
        queryset=User.objects.none(),
        widget=forms.SelectMultiple(attrs={'class': 'form-control select2'}),
        required=False
    )
    
    class Meta:
        model = Task
        fields = ['title', 'description', 'category', 'priority', 'due_date', 'due_time', 'assigned_to']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter task title'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3, 'placeholder': 'Enter task description'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'priority': forms.Select(attrs={'class': 'form-control'}),
        }
    
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if user:
            self.fields['assigned_to'].queryset = User.objects.exclude(id=user.id)
        self.fields['category'].queryset = TaskCategory.objects.all()

class ShareTaskForm(forms.Form):
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter email address'})
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 2, 'placeholder': 'Add a personal message (optional)'}),
        required=False
    )