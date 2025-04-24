from rest_framework import serializers
from .models import Book, Genre, Publisher

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)
    publisher = PublisherSerializer(read_only=True)
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'description', 'author', 'genre', 'publisher', 'publication_date', 'age_limit', 'price', 'stock', 'popularity', 'image_url' ]

class BookCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'description', 'author', 'genre', 'publisher', 'publication_date', 'age_limit', 'price', 'stock', 'image_url' ]