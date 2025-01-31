# To-Do List App

Aplicacion full-stack para gestion de tareas con backend en Node.js (Express) y frontend en React.

![Demo](https://i.imgur.com/S2NLZXW.png) 

## Características

✅ Crear nuevas tareas  
✅ Marcar tareas como completadas  
✅ Eliminar tareas  
✅ Persistencia en memoria (backend)  
✅ Interfaz responsive  
✅ Manejo de errores\
✅ Tests para asegurar funcionamiento

## Tecnologías

- **Frontend**: React, Axios, CSS  
- **Backend**: Node.js, Express, CORS  
- **Herramientas**: Git, npm

## Instalacion

### Requisitos previos
- Node.js v18+
- npm v9+

### Pasos para configuracion

1. **Clonar repositorio**

git clone https://github.com/niicccoooo/todo-list-app.git \  
cd todo-list-app

2. **Configurar backend**

cd backend\
npm install

3. **Configurar frontend**

cd ../frontend\
npm install

## Ejecucion

1. **Iniciar backend (puerto 5000)**

cd backend\
npm start

2. **Iniciar frontend (puerto 3000)**

cd ../frontend\
npm start

La aplicacion se abrirá automaticamente en http://localhost:3000.

3. **Tests**

cd frontend\
npm test

(Esto ejecuta los tests definidos en src/App.test.js y muestra los resultados en la terminal.)


### **API Endpoints (Backend)**

| Método | Endpoint         | Descripción                   |
|--------|------------------|-------------------------------|
| GET    | `/tasks`         | Obtener todas las tareas      |
| POST   | `/tasks`         | Crear nueva tarea             |
| PUT    | `/tasks/:id`     | Actualizar estado de tarea    |
| DELETE | `/tasks/:id`     | Eliminar tarea                |