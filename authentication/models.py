from django.contrib.auth.models import AbstractUser
from django.db import models

SEXE = [
    ('Male', 'Male'),
    ('Female', 'Female'),
]

USER_TYPE = [
    ('Medical', 'Medical'),
    ('Accountant', 'Accountant'),
]


# Create your models here.
class User(AbstractUser):
    cniNumber = models.CharField(max_length=255, blank=True, default="")
    gender = models.CharField(max_length=50, choices=SEXE, default='Male', blank=True)
    phoneNumber = models.CharField(max_length=255, blank=True, default=" ")
    birthDate = models.DateField(blank=True, null=True, default="1982-01-01")
    address = models.CharField(max_length=255, blank=True, default="Yaounde - damas")
    userType = models.CharField(max_length=255, choices=USER_TYPE, default='Medical', null=False)
