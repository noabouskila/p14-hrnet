import React , {createContext , useEffect, useState} from 'react';
import { useLocalStorage } from '../hooks/localStorage';


export  const  EmployeesContext = createContext();

export const EmployeeProvider = ({ children })=>  {

    // 1
    const [searchQuery, setSearchQuery] = useState(''); 

    // 2
    const [employees, setEmployees] = useLocalStorage('employees', []);

    // const [employees ,setEmployees] = useState(()=>{

    //     // récupérer la liste des employés depuis le local storage
    //     const savedEmployees = localStorage.getItem('employees')

    //     // Si des employés sont trouvés dans le local storage, on les parse (convertir de string à tableau d'objets)
    //     // Sinon, on initialise l'état avec un tableau vide (aucun employé enregistré)
    //     return savedEmployees ? JSON.parse(savedEmployees) : []
    // })



    // synchroniser l'état "employees" avec le local storage
    // useEffect(()=>{

    //     // Chaque fois que l'état "employees" change, on met à jour le local storage
    //     // On convertit l'état "employees" en string avec JSON.stringify et on l'enregistre dans le local storage
    //     localStorage.setItem('employees' , JSON.stringify(employees))
    // }, [employees])



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

