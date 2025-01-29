import sqlite3

# Ensure the filename is consistent throughout
DATABASE_FILE = "db.sqlite3"  # Rename your file appropriately

def create_db_and_tables():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY,
        city_name TEXT UNIQUE,
        added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()
    conn.close()

def add_favorite(city: str):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute("INSERT OR IGNORE INTO favorites (city_name) VALUES (?)", (city,))
    conn.commit()
    conn.close()

def get_favorites():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT city_name FROM favorites")
    cities = [row[0] for row in cursor.fetchall()]
    conn.close()
    return cities