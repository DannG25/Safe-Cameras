from django.shortcuts import render
from django.contrib import messages
from django.db.models import Q, Count
from .models import Brands, CameraModel, CameraConfiguration, Camera

# def dashboard(request):
#     context = {
#         'total_cameras': Camera.objects.count(),
#         'active_cameras': Camera.objects.filter(status='active').count(),
#         'offline_cameras': Camera.objects.filter(status='offline').count(),
#         'fault_cameras': Camera.objects.filter(status='fault').count(),
#         'maintenance_cameras': Camera.objects.filter(status='maintenance').count(),
#         'total_brands': Brands.objects.filter(is_active=True).count(),
#         'total_models': CameraModel.objects.filter(is_active=True).count(),
#         'brands': Brands.objects.annotate(cam_count=Count('models__cameras')).filter(is_active=True)[:6],
#         'recent_cameras': Camera.objects.select_related('camera_model__brand').order_by('-created_at')[:5],
#     }
#     return render(request, 'cameras/dashboard.html', context)
# Create your views here.
