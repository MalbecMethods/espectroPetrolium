# datasets/views.py

from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser

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
    
    # Guarda el archivo en el sistema de archivos
    with open(f'datasets/uploads/{file.name}', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    
    # Aquí puedes procesar 'nombre' y 'fecha' según sea necesario
    print(f'Archivo cargado: {file.name}, Nombre: {nombre}, Fecha: {fecha}')
    
    return JsonResponse({'message': 'File uploaded successfully'})
