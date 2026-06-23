import psycopg2

def conectar():
    conexao = psycopg2.connect(
        host="ep-noisy-dawn-atju72se-pooler.c-9.us-east-1.aws.neon.tech",
        database="neondb",
        user="neondb_owner",
        password="npg_gE23GRTHlBkV",
        port="5432",
        sslmode="require"
    )

    return conexao
