import re
from django.core.management.base import BaseCommand
from django.db import transaction
from cbo_app.models import Ocupacao # Importa o modelo Ocupacao do app cbo_app

class Command(BaseCommand):
    help = 'Importa dados de CBO de um arquivo de texto para o modelo Ocupacao.'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='O caminho para o arquivo de dados CBO (ex: data/cbo_data.txt).')

    @transaction.atomic
    def handle(self, *args, **options):
        file_path = options['file_path']
        self.stdout.write(self.style.SUCCESS(f'Iniciando importação do arquivo: {file_path}'))

        try:
            Ocupacao.objects.all().delete()
            self.stdout.write(self.style.WARNING('Todos os dados antigos de Ocupacao foram removidos.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Erro ao tentar limpar dados antigos de Ocupacao: {e}'))
            return

        current_categoria_principal = None
        current_sub_categoria = None
        count = 0

        # Palavras-chave para identificar categorias principais (devem corresponder exatamente ao arquivo)
        categorias_principais_keywords = [
            "PESSOAL DE SAÚDE - NÍVEL SUPERIOR",
            "PESSOAL DE SAÚDE - NÍVEL TÉCNICO/AUXILIAR",
            "PESSOAL DE SAÚDE - QUALIFICAÇÃO ELEMENTAR",
            "PESSOAL ADMINISTRATIVO"
        ]

        with open(file_path, 'r', encoding='utf-8') as f:
            for line_number, line_content in enumerate(f, 1):
                line = line_content.strip()
                if not line:
                    continue

                # Tenta identificar uma linha de ocupação (começa com "  - CODIGO - DESCRICAO")
                match_ocupacao = re.match(r'^\s*-\s*([A-Z0-9\.]+)\s*-\s*(.+)$', line)

                if match_ocupacao:
                    codigo_bruto = match_ocupacao.group(1).strip()
                    descricao = match_ocupacao.group(2).strip()

                    if not current_categoria_principal:
                        self.stdout.write(self.style.WARNING(f'Linha {line_number}: Ocupação "{line}" encontrada sem categoria principal definida. Ignorando.'))
                        continue
                    # A subcategoria pode ser None se a ocupação estiver diretamente sob uma categoria principal

                    if ' a ' in codigo_bruto or codigo_bruto.endswith('..') or codigo_bruto.endswith('.'):
                        Ocupacao.objects.create(
                            codigo=None, # Código nulo para resumos/intervalos
                            descricao=f"{codigo_bruto} - {descricao}",
                            categoria_principal=current_categoria_principal,
                            sub_categoria=current_sub_categoria
                        )
                        count += 1
                    else:
                        try:
                            Ocupacao.objects.create(
                                codigo=codigo_bruto,
                                descricao=descricao,
                                categoria_principal=current_categoria_principal,
                                sub_categoria=current_sub_categoria
                            )
                            count += 1
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f'Erro ao criar Ocupacao para linha {line_number} (\"{line}\"): {e}'))
                else: # Não é uma linha de ocupação, verificar se é categoria principal ou subcategoria
                    is_main_category_found = False
                    for keyword in categorias_principais_keywords:
                        if line == keyword: # Verifica se a linha é exatamente uma categoria principal conhecida
                            current_categoria_principal = line
                            current_sub_categoria = None # Reseta subcategoria ao encontrar nova categoria principal
                            is_main_category_found = True
                            break
                    
                    if not is_main_category_found:
                        # Se não for uma categoria principal, e uma categoria principal já estiver ativa,
                        # e a linha for toda em maiúsculas e não começar com "-", consideramos como subcategoria.
                        if current_categoria_principal and line.isupper() and not line.startswith("-"):
                            current_sub_categoria = line
                        # else:
                            # Linhas que não se encaixam nos padrões são ignoradas silenciosamente na versão limpa

        self.stdout.write(self.style.SUCCESS(f'Importação concluída! {count} registros importados para Ocupações.'))

