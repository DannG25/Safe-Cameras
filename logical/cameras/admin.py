from django.contrib import admin
from django.utils.html import format_html
from .models import Brands, CameraModel, CameraConfiguration, Camera, Storage


@admin.register(Brands)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'model_count']
    search_fields = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

    def model_count(self, obj):
        return obj.models.count()
    model_count.short_description = "Modelos"

class CameraConfigurationInline(admin.StackedInline):
    model = CameraConfiguration
    fk_name = "camera_model"
    can_delete = False
    verbose_name_plural = "Configuración"
    fieldsets = (
        ('Video', {
            'fields': ('max_resolution', 'custom_resolution', 'compression', 'max_fps', 'bitrate_kbps', 'streams_count')
        }),
        ('Red / Conectividad', {
            'fields': ('default_ip', 'http_port', 'rtsp_port', 'https_port', 'protocol', 'onvif_supported', 'poe_supported', 'wifi_supported')
        }),
        ('RTSP / Credenciales', {
            'fields': ('rtsp_main_stream', 'rtsp_sub_stream', 'default_username', 'default_password')
        }),
        ('Óptica', {
            'fields': ('focal_length_min', 'focal_length_max', 'horizontal_fov', 'optical_zoom', 'digital_zoom', 'ir_distance_meters')
        }),
        ('Características', {
            'fields': ('night_mode', 'motion_detection', 'face_detection', 'license_plate_recognition',
                       'audio_in', 'audio_out')
        }),
        ('Alimentación', {
            'fields': ('power_consumption_watts', 'poe_class')
        }),
        ('Ambiente', {
            'fields': ('ip_rating', 'ik_rating', 'temp_min', 'temp_max')
        }),
        ('Notas', {
            'fields': ('notes', 'configuration_guide'),
            'classes': ('collapse',)
        }),
    )

@admin.register(CameraModel)
class CameraModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'part_number', 'has_configuration']
    list_filter = ['brand']
    search_fields = ['name', 'part_number', 'brand__name']
    inlines = [CameraConfigurationInline]

    def has_configuration(self, obj):
        has = hasattr(obj, 'configuration')
        color = 'green' if has else 'red'
        text = '✔ Sí' if has else '✘ No'
        return format_html('<span style="color:{}">{}</span>', color, text)
    has_configuration.short_description = "Configuración"

@admin.register(Storage)
class StorageAdmin(admin.ModelAdmin):
    list_display = ['camera_slot','sd_card_slot', 'max_sd_capacity_gb']
    list_filter = ['camera_slot','sd_card_slot', 'max_sd_capacity_gb']

@admin.register(CameraConfiguration)
class CameraConfigurationAdmin(admin.ModelAdmin):
    list_display = [ 'max_resolution', 'compression', 'max_fps', 'onvif_supported', 'poe_supported']
    list_filter = ['max_resolution', 'compression', 'night_mode', 'poe_supported', 'onvif_supported']
    search_fields = ['camera_model__name', 'camera_model__brand__name']


@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand_name', 'camera_model', 'ip_address', 'location', 'zone', 'status']
    list_filter = ['status', 'camera_model__brand', 'zone']
    search_fields = ['name', 'ip_address', 'location']
    list_editable = ['status']
    readonly_fields = ['rtsp_url_display']

    fieldsets = (
        ('Identificación', {
            'fields': ('name', 'camera_model')
        }),
        ('Red', {
            'fields': ('ip_address', 'username', 'password', 'rtsp_url_display')
        }),
        ('Ubicación', {
            'fields': ('location', 'zone')
        }),
        ('Estado', {
            'fields': ('status', 'description')
        }),
    )

    def brand_name(self, obj):
        return obj.camera_model.brand.name
    brand_name.short_description = "Marca"

    def rtsp_url_display(self, obj):
        url = obj.get_rtsp_url()
        if url:
            return format_html('<code style="font-size:12px">{}</code>', url)
        return "No disponible (configure el modelo primero)"
    rtsp_url_display.short_description = "URL RTSP"