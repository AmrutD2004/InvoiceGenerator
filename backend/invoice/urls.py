
from django.urls import path
from .views import *

urlpatterns = [
    path("user-register/", user_register, name='user-register'),
    path("user-login/", user_login, name='user-login'),
    path("user-data/<int:user_id>", user_data, name="user-data"),
    path("update-profile/<int:user_id>", update_profile,name='update-profile'),
    path("create-invoice/", create_invoice,name='create-invoice'),
    path("all-invoices/<int:user_id>", all_invoices, name="all-invoices"),
    path("invoice-status/<int:invoice_id>", invoice_status, name="invoice-status"),
    path("delete-invoice/<int:invoice_id>", delete_invoice, name="delete-invoice"),
    path("invoice-detail/<int:invoice_id>", invoice_detail, name="invoice-detail"),
]