from django.db import models

# Create your models here.

class FileUpload(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField()
    
    # data = models.CharField(max_length=100000, default="")
    

    def __str__(self):
        return self.file.path