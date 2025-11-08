
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet
router = DefaultRouter()
router.register('chat', ChatViewSet, basename='chat')
urlpatterns = router.urls
