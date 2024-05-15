# Importar mysql
import mysql.connector

# Conectar con la base de datos
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="db_hidrocarburo"
)

mycursor = mydb.cursor()

#Eliminar tabla usuarios si es que ya existe
mycursor.execute("DROP TABLE IF EXISTS usuarios")

#Crear tabla usuarios
mycursor.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario VARCHAR(255),
        nombre VARCHAR(255),
        apellido VARCHAR(255),
        email VARCHAR(255),
        contrasena VARCHAR(255)
    )
""")

# Guardar cambios en la base de datos
mydb.commit()





