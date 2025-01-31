import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Efecto que se ejecuta al montar el componente para cargar las tareas iniciales
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Hace una solicitud GET al backend para obtener las tareas
                const response = await axios.get('http://localhost:5000/tasks');
                setTasks(response.data);
            } catch (err) {
                setError('No se pudo cargar la lista. Está corriendo el backend?');
            } finally {
                setLoading(false);
            }
        };
        // Llama a la función para cargar las tareas
        fetchData();
    }, []);

    // Funcion para manejar el envío del formulario (agregar una nueva tarea)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Valida que la tarea tenga al menos 3 caracteres
        if (newTask.trim().length < 3) {
            setError('Minimo 3 caracteres.');
            return;
        }
        
        try {
            await axios.post('http://localhost:5000/tasks', { description: newTask });
            // Limpia el input despues de agregar la tarea
            setNewTask('');
            setError('');
            const response = await axios.get('http://localhost:5000/tasks');
            // Actualiza el estado con la nueva lista de tareas
            setTasks(response.data);
        } catch (err) {
            setError('Error creando tarea.');
        }
    };

    // Funcion para marcar una tarea como completada o no completada
    const toggleTask = async (id) => {
        try {
            // Hace una solicitud PUT al backend para actualizar el estado de la tarea
            await axios.put(`http://localhost:5000/tasks/${id}`);
            const updatedTasks = tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            setTasks(updatedTasks); 
        } catch (err) {
            setError('Error actualizando tarea.');
        }
    };

    // Funcion para eliminar una tarea
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError('Error eliminando tarea.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">To-Do List</h1>
            
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value);
                        setError('');
                    }}
                    placeholder="Ej: Estudiar programacion."
                    className="input"
                />
                <button type="submit" className="button">Agregar</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Cargando...</div>
            ) : (
                // Lista de tareas
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task.id} className="task-item">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="checkbox"
                            />
                            {/* Texto de la tarea, con estilo tachado si está completada */}
                            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                                {task.description}
                                {task.updatedAt && (
                                    <small className="timestamp">
                                        (Editada: {new Date(task.updatedAt).toLocaleTimeString()})
                                    </small>
                                )}
                            </span>
                            {/* Boton para eliminar la tarea */}
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="delete-button"
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
