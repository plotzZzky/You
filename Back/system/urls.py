from django.contrib import admin
from django.urls import path, include
from django.views.static import serve
from django.conf import settings
from django.conf.urls.static import static

from posts.urls import posts_router
from accounts.urls import users_router


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include(users_router.urls)),
    path('', include(posts_router.urls)),
    path('media/<path:path>/', serve, {'document_root': settings.MEDIA_ROOT}),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
