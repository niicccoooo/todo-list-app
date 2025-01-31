import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Test para probar que una tarea se agrega exitosamente
test('agrega la tarea "Tarea de prueba" a la lista', async () => {
  // Crea un mock de axios
  const mock = new MockAdapter(axios);

  // Mockea la llamada GET inicial (cuando el componente se monta)
  mock.onGet('http://localhost:5000/tasks').reply(200, []);

  // Mockea la llamada POST al agregar una tarea
  mock.onPost('http://localhost:5000/tasks').reply(200, { id: 1, description: 'Tarea de prueba', completed: false });

  // Mockea la llamada GET después de agregar la tarea
  mock.onGet('http://localhost:5000/tasks').reply(200, [{ id: 1, description: 'Tarea de prueba', completed: false }]);

  render(<App />);

  // Busca el input y el boton
  const inputElement = screen.getByPlaceholderText(/Estudiar programacion./i);
  const buttonElement = screen.getByText(/Agregar/i);

  // Simula escribir en el input y hacer clic en el boton
  fireEvent.change(inputElement, { target: { value: 'Tarea de prueba' } });
  fireEvent.click(buttonElement);

  // Espera a que la tarea aparezca en el DOM
  await waitFor(() => {
    const taskElement = screen.getByText(/Tarea de prueba/i);
    expect(taskElement).toBeInTheDocument();
  });

});