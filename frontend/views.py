from django.shortcuts import render


def todoList(request, *args, **kwargs):

	context = {}
	
	return render(request, 'frontend/todolist.html', context)
