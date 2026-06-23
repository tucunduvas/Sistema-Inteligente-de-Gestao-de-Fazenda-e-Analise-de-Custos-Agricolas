## Erro observado: ForeignKeyViolation em Talhao (idFazenda)

Mensagem típica do Postgres:

- `psycopg2.errors.ForeignKeyViolation`
- `violates foreign key constraint "talhao_idfazenda_fkey"`
- `DETAIL: Key (idfazenda)=(2) is not present in table "fazenda".`

Isso significa que a API está tentando inserir/atualizar `Talhao.idFazenda` com um valor que **não existe** em `Fazenda.id`.

### Causa no seu caso
Front envia `idFazenda: 2` (no payload de `/talhoes/`), mas no banco **não existe** `Fazenda` com `id=2`.

### Correção aplicada
Foi adicionada validação no front em `src/Pages/Dashboard/CadTalhoes.tsx` para impedir envio quando `idFazenda` for inválido (<=0/NaN).

### Próximo passo recomendado
Ainda pode ocorrer erro se `idFazenda` for válido numericamente mas não existir no banco.

O ideal é:
1. Cadastrar uma `Fazenda` e usar o `id` real dela no cadastro de `Talhao`.
2. Ou implementar no backend validação antes do insert/update (existe `Fazenda`?).

