from polyclinic.models import MedicalStaff
from accounting.models import AccountingStaff

# methode qui prend la requet et à partir de son user renvoi le bon user pour le system
def fultang_user(request):
    user = request.user  # Récupérer l'utilisateur connecté
    # Vérifier si l'utilisateur est MedicalStaff ou AccountingStaff
    if MedicalStaff.objects.filter(pk=user.pk).exists():
        user_type = "medical"
        user_instance = MedicalStaff.objects.get(pk=user.pk)
    elif AccountingStaff.objects.filter(pk=user.pk).exists():
        user_type = "accountant"
        user_instance = AccountingStaff.objects.get(pk=user.pk)
    else:
        user_type = "user"
        user_instance = user  # Si utilisateur générique

    return user_instance, user_type