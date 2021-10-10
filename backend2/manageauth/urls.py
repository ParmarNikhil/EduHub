from django.urls import path
from .views import current_user, userlist

urlpatterns = [
    path('current_user/', current_user),
    path('users/', userlist),
]