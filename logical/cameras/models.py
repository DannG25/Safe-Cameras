from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField


class UtilsData(models.Model):
    status = models.BooleanField(default=True, verbose_name="Activo")
    create_at = models.DateTimeField(auto_now_add=True, help_text="Fecha y hora de creación")
    updated_at = models.DateTimeField(auto_now=True, help_text="Fecha y hora de última actualización")

    class Meta:
        abstract = True 
        
class Users(AbstractUser):
    username = models.CharField(max_length=100, unique=True, verbose_name="Nombre de Usuario")
    name = models.CharField(max_length=200, blank=True, verbose_name="Nombre Completo")
    email = models.EmailField(unique=True, verbose_name="Correo Electrónico")
    phone = models.CharField(max_length=15, blank=True, null=True, verbose_name="Número de Teléfono")
    is_authorized = models.BooleanField(default=False, verbose_name="Autorizado")
    
    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        ordering = ["username"]
        
    def save(self, *args, **kwargs):
        # Encriptar la contraseña antes de guardar
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.username)

class Brands(models.Model):
    """Marca de camaras"""

    name = models.CharField(max_length=100, unique=True, verbose_name="Nombre")
    slug = models.CharField(max_length=50, unique=True, verbose_name="Identificador")
    description = models.TextField(blank=True, verbose_name="Descripción")
    logo = models.ImageField(
        upload_to="brands/logos/", blank=True, null=True, verbose_name="Logo"
    )

    class Meta:
        verbose_name = "Marca"
        verbose_name_plural = "Marcas"
        ordering = ["name"]

    def __str__(self):
        return str(self.name)


class CameraModel(UtilsData):
    """Modelo específico de cámara de una marca"""

    brand = models.ForeignKey(Brands, on_delete=models.CASCADE, related_name="models", verbose_name="Marca")
    name = models.CharField(max_length=200, verbose_name="Modelo")
    part_number = models.CharField(max_length=100, blank=True, verbose_name="Número de Parte")
    description = models.TextField(blank=True, verbose_name="Descripción")
    datasheet = models.FileField(upload_to="cameras/datasheets/",blank=True,null=True,verbose_name="Ficha Técnica",)
    image = models.ImageField(
        upload_to="cameras/images/", blank=True, null=True, verbose_name="Imagen"
    )

    class Meta:
        verbose_name = "Modelo de Cámara"
        verbose_name_plural = "Modelos de Cámara"
        ordering = ["brand", "name"]
        unique_together = ["brand", "name"]

    def __str__(self):
        return f"{self.brand.name} - {self.name}"


