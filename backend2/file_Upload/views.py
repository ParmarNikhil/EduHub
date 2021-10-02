# Create your views here.
from .models import FileUpload
from .serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from wsgiref.util import FileWrapper
import os


# @api_view(['GET'])
# def apiOverview(request):
#     api_url = {
#         'List': '/task-list/',
#         'Detail_View': '/task-detail/<str:pk>/',
#         'Create': '/upload/',
#         'Update': '/task-update/<str:pk>/',
#         'Delete': '/task-delete/<str:pk>/',
#     }
#     return Response(api_url)

@api_view(['GET'])
def openMaterial(request, id, format=None):
        queryset = FileUpload.objects.get(id=id)
        file_handle = queryset.file.path
        document = open(file_handle, 'rb')
        response = HttpResponse(FileWrapper(document), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="%s"' % queryset.file.name
        return response

# def openMaterial(request, pk):
#     selfile = FileUpload.objects.get(id=pk)
#     print("selfile",selfile)
#     file1 = open(str(selfile),'r')
#     print(file1.read())
#     file1.close()
#     serializer = PostSerializer(selfile, many=False)
#     return Response(serializer.data) 
        # files = FileUpload.objects.all()
        # serializer = PostSerializer(files, many=True)
        # return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def fetchMaterial(request):
    if request.method == "GET":
        files = FileUpload.objects.all()
        serializer = PostSerializer(files, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def uploadMaterial(request):
    serializer = PostSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        print("data",serializer)
    print(serializer.errors)
    return Response("data inserted")
        
