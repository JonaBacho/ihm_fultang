from django.urls import path, include
from polyclinic.views.pharmacist import edit, new_bill, save_bill,bills,details,cancel_bill
from polyclinic.views.pharmacist import add_medicament
from polyclinic.views.pharmacist import index
from polyclinic.views.pharmacist import medicament_list,get_add_medicament,remove, update

urlpatterns = [

    path('', index),
    path('get_add_medicament',get_add_medicament),
    path('add_medicament',add_medicament),
    path('medicament_list',medicament_list),
    path('delete/<int:id>',remove),
    path('update/<int:id>',update),
    path('edit/<int:id>',edit),
    path('new_bill',new_bill),
    path('save_bill/<int:id>',save_bill),
    path('bills',bills),
    path('cancel_bill/<int:id>',cancel_bill),
    path('details/<int:id>',details)



]


def pharmacist_urls():
    return urlpatterns, 'pharmacist', 'pharmacist'