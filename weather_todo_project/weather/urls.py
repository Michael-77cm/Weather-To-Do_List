from django.urls import path
from . import views

app_name = 'weather'

urlpatterns = [
    path('', views.weather_dashboard, name='dashboard'),
    path('get/', views.get_weather, name='get_weather'),
    path('history/', views.search_history, name='search_history'),
]