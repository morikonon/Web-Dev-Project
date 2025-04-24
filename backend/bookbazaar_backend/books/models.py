from django.db import models

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Publisher(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Book(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    author = models.CharField(max_length=100)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='books')
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name='books')
    publication_date = models.DateField()
    age_limit = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    popularity = models.PositiveIntegerField(default=0)
    image_url = models.URLField(blank=True, null=True) 
    image = models.ImageField(upload_to='books/images/', blank=True, null=True)  

    def __str__(self):
        return self.title

    def update_stock(self, quantity):
        
        self.stock -= quantity
        self.save()