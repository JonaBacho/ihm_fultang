import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fultang.settings')

app = Celery('fultang')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'new_budget_exercise': {
        'task': 'accounting.tasks.new_budget_exercise',
        'schedule': crontab(minute='0', hour='0', day_of_month='1', month_of_year='1'),
    }
}