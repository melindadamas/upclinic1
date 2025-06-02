from django.contrib import admin
from django.urls import path
# Importa a função health_check do views.py que você criou/verificou
# Este caminho de importação (backend.users.views) assume que o views.py
# está em C:\projetos\clinic_app_workspace\backend\backend\users\views.py
from backend.users.views import health_check

urlpatterns = [
    path("admin/", admin.site.urls),
    path("hc/", health_check, name="health_check"), # Rota para o health check
    # Se você tinha outras URLs aqui antes (como para api/auth/), 
    # você precisará adicioná-las de volta se ainda forem necessárias.
    # Por exemplo, se você tem um app 'users' com seu próprio 'urls.py':
    # from django.urls import include
    # path("api/auth/", include("backend.users.urls")),
]
