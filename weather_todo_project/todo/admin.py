from django.contrib import admin
from .models import TaskCategory, Task, SharedTask

@admin.register(TaskCategory)
class TaskCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class SharedTaskInline(admin.TabularInline):
    model = SharedTask
    extra = 0
    readonly_fields = ('shared_at',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'category', 'status', 'priority', 'due_date', 'created_at')
    list_filter = ('status', 'priority', 'category', 'created_by')
    search_fields = ('title', 'description', 'created_by__username')
    date_hierarchy = 'created_at'
    inlines = [SharedTaskInline]
    filter_horizontal = ('assigned_to',)
    readonly_fields = ('created_at', 'updated_at', 'completed_at')

@admin.register(SharedTask)
class SharedTaskAdmin(admin.ModelAdmin):
    list_display = ('task', 'shared_by', 'shared_with_email', 'shared_at', 'is_accepted')
    list_filter = ('is_accepted', 'shared_at')
    search_fields = ('task__title', 'shared_with_email', 'shared_by__username')
    readonly_fields = ('shared_at',)