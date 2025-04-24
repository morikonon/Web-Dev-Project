from django.urls import path
from .views import BookViewSet, GenreViewSet, PublisherViewSet
from .views import get_all_genres, get_all_publishers, get_all_age_limits
urlpatterns = [
    # BookViewSet URLs
    path('', BookViewSet.as_view({'get': 'list', 'post': 'create'}), name='book-list'),
    path('<int:pk>/', BookViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='book-detail'),
    path('popular/', BookViewSet.as_view({'get': 'popular'}), name='book-popular'),

    # GenreViewSet URLs
    path('genres/', GenreViewSet.as_view({'get': 'list', 'post': 'create'}), name='genre-list'),
    path('genres/<int:pk>/', GenreViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='genre-detail'),
    path('genres/popular/', GenreViewSet.as_view({'get': 'popular'}), name='genre-popular'),

    # PublisherViewSet URLs
    path('publishers/', PublisherViewSet.as_view({'get': 'list', 'post': 'create'}), name='publisher-list'),
    path('publishers/<int:pk>/', PublisherViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='publisher-detail'),
    path('publishers/recent/', PublisherViewSet.as_view({'get': 'recent'}), name='publisher-recent'),
]
urlpatterns += [
    path('genres/choices/', get_all_genres, name='genre-choices'),
    path('publishers/choices/', get_all_publishers, name='publisher-choices'),
    path('age-limits/', get_all_age_limits, name='age-limit-choices'),
]