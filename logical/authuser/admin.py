from django.contrib import admin
from cameras.models import Users

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ("id","name", "username","phone", "email", "is_authorized", "is_active")
    search_fields = ("username", "email")
    