# datasets/urls.py

from django.urls import path
from .views import upload_file
from .views import get_datasets

urlpatterns = [
    path('upload/', upload_file, name='upload_file'),
    path('api/', get_datasets, name='get_datasets'),
]
