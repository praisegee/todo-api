from django.urls import path

from frontend.views import todoList


urlpatterns = [
	path('', todoList, name="todolist")
]