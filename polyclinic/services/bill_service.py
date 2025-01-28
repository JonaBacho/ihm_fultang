from rest_framework import serializers
from polyclinic.models import *

class BillService:

    def create_bill_item(self, validated_data):
        bill = validated_data.pop('bill', None)
        medicament = validated_data.pop('medicament', None)
        consultation = validated_data.pop('consultation', None)
        prescription = validated_data.pop('prescription', None)
        examRequest = validated_data.pop('examRequest', None)
        hospitalisation = validated_data.pop('hospitalisation', None)
        quantity = validated_data.pop('quantity', None)
        total = 0
        if bill is None:
            raise serializers.ValidationError("La facture est obligatoire")
        if any([medicament, consultation, hospitalisation, prescription, examRequest]):
            try:
                if medicament:
                    medicament = Medicament.objects.get(pk=medicament)
                    if medicament and quantity is None:
                        raise serializers.ValidationError(
                            "le nombre de medicament est obligatoire si le medicament est fourni")
                    total += medicament.price * quantity
                elif consultation:
                    consultation = Consultation.objects.get(pk=consultation)
                    total += consultation.consultationPrice
                elif prescription:
                    prescription = Prescription.objects.get(pk=prescription)
                    prescription_drug = PrescriptionDrug.objects.filter(prescription=prescription)
                    for item in prescription_drug:
                        medicament = Medicament.objects.get(pk=item.medicament)
                        total += medicament.price * item.quantity
                elif examRequest:
                    examRequest = ExamRequest.objects.get(pk=examRequest)
                    exam = Exam.objects.get(pk=examRequest.idExam)
                    total += exam.examCost
                elif hospitalisation:
                    hospitalisation = Hospitalisation.objects.get(pk=hospitalisation)
                    room = Room.objects.get(pk=hospitalisation.idRoom)
                    total += room.price
                bill_item = BillItem.objects.create(
                    bill=bill,
                    medicament=medicament,
                    consultation=consultation,
                    prescription=prescription,
                    examRequest=examRequest,
                    quantity=quantity if quantity is not None else 0,
                    designation=validated_data['designation'],
                    total=total,
                )
                return bill_item
            except Medicament.DoesNotExist:
                raise serializers.ValidationError("le medicament n'existe pas ou un medicament prescrit n'existe pas")
            except Consultation.DoesNotExist:
                raise serializers.ValidationError("le consultation n'existe pas")
            except Prescription.DoesNotExist:
                raise serializers.ValidationError("le prescription n'existe pas")
            except ExamRequest.DoesNotExist:
                raise serializers.ValidationError("le examrequest n'existe pas")
            except Exam.DoesNotExist:
                raise serializers.ValidationError("le exam n'existe pas")
            except Hospitalisation.DoesNotExist:
                raise serializers.ValidationError("le hospitalisation n'existe pas")
            except Room.DoesNotExist:
                raise serializers.ValidationError("la chambre d'hospitalisation n'existe pas")
        else:
            raise serializers.ValidationError("Au moins un paiment doit être effectué")