from django.contrib import admin
from django.urls import path, include
from polyclinic.views.welcome import index, contact
from polyclinic.views.welcome import home

urlpatterns = [

    path('', index),
    path('problem', index),
    path('contact-us', contact),
    path('forgot-password', index),
    path('home', home),

]


def welcome_urls():
    return urlpatterns, 'welcome', 'welcome'
