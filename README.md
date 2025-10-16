Main.js
Este archivo actúa como el punto de entrada del script. Su función primordial es crear la interfaz de 
usuario, específicamente el menú "Reportes Funcionales" en la planilla de Google Sheets. Las funciones 
definidas aquí, como “handleColorearCursos” y “handleDependientes”, se encargan de manejar los eventos 
generados por las interacciones del usuario con dicho menú. Estas funciones coordinan el flujo de trabajo: 
primero invocan a las funciones de readSheets.js para obtener los datos, luego envían esos datos a analysis.js 
para su procesamiento y, finalmente, pasan los resultados a writeSheets.js para que se reflejen en la hoja de cálculo.

ReadSheets.js
El propósito exclusivo de este módulo es interactuar con la hoja de cálculo para leer y extraer datos. La función 
“readCatalogo” accede a la hoja "catalogo", obtiene todos los valores y los procesa para convertirlos de un arreglo 
a un formato más estructurado. Cada objeto representa un curso y contiene sus propiedades (código, nombre, etc.), además 
de un campo “rowIndex” para mantener una referencia a su posición original en la planilla.

Analysis.js
Este archivo contiene la lógica. Las funciones aquí,como “countRequisitos” y “findDependientes” realizan todos los cálculos
y análisis requeridos. Es fundamental destacar que este módulo opera de manera aislada de la hoja de cálculo, sin leerla ni
modificarla directamente. Recibe los datos ya estructurados desde readSheets.js, ejecuta los algoritmos necesarios y devuelve
un nuevo conjunto de datos con la información procesada.

WriteSheets.js
Este módulo es modifica la hoja de cálculo para presentar los resultados del análisis al usuario. Las funciones como “applyColor”
y “writeDependientes” toman los datos procesados por analysis.js y los utilizan para realizar cambios visuales en la planilla, como 
aplicar colores de fondo a las filas según el número de requisitos del curso y crear o actualizar la columna "Dependientes" con la 
información correspondiente. Este archivo encapsula todas las operaciones que generan "efectos secundarios" (modificaciones en la planilla), 
manteniendo la separación de responsabilidades exigida en la tarea.
