from django.db import models


class Task(models.Model):
	title = models.CharField(max_length=200, blank=False, null=False)
	date_created = models.DateTimeField(auto_now_add=True)
	date_updated = models.DateTimeField(auto_now=True)
	completed = models.BooleanField(default=False, blank=True, null=True)

	def __str__(self):
		return str(self.title).title()
