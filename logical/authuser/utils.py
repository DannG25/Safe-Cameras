from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import validate_email
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from cameras.models import Users


def generate_token(user):
    """Genera token JWT para el usuario"""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

        
def create_user(name, username, phone, email, password):
    # errors = {}

    # if not name:
    #     errors["name"] = "El nombre es requerido."

    # if not email:
    #     errors["email"] = "El correo es requerido."

    # if not password:
    #     errors["password"] = "La contraseña es requerida."

    # if not confirm_password:
    #     errors["confirm_password"] = "Confirmar contraseña es requerido."

    # if errors:
    #     return None, errors

    # # ── Validar email ────────────────────────────
    # try:
    #     validate_email(email)
    # except ValidationError:
    #     return None, {"email": "Correo inválido"}

    # # ── Validar longitud ─────────────────────────
    # if len(password) < 6:
    #     return None, {"password": "Mínimo 6 caracteres"}

    # # ── Validar coincidencia ─────────────────────
    # if password != confirm_password:
    #     return None, {"confirm_password": "No coinciden"}

    # # ── Validar unicidad ─────────────────────────
    # if Users.objects.filter(email=email).exists():
    #     return None, {"email": "El correo ya existe"}

    # if Users.objects.filter(username=name).exists():
    #     return None, {"name": "El usuario ya existe"}

    # ── Crear usuario ────────────────────────────
    user = Users.objects.create(
        name=name,
        username=username,
        phone=phone,
        email=email.lower().strip(),
        password=make_password(password),
        is_active=True,
    )
    return user
