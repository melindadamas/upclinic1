from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField # Mantenha JSONField se usado em outros lugares
from django.conf import settings
import json
# Removidos imports não utilizados diretamente neste arquivo de modelo para clareza
# Se forem necessários para outros modelos no mesmo arquivo, podem ser mantidos.

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'AD', 'Administrador'
        PROF = 'PF', 'Profissional'
        PATIENT = 'PT', 'Paciente'
    
    role = models.CharField(max_length=2, choices=Role.choices)
    phone = models.CharField(max_length=20, blank=True, null=True) # Permitir blank/null para flexibilidade
    wearable_id = models.CharField(max_length=100, blank=True, null=True)

    # Adicionar related_name para evitar conflitos com o ProfessionalProfile
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="custom_user_set", 
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="custom_user_set",
        related_query_name="user",
    )

class CBOSpecialty(models.Model):
    code = models.CharField(max_length=10, unique=True, primary_key=True) # Ex: 2251-25 ou 223208
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.code} - {self.name}"

    class Meta:
        verbose_name = "Especialidade CBO"
        verbose_name_plural = "Especialidades CBO"
        ordering = ['name']

class ProfessionalProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='professionalprofile')
    # Alterado de ArrayField para ManyToManyField para referenciar o novo modelo CBOSpecialty
    specialties = models.ManyToManyField(CBOSpecialty, blank=True)
    # Manter JSONField se for realmente necessário para configurações de voz flexíveis, caso contrário, considerar campos específicos.
    voice_settings = models.JSONField(default=dict, blank=True, null=True) 

    def __str__(self):
        return f'Perfil Profissional de {self.user.username}'

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('confirmed', 'Confirmado'),
        ('cancelled', 'Cancelado'),
        ('completed', 'Concluído'),
    ]

    professional = models.ForeignKey(ProfessionalProfile, on_delete=models.CASCADE, related_name='appointments')
    # Assumindo que 'user' aqui se refere ao Paciente. Se for um User genérico, pode ser mantido.
    # Se for especificamente um Paciente, e Paciente for um modelo separado herdando de User ou com OneToOne para User,
    # então o ForeignKey deveria ser para PatientProfile ou Patient.
    # Para este exemplo, mantemos User, mas isso pode precisar de revisão dependendo da estrutura completa.
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_appointments') # Renomeado related_name para evitar conflito
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    metadata = models.JSONField(default=dict, blank=True, null=True)
    scheduled_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        patient_username = self.patient.username if self.patient else 'N/A'
        professional_username = self.professional.user.username if self.professional and self.professional.user else 'N/A'
        return f'Consulta de {patient_username} com {professional_username} em {self.scheduled_at.strftime("%d/%m/%Y %H:%M") if self.scheduled_at else "N/A"}'

# Os modelos WearableData, Patient (se for um modelo separado), LabExam, ClinicalEvent, etc., 
# que estavam no arquivo original, devem ser mantidos se fizerem parte do escopo do projeto.
# Para o propósito desta alteração focada na CBO, eles foram omitidos, mas devem ser reintegrados
# se já existiam e são necessários.

# Exemplo de modelo Patient (se for separado)
class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='patientprofile')
    # Adicionar campos específicos do paciente aqui, como histórico médico, alergias, etc.
    medical_history = models.TextField(blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    # ... outros campos

    def __str__(self):
        return f'Perfil de Paciente de {self.user.username}'

# Manter outros modelos como WearableData, LabExam, ClinicalEvent se existirem e forem necessários.
class WearableData(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='wearable_data_entries')
    timestamp = models.DateTimeField()
    heart_rate = models.FloatField(null=True, blank=True)
    stress_level = models.FloatField(null=True, blank=True)
    # Adicionar outros campos relevantes de wearables

    def __str__(self):
        return f"Dados de {self.patient.user.username} em {self.timestamp.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        verbose_name = "Dado de Wearable"
        verbose_name_plural = "Dados de Wearables"
        ordering = ['-timestamp']

# Consumers e outras lógicas de API/WebSocket foram removidos deste arquivo de modelos
# para manter o foco nos modelos de dados. Eles devem residir em seus respectivos arquivos
# (consumers.py, views.py, etc.).

