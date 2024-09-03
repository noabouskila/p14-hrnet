import React , {createContext , useEffect, useState} from 'react';
import { useLocalStorage } from '../hooks/localStorage';


export  const  EmployeesContext = createContext();

export const EmployeeProvider = ({ children })=>  {

    // 1 etat de la barre de recherche
    const [searchQuery, setSearchQuery] = useState(''); 

    // 2 etat des employés synchronisé avec le local storage  ( si valeur existe sous clé employees  : recuperer valeur et mettre dans state : sinon initialisé le state à un trableua vide)
    const [employees, setEmployees] = useLocalStorage('employees', []);


    //Au cas ou : Vider la liste des employés
    const resetEmployees = () => {
        setEmployees([]); 
    };
    // localStorage.removeItem('employees'); // Supprime les données des employés


    return (
        <EmployeesContext.Provider value={{employees, setEmployees, searchQuery, setSearchQuery, resetEmployees }} >
            {children}
        </EmployeesContext.Provider>
    );
}

