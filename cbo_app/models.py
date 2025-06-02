from django.db import models

class Ocupacao(models.Model):
    codigo = models.CharField(max_length=10, unique=True, blank=True, null=True)
    descricao = models.CharField(max_length=255)
    categoria_principal = models.CharField(max_length=255, blank=True, null=True)
    sub_categoria = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Ocupação"
        verbose_name_plural = "Ocupações"

    def __str__(self):
        if self.codigo:
            return f"{self.codigo} - {self.descricao}"
        return self.descricao
