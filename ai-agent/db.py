import psycopg2
import psycopg2.extras
import pandas as pd
import json
import os
from sqlalchemy import create_engine
from dotenv import load_dotenv

# Forzar recarga de .env aunque Streamlit ya haya iniciado
load_dotenv(override=True)

SUPABASE_URL = os.getenv("SUPABASE_URL")

def get_db_connection():
    if not SUPABASE_URL:
        raise ValueError("Falta SUPABASE_URL en el entorno (.env)")
    conn = psycopg2.connect(SUPABASE_URL)
    return conn

def init_db():
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Tabla de prospectos (PostgreSQL Syntax: SERIAL)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS leads (
                id SERIAL PRIMARY KEY,
                nombre TEXT,
                url TEXT,
                email TEXT,
                score INTEGER,
                tti TEXT,
                lead_score INTEGER,
                status TEXT,
                ultimo_contacto TEXT,
                thread_id TEXT,
                fallas TEXT DEFAULT ''
            )
        ''')
        
        # Tabla de logs web
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS visit_logs (
                id SERIAL PRIMARY KEY,
                timestamp TEXT,
                path TEXT,
                referrer TEXT,
                ip TEXT
            )
        ''')
        
        # Tabla para configuraciones
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS config (
                key TEXT PRIMARY KEY,
                value TEXT
            )
        ''')
        
        # Rollback previo para evitar error en transacciones
        conn.commit()
        
        # Intentar modificar la tabla antigua si faltan columnas. 
        # (En Supabase creamos desde 0, así que no hará falta, pero lo dejamos por si acaso)
        try:
            cursor.execute("ALTER TABLE leads ADD COLUMN fallas TEXT DEFAULT ''")
            conn.commit()
        except psycopg2.errors.DuplicateColumn:
            conn.rollback() # Ignorar si ya existe
        except Exception:
            conn.rollback()
            
    except Exception as e:
        print("❌ Error inicializando Supabase DB:", e)
    finally:
        if conn:
            conn.close()

def insert_lead(lead_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO leads (nombre, url, email, score, tti, lead_score, fallas, status, ultimo_contacto, thread_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ''', (
        lead_data.get('nombre', ''),
        lead_data.get('url', ''),
        lead_data.get('email', ''),
        lead_data.get('score', 0),
        lead_data.get('tti', 'N/A'),
        lead_data.get('lead_score', 0),
        lead_data.get('fallas', ''),
        lead_data.get('status', 'Nuevo'),
        lead_data.get('ultimo_contacto', ''),
        lead_data.get('thread_id', '')
    ))
    conn.commit()
    conn.close()

def insert_visit(visit_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO visit_logs (timestamp, path, referrer, ip)
        VALUES (%s, %s, %s, %s)
    ''', (
        visit_data.get('timestamp', ''),
        visit_data.get('path', ''),
        visit_data.get('referrer', ''),
        visit_data.get('ip', '')
    ))
    conn.commit()
    conn.close()

def get_engine():
    # Supabase / SQLAlchemy necesitan 'postgresql://' y usualmente la URL la trae.
    load_dotenv(override=True)
    url = os.getenv("SUPABASE_URL")
    if url and url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    return create_engine(url)

def get_all_leads_df():
    engine = get_engine()
    df = pd.read_sql_query("SELECT * FROM leads ORDER BY score DESC", engine)
    return df

def get_all_visits_df():
    engine = get_engine()
    df = pd.read_sql_query("SELECT * FROM visit_logs ORDER BY id DESC", engine)
    return df

def update_lead_status(email, url, status, ultimo_contacto):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE leads 
        SET status = %s, ultimo_contacto = %s
        WHERE email = %s OR url = %s
    ''', (status, ultimo_contacto, email, url))
    conn.commit()
    conn.close()

# Inicializamos la DB remota apenas cargue el módulo
init_db()
