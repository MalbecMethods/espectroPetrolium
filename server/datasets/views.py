# datasets/views.py

from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
import os

from datasets.appdataset.test import file_to_csv

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file provided'}, status=400)
    
    file = request.FILES['file']
    nombre = request.data.get('nombre')
    fecha = request.data.get('fecha')
    
    if not nombre or not fecha:
        return JsonResponse({'error': 'Nombre y fecha son requeridos'}, status=400)
    
    # Crear la carpeta "uploads" si no existe
    if not os.path.exists('datasets/uploads'):
        os.makedirs('datasets/uploads')

    # Guarda el archivo en el sistema de archivos
    with open(f'datasets/uploads/{file.name}', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    
    if (file.name.endswith('.txt') or file.name.endswith('.csv')):
        file_to_csv(f'datasets/uploads/{file.name}', nombre, fecha)
        return JsonResponse({'message': 'File uploaded successfully'})
    else :
        os.remove(f'datasets/uploads/{file.name}')
        return JsonResponse({'error': 'El archivo no es de formato .txt o .csv'}, status=400)
