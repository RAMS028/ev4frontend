import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './index.css';
import './App.css';

function App() {
  const [items, setItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('items'));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });
  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(
        items.map((item) =>
          item.id === itemToEdit.id
            ? { ...item, value }
            : item
        )
      );
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value, completed: false }]);
    }
  };

  const deleteItem = (id) => {
    const confirmado = window.confirm('¿Seguro que quieres eliminar este elemento?');
    if (confirmado) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  const toggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteAll = () => {
    if (items.length === 0) return;
    const confirmado = window.confirm('¿Seguro que quieres eliminar TODOS los elementos?');
    if (confirmado) {
      setItems([]);
    }
  };

  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <h1> Certamen 4 Front End </h1>

      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />

      <input
        className="search-input"
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <List
        items={filteredItems}
        deleteItem={deleteItem}
        editItem={editItem}
        toggleComplete={toggleComplete}
      />

      <div className="list-footer">
        <p className="counter-text">Total: {items.length}</p>
        <button className="btn-delete-all" onClick={deleteAll}>
          Borrar todo
        </button>
      </div>
    </div>
  );
}

export default App;