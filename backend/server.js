const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let currentId = 1;

// Middleware de logging 
app.use((req, _, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// GET Todas las tareas
app.get('/tasks', (req, res) => {
    try {
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// POST Crear tarea
app.post('/tasks', (req, res) => {
    if (!req.body.description?.trim()) {
        return res.status(400).json({ error: 'La descripcion es requerida.' });
    }
    
    const newTask = {
        id: currentId++,                  // Asigna un ID unico a la tarea
        description: req.body.description.trim(), // Obtiene la descripcion de la tarea
        completed: false,                 // Inicializa la tarea como no completada
        createdAt: new Date().toISOString() // Agrega la fecha y hora de creacion
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT Toggle completado
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    
    task.completed = !task.completed;
    task.updatedAt = new Date().toISOString(); 
    res.status(200).json(task);
});

// DELETE Tarea
app.delete('/tasks/:id', (req, res) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    
    res.status(204).end();
});

// Manejo de errores global 
app.use((err, _, res, __) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`); // Log adicional
});