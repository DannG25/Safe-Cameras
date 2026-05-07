from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from cameras.models import Users
from .utils import create_user


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ["name","username", "email", "phone", "password", "confirm_password"]

    def validate_email(self, value):
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Correo inválido")

        if Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya existe")

        return value

    def validate_phone(self, value):
        # if not value.isdigit():
        #     raise serializers.ValidationError("El número de teléfono debe contener solo dígitos")
        
        if Users.objects.filter(phone=value).exists():
            raise serializers.ValidationError("El número de teléfono ya existe")

        return value
    
    def validate_username(self, value):
        if Users.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este usuario ya existe")
        return value

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Las contraseñas no coinciden"}
            )

        if len(data["password"]) < 6:
            raise serializers.ValidationError({"password": "Mínimo 6 caracteres"})

        return data

    def create(self, validated_data):
        print("Validated data keys:", validated_data.keys())
        print("Validated data:", validated_data)
        validated_data.pop("confirm_password")

        user = create_user(
            name=validated_data["name"],
            username=validated_data["username"],
            phone=validated_data["phone"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user
