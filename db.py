import psycopg2


# ==========================================
# FUNÇÃO RESPONSÁVEL PELA CONEXÃO COM O BANCO
# ==========================================
def conectar():

    conexao = psycopg2.connect(

        # endereço do servidor PostgreSQL
        # normalmente localhost quando o banco está no próprio PC
        host="localhost",

        # nome do banco de dados
        # ALTERAR caso o banco tenha outro nome
        database="fazenda",

        # usuário do PostgreSQL
        # ALTERAR caso utilize outro usuário
        user="postgres",

        # senha do PostgreSQL
        # ALTERAR para a senha correta do banco
        password="123456",

        # porta padrão do PostgreSQL
        # alterar apenas se a porta do banco for diferente
        port="5432"
    )

    # retorna a conexão aberta
    return conexao
