from rest_framework import serializers
from polyclinic.models import Medicament

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'




from rest_framework import serializers
from polyclinic.models import PharmacyCategory, PharmacyProduct, PharmacyInventoryMovement

class PharmacyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyCategory
        fields = '__all__'

class PharmacyProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = PharmacyProduct
        fields = '__all__'

class PharmacyProductDetailSerializer(serializers.ModelSerializer):
    category = PharmacyCategorySerializer(read_only=True)
    low_stock = serializers.BooleanField(source='is_low_stock', read_only=True)
    
    class Meta:
        model = PharmacyProduct
        fields = '__all__'
        
class PharmacyInventoryMovementSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    staff_name = serializers.ReadOnlyField(source='staff.firstName')
    
    class Meta:
        model = PharmacyInventoryMovement
        fields = '__all__'

# For dashboard and filtering
class ProductStockSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = PharmacyProduct
        fields = ['id', 'name', 'category_name', 'current_stock', 'min_stock_level', 'price', 'status']

# For exporting inventory reports
class PharmacyInventoryReportSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')
    value = serializers.SerializerMethodField()
    
    class Meta:
        model = PharmacyProduct
        fields = ['id', 'name', 'category', 'current_stock', 'price', 'value', 'status', 'expiry_date']
        
    def get_value(self, obj):
        return obj.current_stock * obj.price