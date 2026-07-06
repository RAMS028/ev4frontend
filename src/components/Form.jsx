import React, { useState, useEffect } from 'react';

function Form({ addOrUpdateItem, itemToEdit }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value);
    } else {
      setInputValue('');
    }
    setError('');
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError('El campo no puede estar vacío ni contener solo espacios.');
      return;
    }

    addOrUpdateItem(inputValue.trim());
    setInputValue('');
    setError('');
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError('');
          }}
        />
        <button className="form-button" type="submit">
          {itemToEdit ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </>
  );
}

export default Form;