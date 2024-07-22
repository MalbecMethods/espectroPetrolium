import pandas as pd
import os
import random
import timeit

def txt_to_csv(ruta_archivo):
    if not os.path.exists(ruta_archivo):
        print("El archivo no existe")
        return None
    else:
        try:
            print("Intentando crear el archivo CSV")
            # Leer el archivo TXT
            with open(ruta_archivo, 'r') as f:
                lines = f.readlines()

            # Crear la carpeta "csv" si no existe
            if not os.path.exists('csv'):
                os.makedirs('csv')

            nombre_archivo_csv = os.path.join('csv', f'dataset{random.randint(1, 1000)}.csv')
            
            with open(nombre_archivo_csv, 'w', newline='') as f:
                for line in lines:
                    # Separar por espacios y eliminar saltos de línea
                    columns = line.strip().split()
                    f.write(','.join(columns) + '\n')

            # Leer el archivo CSV con pandas
            try:
                df = pd.read_csv(nombre_archivo_csv)
                print(df)
            except pd.errors.ParserError as e:
                print(f"Error al analizar el archivo CSV: {e}")
                return None

            print(f"Se ha creado el archivo CSV en la carpeta 'csv': {nombre_archivo_csv}")
            return df
        except Exception as e:
            print(f"Error al leer el archivo TXT: {e}")

ruta_archivo_txt = 'c:/Users/ipfno/Desktop/test dataset/dataset-proyecto/txt/17058_Job 1_14-Mar-23, PL-9, 14-03-23_Points.txt'
print(timeit.timeit(lambda: txt_to_csv(ruta_archivo_txt), number=1))

print("¡Espero que esta versión te ayude a obtener el CSV deseado en la carpeta 'csv'!")
