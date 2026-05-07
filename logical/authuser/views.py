from django.contrib.auth.hashers import check_password
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import messages
from django.db.models import Q, Count
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import generate_token
from .serializers import RegisterSerializer

from cameras.models import Brands, CameraModel, CameraConfiguration, Camera, Users

# Create your views here.


@api_view(["POST"])
def login_user_view(request):
    """Ingreso de usuario"""
    email = request.data.get("email", "").strip().lower()
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")
    
    if not email or not password:
        return Response({"error": "Email and password are required."},status=status.HTTP_400_BAD_REQUEST)
    try:
        user = Users.objects.get(email=email) or Users.objects.get(username=username)
    except Users.DoesNotExist:
        return Response({"error": "Credenciales incorrectas."}, status=status.HTTP_401_UNAUTHORIZED)
    if not user.is_authorized:
        return Response({"error": "Cuenta no autorizada. Contacta al administrador."}, status=status.HTTP_403_FORBIDDEN)
    
    if not user.is_active:
        return Response({"error": "Cuenta inactiva. Contacta al administrador."}, status=status.HTTP_403_FORBIDDEN)
    
    if not check_password(password, user.password):
        return Response({"error": "Credenciales incorrectas."}, status=status.HTTP_401_UNAUTHORIZED)
    
    tokens = generate_token(user)
    return Response(
        {
            "message": "Inicio de sesión exitoso.",
            "tokens": tokens,
            "user": {
                "id": user.id,
                "name": user.name,
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "is_authorized": user.is_authorized
            }
        },
        status=status.HTTP_200_OK
    )
@api_view(["POST"])
def register_user_view(request):
    """Registro de usuario"""
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        
        tokens = generate_token(user)
        
        return Response(
            {
                "message": "Cuenta creada exitosamente.",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "username": user.username,
                    "phone": user.phone,
                    "email": user.email,
                },
                "tokens": tokens,
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

