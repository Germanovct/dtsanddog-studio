import sqlite3
import pandas as pd
import json

DB_PATH = "crm.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Tabla de prospectos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            url TEXT,
            email TEXT,
            score INTEGER,
            tti TEXT,
            lead_score INTEGER,
            status TEXT,
            ultimo_contacto TEXT,
            thread_id TEXT
        )
    ''')
    
    # Tabla de logs web
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS visit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            path TEXT,
            referrer TEXT,
            ip TEXT
        )
    ''')
    
    # Tabla para query configuration settings
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS config (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    ''')
    
    # Migración: Add fallas column si no existe
    try:
        cursor.execute("ALTER TABLE leads ADD COLUMN fallas TEXT DEFAULT ''")
    except sqlite3.OperationalError:
        pass # La columna ya existe
    
    conn.commit()
    conn.close()

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def insert_lead(lead_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO leads (nombre, url, email, score, tti, lead_score, fallas, status, ultimo_contacto, thread_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        VALUES (?, ?, ?, ?)
    ''', (
        visit_data.get('timestamp', ''),
        visit_data.get('path', ''),
        visit_data.get('referrer', ''),
        visit_data.get('ip', '')
    ))
    conn.commit()
    conn.close()

def get_all_leads_df():
    conn = get_db_connection()
    df = pd.read_sql_query("SELECT * FROM leads", conn)
    conn.close()
    return df

def get_all_visits_df():
    conn = get_db_connection()
    df = pd.read_sql_query("SELECT * FROM visit_logs", conn)
    conn.close()
    return df

def update_lead_status(email, url, status, ultimo_contacto):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE leads 
        SET status = ?, ultimo_contacto = ?
        WHERE email = ? OR url = ?
    ''', (status, ultimo_contacto, email, url))
    conn.commit()
    conn.close()

# Inicializar DB al cargar el módulo
init_db()
