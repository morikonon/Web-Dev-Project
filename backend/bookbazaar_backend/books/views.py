from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Book, Genre, Publisher
from .serializers import BookSerializer, BookCreateSerializer, GenreSerializer, PublisherSerializer



class BookViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['genre', 'publisher', 'age_limit']
    search_fields = ['title']
    ordering_fields = ['popularity', 'title', 'publication_date', 'price']

    def get_queryset(self):
        queryset = Book.objects.all()
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return BookCreateSerializer
        return BookSerializer

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def popular(self, request):
        popular_books = Book.objects.order_by('-popularity')[:5]
        serializer = BookSerializer(popular_books, many=True)
        return Response(serializer.data)



class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def popular(self, request):
        popular_genres = Genre.objects.order_by('name')[:5]
        serializer = GenreSerializer(popular_genres, many=True)
        return Response(serializer.data)



class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def recent(self, request):
        recent_publishers = Publisher.objects.order_by('name')[:5]
        serializer = self.get_serializer(recent_publishers, many=True)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_all_genres(request):
    genres = Genre.objects.values_list('name', flat=True).distinct()
    return Response(genres)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_all_publishers(request):
    publishers = Publisher.objects.values_list('name', flat=True).distinct()
    return Response(publishers)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_age_limits(request):
    age_limits = Book.objects.values_list('age_limit', flat=True).distinct()
    return Response(age_limits)
