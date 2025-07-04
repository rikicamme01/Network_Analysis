from django.db import models
import string
import random

def generarte_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Network.objects.filter(code=code).count() == 0:
            break
    return code


# Create your models here.
class Network(models.Model):
    code = models.CharField(max_length=8, default = generarte_unique_code, unique = True)
    admin = models.CharField(max_length=50, unique =True)
    created_at = models.DateTimeField(auto_now_add=True)
    