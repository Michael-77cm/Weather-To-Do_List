// Main JavaScript file for Todo & Weather App

$(document).ready(function() {
    'use strict';
    
    // ============================================
    // Global Variables
    // ============================================
    const CSRF_TOKEN = $('input[name="csrfmiddlewaretoken"]').val();
    
    // ============================================
    // Initialize Tooltips
    // ============================================
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // ============================================
    // Auto-hide Alerts
    // ============================================
    function setupAlerts() {
        setTimeout(function() {
            $('.alert').fadeOut('slow', function() {
                $(this).remove();
            });
        }, 5000);
    }
    
    // ============================================
    // Toggle Todo Completion (AJAX)
    // ============================================
    function setupTodoToggles() {
        $('.toggle-complete').click(function(e) {
            e.preventDefault();
            
            const button = $(this);
            const todoItem = button.closest('.todo-item');
            const todoId = todoItem.data('todo-id');
            const isComplete = button.hasClass('btn-success');
            
            // Disable button during request
            button.prop('disabled', true);
            
            $.ajax({
                url: `/toggle/${todoId}/`,
                method: 'POST',
                headers: {
                    'X-CSRFToken': CSRF_TOKEN
                },
                success: function(response) {
                    if (response.success) {
                        // Show success message
                        showNotification(response.message, 'success');
                        
                        // Reload page after short delay
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    } else {
                        showNotification('Error toggling task', 'error');
                    }
                },
                error: function() {
                    showNotification('Network error. Please try again.', 'error');
                },
                complete: function() {
                    button.prop('disabled', false);
                }
            });
        });
    }
    
    // ============================================
    // Delete Todo with Confirmation
    // ============================================
    function setupDeleteButtons() {
        $('.delete-btn, a[href*="delete"]').click(function(e) {
            if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    }
    
    // ============================================
    // Form Validation
    // ============================================
    function setupFormValidation() {
        // Add validation to all forms
        $('form').each(function() {
            const form = $(this);
            
            // Prevent multiple submissions
            form.submit(function() {
                const submitBtn = $(this).find('button[type="submit"]');
                if (submitBtn.data('submitted')) {
                    return false;
                }
                submitBtn.data('submitted', true);
                submitBtn.prop('disabled', true);
                
                // Add loading spinner
                if (!submitBtn.find('.spinner-border').length) {
                    submitBtn.prepend('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>');
                }
            });
            
            // Validate required fields
            form.find('input[required], select[required], textarea[required]').each(function() {
                $(this).on('blur', function() {
                    validateField($(this));
                });
            });
        });
    }
    
    function validateField(field) {
        const value = field.val().trim();
        const isRequired = field.prop('required');
        
        if (isRequired && !value) {
            field.addClass('is-invalid');
            if (!field.next('.invalid-feedback').length) {
                field.after('<div class="invalid-feedback">This field is required.</div>');
            }
        } else {
            field.removeClass('is-invalid');
            field.next('.invalid-feedback').remove();
        }
    }
    
    // ============================================
    // Show Notification
    // ============================================
    function showNotification(message, type) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show animate__animated animate__fadeInDown" role="alert">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Remove existing alerts
        $('.alert').remove();
        
        // Add new alert at the top of the container
        $('.container:first').prepend(alertHtml);
        
        // Auto-hide after 3 seconds
        setTimeout(function() {
            $('.alert').fadeOut('slow', function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    // ============================================
    // Search/Filter Todos
    // ============================================
    function setupTodoSearch() {
        // Add search input if not exists
        if ($('.todo-list').length && !$('#todo-search').length) {
            const searchHtml = `
                <div class="mb-3">
                    <input type="text" id="todo-search" class="form-control" placeholder="Search tasks...">
                </div>
            `;
            $('.todo-list').before(searchHtml);
        }
        
        $('#todo-search').on('keyup', function() {
            const searchTerm = $(this).val().toLowerCase();
            
            $('.todo-item').each(function() {
                const title = $(this).find('.todo-title').text().toLowerCase();
                const description = $(this).find('.todo-description').text().toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    }
    
    // ============================================
    // Sort Todos
    // ============================================
    function setupTodoSort() {
        if ($('.todo-list').length && !$('#todo-sort').length) {
            const sortHtml = `
                <div class="mb-3">
                    <select id="todo-sort" class="form-select">
                        <option value="default">Default Order</option>
                        <option value="priority">Priority</option>
                        <option value="due-date">Due Date</option>
                        <option value="alphabetical">Alphabetical</option>
                    </select>
                </div>
            `;
            $('.todo-list').before(sortHtml);
        }
        
        $('#todo-sort').change(function() {
            const sortBy = $(this).val();
            const todoList = $(this).siblings('.todo-list');
            const items = todoList.children('.todo-item').get();
            
            items.sort(function(a, b) {
                switch(sortBy) {
                    case 'priority':
                        return getPriorityValue($(a)) - getPriorityValue($(b));
                    case 'due-date':
                        return getDueDateValue($(a)) - getDueDateValue($(b));
                    case 'alphabetical':
                        return $(a).find('.todo-title').text().localeCompare($(b).find('.todo-title').text());
                    default:
                        return 0;
                }
            });
            
            $.each(items, function(index, item) {
                todoList.append(item);
            });
        });
    }
    
    function getPriorityValue(item) {
        const priority = item.find('.badge:first').text().toLowerCase();
        const priorities = { 'high': 1, 'medium': 2, 'low': 3 };
        return priorities[priority] || 4;
    }
    
    function getDueDateValue(item) {
        const dateText = item.find('.fa-calendar').parent().text().trim();
        if (!dateText) return Infinity;
        
        const dateMatch = dateText.match(/\d{4}-\d{2}-\d{2}/);
        if (dateMatch) {
            return new Date(dateMatch[0]).getTime();
        }
        return Infinity;
    }
    
    // ============================================
    // Keyboard Shortcuts
    // ============================================
    function setupKeyboardShortcuts() {
        $(document).on('keydown', function(e) {
            // Ctrl/Cmd + N for new task
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                window.location.href = '/add/';
            }
            
            // Ctrl/Cmd + F for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                $('#todo-search').focus();
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                $('#todo-search').val('').trigger('keyup');
            }
        });
    }
    
    // ============================================
    // Progress Tracking
    // ============================================
    function updateProgress() {
        const totalTasks = parseInt($('#total-tasks').text()) || 0;
        const completedTasks = parseInt($('#completed-tasks').text()) || 0;
        
        if (totalTasks > 0) {
            const percentage = Math.round((completedTasks / totalTasks) * 100);
            
            // Create or update progress bar
            if (!$('#progress-bar').length) {
                const progressHtml = `
                    <div class="progress mb-3" style="height: 10px;">
                        <div id="progress-bar" class="progress-bar bg-success" role="progressbar" style="width: ${percentage}%"></div>
                    </div>
                `;
                $('.stats-cards').after(progressHtml);
            } else {
                $('#progress-bar').css('width', percentage + '%');
            }
        }
    }
    
    // ============================================
    // Initialize everything
    // ============================================
    function init() {
        initTooltips();
        setupAlerts();
        setupTodoToggles();
        setupDeleteButtons();
        setupFormValidation();
        setupTodoSearch();
        setupTodoSort();
        setupKeyboardShortcuts();
        updateProgress();
        
        // Add CSRF token to all AJAX requests
        $.ajaxSetup({
            headers: {
                'X-CSRFToken': CSRF_TOKEN
            }
        });
        
        console.log('Todo & Weather App initialized successfully!');
    }
    
    // Start the app
    init();
});