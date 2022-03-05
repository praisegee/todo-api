from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Task
from api.serializers import TaskSerializer


@api_view(['GET'])
def apiEndpoints(request):
	endpoints = {
		'Create': '/task-create/',
		'Delete': '/task-delete/<str:pk>/',
		'Detail View': '/task-detail/<str:pk>/',
		'List': '/task-list/',
		'Update': '/task-update/<str:pk>/',
	}
	return Response(endpoints)


@api_view(['POST'])
def taskCreate(request, *args, **kwargs):
	serializer = TaskSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk, *args, **kwargs):
	task = Task.objects.get(id=pk)
	task.delete()
	return Response('Task deleted successfully')


@api_view(['GET'])
def taskDetail(request, pk, *args, **kwargs):
	task = Task.objects.get(id=pk)
	serializer = TaskSerializer(task, many=False)
	return Response(serializer.data)


@api_view(['GET'])
def taskList(request, *args, **kwargs):
	tasks = Task.objects.all().order_by('-id')
	serializer = TaskSerializer(tasks, many=True)
	return Response(serializer.data)


@api_view(['POST'])
def taskUpdate(request, pk, *args, **kwargs):
	task = Task.objects.get(id=pk)
	serializer = TaskSerializer(instance=task, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)
