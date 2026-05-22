# Atualização da API - Integração com PostgreSQL

A estrutura principal da API já está pronta utilizando **FastAPI + APIRouter**, com os controllers organizados por módulos e as rotas registradas no `main.py`.

---

# Rotas atualmente disponíveis

As seguintes rotas já estão funcionando e aparecem normalmente no Swagger (`/docs`):

```text
/auth
/fazendas
/maquinas
/operadores
/culturas
/custos
/dashboard
/producao
/relatorios
/talhoes
```

Mesmo algumas funções ainda contendo apenas `pass`, os endpoints já existem e respondem corretamente, retornando `null` temporariamente.

---

# Novos módulos criados

Também foram adicionados os arquivos:

```text
atividadesagricolas.py
insumos.py
```

Porém, essas rotas ainda precisam ser conectadas no `main.py`.

---

# Próximo passo

Importar os routers:

```python
from controllers.atividadesagricolas import router_atividades
from controllers.insumos import router_fertilizantes
from controllers.insumos import router_defensivos
from controllers.insumos import router_sementes
```

E adicionar:

```python
app.include_router(router_atividades)
app.include_router(router_fertilizantes)
app.include_router(router_defensivos)
app.include_router(router_sementes)
```

---

# Após essa atualização

Também passarão a funcionar as rotas:

```text
/atividades/plantio
/atividades/colheita
/sementes
/fertilizantes
/defensivos
```

---

# Atualização para PostgreSQL

O backend foi formatado e preparado para a implementação completa do banco PostgreSQL, que agora passa a ser a principal integração do sistema.

Foi criada a conexão utilizando:

```python
psycopg2
```

e as funções que antes utilizavam apenas:

```python
pass
```

foram substituídas por operações reais de banco de dados.

---

# Funcionalidades adicionadas

Agora o sistema possui operações completas de CRUD:

```text
CREATE  -> INSERT
READ    -> SELECT
UPDATE  -> UPDATE
DELETE  -> DELETE
```

Isso permite:

- cadastrar dados
- listar registros
- atualizar informações
- remover registros
- integrar totalmente com o front-end

---

# Models com Pydantic

Também foram adicionados os `BaseModel` do Pydantic para:

- validação automática
- organização dos dados
- funcionamento correto no Swagger
- integração com o front-end

---

# Estrutura atual do fluxo

```text
Frontend
   ↓
Rotas FastAPI
   ↓
Controllers
   ↓
db.py
   ↓
PostgreSQL
```

---

# Observações importantes

Caso o banco tenha outro nome, usuário ou senha, será necessário alterar no arquivo:

```python
db.py
```

Exemplo:

```python
database="fazenda"
user="postgres"
password="123456"
```

---

# Atenção aos nomes do SQL

Os nomes das tabelas e colunas precisam ser exatamente iguais aos definidos no PostgreSQL.

Exemplo:

Se no SQL existir:

```sql
id_fazenda
```

não pode usar no Python:

```python
idFazenda
```

Caso contrário ocorrerão erros como:

```text
relation does not exist
column does not exist
```

---

# Situação atual da API

A estrutura principal da API já está pronta e organizada.

O sistema já foi preparado para:

- integração completa com PostgreSQL
- implementação de CRUD completo
- conexão com o front-end
- expansão futura do sistema
- autenticação
- dashboards
- relatórios
- controle agrícola completo

O que falta agora é:

- conectar algumas rotas restantes no `main.py`
- ajustar nomes conforme o SQL real
- finalizar implementações internas
- realizar testes finais do CRUD completo
- integrar totalmente com o front-end
