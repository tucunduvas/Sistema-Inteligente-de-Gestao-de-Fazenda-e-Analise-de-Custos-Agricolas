import psycopg2


def conectar():

    conexao = psycopg2.connect(
        host="localhost",
        database="fazenda",
        user="postgres",
        password="123456",
        port="5432"
    )

    return conexao
