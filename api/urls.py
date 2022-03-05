from django.urls import path
from api.views import (
		apiEndpoints,
		taskCreate,
		taskDelete,
		taskDetail,
		taskList,
		taskUpdate
	)


urlpatterns = [
	path('', apiEndpoints, name="endpoints"),
	path('task-create/', taskCreate, name="create"),
	path('task-delete/<str:pk>/', taskDelete, name="delete"),
	path('task-detail/<str:pk>/', taskDetail, name="detail"),
	path('task-list/', taskList, name="list"),
	path('task-update/<str:pk>/', taskUpdate, name="update"),
] 