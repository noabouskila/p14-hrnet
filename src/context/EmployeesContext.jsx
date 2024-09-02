import React , {createContext , useEffect, useState} from 'react';
import { useLocalStorage } from '../hooks/localStorage';


export  const  EmployeesContext = createContext();

export const EmployeeProvider = ({ children })=>  {

    // 1
    const [searchQuery, setSearchQuery] = useState(''); 

    // 2
    const [employees, setEmployees] = useLocalStorage('employees', []);


    const resetEmployees = () => {
        setEmployees([]); // Vider la liste des employés
    };
    // localStorage.removeItem('employees'); // Supprime les données des employés


    return (
        <EmployeesContext.Provider value={{employees, setEmployees, searchQuery, setSearchQuery, resetEmployees }} >
            {children}
        </EmployeesContext.Provider>
    );
}

