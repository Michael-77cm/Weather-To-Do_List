import requests
from django.conf import settings
from datetime import datetime

def get_weather_data(city):
    """Fetch current weather data from OpenWeatherMap API"""
    params = {
        'q': city,
        'appid': settings.WEATHER_API_KEY,
        'units': 'metric'
    }
    
    try:
        response = requests.get(settings.WEATHER_API_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return None

def get_weather_forecast(city):
    """Fetch 5-day weather forecast"""
    params = {
        'q': city,
        'appid': settings.WEATHER_API_KEY,
        'units': 'metric',
        'cnt': 40  # 5 days * 8 intervals per day
    }
    
    try:
        response = requests.get(settings.WEATHER_FORECAST_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return None

def get_weather_animation(weather_condition):
    """Return appropriate animation class based on weather condition"""
    animations = {
        'Clear': 'sunny-animation',
        'Clouds': 'cloudy-animation',
        'Rain': 'rainy-animation',
        'Snow': 'snowy-animation',
        'Thunderstorm': 'storm-animation',
        'Drizzle': 'drizzle-animation',
        'Mist': 'mist-animation',
        'Fog': 'fog-animation',
        'Haze': 'haze-animation'
    }
    
    return animations.get(weather_condition, 'default-animation')

def get_all_cities():
    """Return a list of major cities for autocomplete"""
    major_cities = [
        "New York", "London", "Tokyo", "Paris", "Sydney", 
        "Dubai", "Singapore", "Hong Kong", "Los Angeles", 
        "Chicago", "Houston", "Philadelphia", "Phoenix", 
        "San Antonio", "San Diego", "Dallas", "San Jose",
        "Austin", "Jacksonville", "Fort Worth", "Columbus",
        "Charlotte", "San Francisco", "Indianapolis", "Seattle",
        "Denver", "Washington", "Boston", "El Paso", "Nashville",
        "Detroit", "Oklahoma City", "Portland", "Las Vegas",
        "Memphis", "Louisville", "Baltimore", "Milwaukee",
        "Albuquerque", "Tucson", "Fresno", "Sacramento",
        "Kansas City", "Atlanta", "Miami", "New Orleans",
        "Cleveland", "Tampa", "Pittsburgh", "Cincinnati",
        "Toronto", "Vancouver", "Montreal", "Mexico City",
        "Berlin", "Madrid", "Rome", "Amsterdam", "Brussels",
        "Vienna", "Zurich", "Geneva", "Stockholm", "Oslo",
        "Copenhagen", "Helsinki", "Dublin", "Lisbon", "Athens",
        "Moscow", "Saint Petersburg", "Istanbul", "Cairo",
        "Johannesburg", "Cape Town", "Nairobi", "Lagos",
        "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai",
        "Beijing", "Shanghai", "Guangzhou", "Shenzhen",
        "Seoul", "Busan", "Bangkok", "Phuket", "Kuala Lumpur",
        "Jakarta", "Manila", "Ho Chi Minh City", "Hanoi",
        "Perth", "Melbourne", "Brisbane", "Adelaide",
        "Auckland", "Wellington", "Christchurch"
    ]
    return sorted(major_cities)