class CameraConfiguration(UtilsData):
    """Configuración base asociada a un modelo de cámara"""

    RESOLUTION_CHOICES = [
        ("720p", "720p (1MP)"),
        ("1080p", "1080p (2MP)"),
        ("3mp", "3MP"),
        ("4mp", "4MP"),
        ("5mp", "5MP"),
        ("6mp", "6MP"),
        ("8mp", "8MP / 4K"),
        ("12mp", "12MP"),
        ("custom", "Personalizado"),
    ]

    COMPRESSION_CHOICES = [
        ("h264", "H.264"),
        ("h265", "H.265"),
        ("h265+", "H.265+"),
        ("h264+", "H.264+"),
        ("mjpeg", "MJPEG"),
    ]

    PROTOCOL_CHOICES = [
        ("rtsp", "RTSP"),
        ("onvif", "ONVIF"),
        ("rtmp", "RTMP"),
        ("http", "HTTP"),
        ("https", "HTTPS"),
    ]

    NIGHT_MODE_CHOICES = [
        ("ir", "Infrarrojo (IR)"),
        ("color", "Full Color Night"),
        ("starlight", "Starlight"),
        ("thermal", "Térmica"),
        ("none", "Sin modo nocturno"),
    ]

    camera_model = models.OneToOneField(
        CameraModel,
        on_delete=models.CASCADE,
        related_name="configuration",
        verbose_name="Modelo de Cámara",
    )
    # Video
    max_resolution = models.CharField(
        max_length=20, choices=RESOLUTION_CHOICES, verbose_name="Resolución Máxima"
    )
    custom_resolution = models.CharField(
        max_length=50, blank=True, verbose_name="Resolución Personalizada"
    )
    compression = models.CharField(
        max_length=20,
        choices=COMPRESSION_CHOICES,
        default="h265",
        verbose_name="Compresión",
    )
    max_fps = models.PositiveIntegerField(default=30, verbose_name="FPS Máximo")
    bitrate_kbps = models.PositiveIntegerField(
        default=2048, verbose_name="Bitrate (Kbps)"
    )
    streams_count = models.PositiveIntegerField(
        default=2, verbose_name="Número de Streams"
    )

    # Red / Conectividad
    default_ip = models.GenericIPAddressField(
        default="192.168.1.64", verbose_name="IP por Defecto"
    )
    http_port = models.PositiveIntegerField(default=80, verbose_name="Puerto HTTP")
    rtsp_port = models.PositiveIntegerField(default=554, verbose_name="Puerto RTSP")
    https_port = models.PositiveIntegerField(default=443, verbose_name="Puerto HTTPS")
    protocol = models.CharField(
        max_length=10,
        choices=PROTOCOL_CHOICES,
        default="rtsp",
        verbose_name="Protocolo Principal",
    )
    onvif_supported = models.BooleanField(default=True, verbose_name="Soporte ONVIF")
    poe_supported = models.BooleanField(default=True, verbose_name="Soporte PoE")
    wifi_supported = models.BooleanField(default=False, verbose_name="Soporte WiFi")

    # Óptica
    focal_length_min = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Focal Mín (mm)",
    )
    focal_length_max = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Focal Máx (mm)",
    )
    horizontal_fov = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="FOV Horizontal (°)",
    )
    optical_zoom = models.PositiveIntegerField(
        default=1, verbose_name="Zoom Óptico (x)"
    )
    digital_zoom = models.PositiveIntegerField(
        default=1, verbose_name="Zoom Digital (x)"
    )
    ir_distance_meters = models.PositiveIntegerField(
        default=30, verbose_name="Distancia IR (m)"
    )

    # Características
    night_mode = models.CharField(
        max_length=20,
        choices=NIGHT_MODE_CHOICES,
        default="ir",
        verbose_name="Modo Nocturno",
    )
    motion_detection = models.BooleanField(
        default=True, verbose_name="Detección de Movimiento"
    )
    face_detection = models.BooleanField(default=False, verbose_name="Detección Facial")
    license_plate_recognition = models.BooleanField(
        default=False, verbose_name="Reconocimiento de Placas (LPR)"
    )
    audio_in = models.BooleanField(default=False, verbose_name="Entrada de Audio")
    audio_out = models.BooleanField(default=False, verbose_name="Salida de Audio")

    # Alimentación
    power_consumption_watts = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Consumo (W)",
    )
    poe_class = models.CharField(max_length=20, blank=True, verbose_name="Clase PoE")

    # Ambiente
    ip_rating = models.CharField(
        max_length=10, default="IP67", verbose_name="Clasificación IP"
    )
    ik_rating = models.CharField(
        max_length=10, blank=True, verbose_name="Clasificación IK"
    )
    temp_min = models.IntegerField(default=-30, verbose_name="Temp. Mínima (°C)")
    temp_max = models.IntegerField(default=60, verbose_name="Temp. Máxima (°C)")

    # RTSP URL pattern
    rtsp_main_stream = models.CharField(
        max_length=300,
        default="rtsp://{user}:{password}@{ip}:{port}/Streaming/Channels/101",
        verbose_name="RTSP Stream Principal",
    )
    rtsp_sub_stream = models.CharField(
        max_length=300,
        blank=True,
        default="rtsp://{user}:{password}@{ip}:{port}/Streaming/Channels/102",
        verbose_name="RTSP Sub-Stream",
    )

    # Credenciales por defecto
    default_username = models.CharField(
        max_length=100, default="admin", verbose_name="Usuario por Defecto"
    )
    default_password = models.CharField(
        max_length=100, default="admin12345", verbose_name="Contraseña por Defecto"
    )

    # Notas
    notes = models.TextField(blank=True, verbose_name="Notas Adicionales")
    configuration_guide = models.TextField(
        blank=True, verbose_name="Guía de Configuración"
    )

    class Meta:
        verbose_name = "Configuración de Cámara"
        verbose_name_plural = "Configuraciones de Cámara"

    def __str__(self):
        return f"Configuración: {self.camera_model}"

    def get_rtsp_url(self, ip=None, user=None, password=None, port=None):
        return self.rtsp_main_stream.format(
            ip=ip or self.default_ip,
            user=user or self.default_username,
            password=password or self.default_password,
            port=port or self.rtsp_port,
        )


class Camera(UtilsData):
    """Instancia de cámara instalada/registrada"""

    TYPE_CHOICES = [
        ("bullet", "Bullet"),
        ("dome", "Domo"),
        ("ptz", "PTZ"),
        ("fisheye", "Ojo de Pez"),
        ("box", "Box"),
        ("covert", "Covert"),
        ("thermal", "Térmica"),
        ("multisensor", "Multisensor"),
    ]
    camera_model = models.ForeignKey(CameraModel,on_delete=models.CASCADE,related_name="cameras",verbose_name="Modelo",)
    type_camera = models.CharField(max_length=20, choices=TYPE_CHOICES, verbose_name="Tipo camara")
    name = models.CharField(max_length=200, verbose_name="Nombre / Identificador")
    ip_address = models.GenericIPAddressField(blank=True, null=True, verbose_name="Dirección IP")
    username = models.CharField(max_length=100, default="admin", verbose_name="Usuario")
    password = models.CharField(max_length=100, default="admin12345", verbose_name="Contraseña")
    location = models.CharField(max_length=300, blank=True, verbose_name="Ubicación")
    zone = models.CharField(max_length=100, blank=True, verbose_name="Zona")
    description = models.TextField(blank=True, verbose_name="Descripcion")

    class Meta:
        verbose_name = "Cámara"
        verbose_name_plural = "Cámaras"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.camera_model.brand.name} {self.camera_model.name})"

    def get_rtsp_url(self):
        config = getattr(self.camera_model, "configuration", None)
        if config:
            return config.get_rtsp_url(
                ip=self.ip_address,
                user=self.username,
                password=self.password,
            )
        return None

    @property
    def brand(self):
        return self.camera_model.brand


class Storage(UtilsData):
    camera_slot = models.ForeignKey(
        CameraModel,
        on_delete=models.CASCADE,
        related_name="camara_que_guarda",
        verbose_name="Camara que guarda",
    )
    sd_card_slot = models.BooleanField(default=True, verbose_name="Ranura SD")
    max_sd_capacity_gb = models.PositiveIntegerField(
        default=256, blank=True, null=True, verbose_name="Capacidad SD Máx (GB)"
    )

    class Meta:
        verbose_name = "Almacenamiento Camara"
        verbose_name_plural = "Almacenamiento camaras"

    def __str__(self):
        return str(self.camera_slot)
