import { useState, useEffect } from 'react';

// hooks personnalisé pour synchroniser l'etat avec le localstorage
export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => { 
    // recupere la key du localstorage
    const savedValue = localStorage.getItem(key);
    // la transforme en tableau
    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  useEffect(() => {
    // transformer en string pour stocker dans le localstorage
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
