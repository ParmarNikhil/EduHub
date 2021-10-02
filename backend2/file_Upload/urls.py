from django.conf.urls import url
from django.urls import path
from .views import uploadMaterial, fetchMaterial, openMaterial

urlpatterns = [
      url('upload', uploadMaterial, name='upload-material'),
      url('fetch', fetchMaterial, name='upload-material'),
      path('open/<int:id>/', openMaterial, name='open-material'),
]