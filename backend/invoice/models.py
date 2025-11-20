from django.db import models


# ✅ USER MODEL
class User(models.Model):
    username = models.CharField(max_length=30, unique=True, blank=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, null=False)  # use longer field for hashed passwords
    phone = models.CharField(max_length=15, blank=True, null=True, default='')
    businessName  = models.CharField(max_length=50, unique=True, blank=False, default='')
    address = models.CharField(max_length=200, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


# ✅ ITEM MODEL
class Item(models.Model):
    name = models.CharField(max_length=100, blank=False)
    quantity = models.PositiveIntegerField(blank=False, null=False)
    unitPrice = models.DecimalField(max_digits=10, decimal_places=2)
    taxPercent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    def __str__(self):
        return f"{self.name} ({self.quantity} pcs)"

    def subtotal(self):
        return self.quantity * self.unitPrice


# ✅ INVOICE MODEL
class Invoice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invoices')
    invoiceNumber = models.CharField(max_length=20, blank=False, unique=True,)
    invoiceDate = models.DateField(auto_now_add=True)
    dueDate = models.DateField(null=True, blank=True)

    # Bill From (your business)
    businessName = models.CharField(max_length=100)
    businessEmail = models.EmailField(max_length=100)
    businessAddress = models.TextField()
    businessPhone = models.CharField(max_length=15)

    # Bill To (client)
    clientName = models.CharField(max_length=100)
    clientEmail = models.EmailField(max_length=100)
    clientAddress = models.TextField()
    clientPhone = models.CharField(max_length=15)

    # Invoice details
    notes = models.TextField(blank=True, null=True)
    paymentTerms = models.CharField(max_length=50, default='Net 15')
    status = models.CharField(
        max_length=10,
        choices=[
            ('Paid', 'Paid'),
            ('Unpaid', 'Unpaid'),
        ],
        default='Unpaid'
    )
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    taxTotal = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Relationship with items
    items = models.ManyToManyField(Item, related_name='invoices')

    def __str__(self):
        return f"Invoice #{self.invoiceNumber} - {self.clientName}"

    def calculate_totals(self):
        """Automatically compute subtotal, tax, and total"""
        subtotal = sum(item.subtotal() for item in self.items.all())
        tax_total = sum((item.subtotal() * (item.taxPercent / 100)) for item in self.items.all())
        self.subtotal = subtotal
        self.taxTotal = tax_total
        self.total = subtotal + tax_total
        self.save()
