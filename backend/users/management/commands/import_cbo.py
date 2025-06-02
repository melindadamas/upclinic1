from django.core.management.base import BaseCommand
import csv
import os
from backend.users.models import CBOSpecialty

class Command(BaseCommand):
    help = 'Import CBO specialties from a CSV file. Expects ; as delimiter and CODIGO_CBO and NOME_OCUPACAO as headers.'

    def add_arguments(self, parser):
        parser.add_argument('csv_file_path', type=str, help='The path to the CSV file to import.')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file_path']
        self.stdout.write(self.style.SUCCESS(f"Iniciando a importação do arquivo: {csv_file_path}"))
        
        if not os.path.exists(csv_file_path):
            self.stderr.write(self.style.ERROR(f"Erro: Arquivo CSV não encontrado em {csv_file_path}"))
            return

        count_created = 0
        count_skipped = 0
        count_errors = 0
        count_updated = 0

        with open(csv_file_path, mode="r", encoding="utf-8") as csvfile:
            # Assuming the CSV uses semicolon as delimiter based on previous script attempts
            reader = csv.DictReader(csvfile, delimiter=";")
            if not reader.fieldnames or "CODIGO_CBO" not in reader.fieldnames or "NOME_OCUPACAO" not in reader.fieldnames:
                self.stderr.write(self.style.ERROR("Erro: Cabeçalhos CODIGO_CBO ou NOME_OCUPACAO não encontrados no CSV. Verifique o delimitador e os nomes dos cabeçalhos."))
                return

            self.stdout.write(f"Cabeçalhos encontrados: {reader.fieldnames}")
            self.stdout.write("Iniciando leitura das linhas...")

            for row in reader:
                code = row.get("CODIGO_CBO")
                name = row.get("NOME_OCUPACAO")

                if not code or not name:
                    self.stdout.write(self.style.WARNING(f"Linha ignorada por falta de código ou nome: {row}"))
                    count_skipped += 1
                    continue
                
                code = code.strip()
                name = name.strip()

                try:
                    specialty, created = CBOSpecialty.objects.get_or_create(
                        code=code,
                        defaults={"name": name}
                    )
                    if created:
                        count_created += 1
                    else:
                        if specialty.name != name:
                            specialty.name = name
                            specialty.save()
                            count_updated +=1
                            self.stdout.write(self.style.SUCCESS(f"Especialidade atualizada: {code} - {name}"))
                        else:
                            count_skipped += 1
                except Exception as e:
                    self.stderr.write(self.style.ERROR(f"Erro ao processar linha {row}: {e}"))
                    count_errors += 1

        self.stdout.write(self.style.SUCCESS(f"\nImportação concluída."))
        self.stdout.write(f"Especialidades criadas: {count_created}")
        self.stdout.write(f"Especialidades atualizadas: {count_updated}")
        self.stdout.write(f"Especialidades já existentes/puladas: {count_skipped}")
        self.stdout.write(f"Erros durante a importação: {count_errors}")

