import React, { useContext, useState , useMemo } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { EmployeesContext } from '../context/EmployeesContext';


export default function Datalist() {
    
  const { employees  , searchQuery } = useContext(EmployeesContext);
    

  // 1) Fonction pour formater les dates en "MM/dd/yyyy"
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const day = String(date.getDate()).padStart(2, '0'); // Ajouter un zéro devant si nécessaire
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return date; // Retourner la date non formatée si elle est invalide
  };


  // 2) Filtre employé depuis tabletoolbar : Utilisation de useMemo pour mémoriser la liste filtrée
  const filteredEmployees = useMemo(() => {
  return employees.filter((employee) =>
    // `${employee.firstName} ${employee.lastName} ${employee.dateOfBirth} ${employee.startDate} ${employee.department} ${employee.address.street} ${employee.address.city} ${employee.address.state} ${employee.address.zipCode}`
    `${employee.firstName} ${employee.lastName} ${formatDate(new Date(employee.dateOfBirth))} ${formatDate(new Date(employee.startDate))} ${employee.department} ${employee.address.street} ${employee.address.city} ${employee.address.state} ${employee.address.zipCode}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  }, [employees, searchQuery]); // Le calcul est refait seulement si employees ou searchQuery change



  // 3) Configuration des colonnes pour le DataGrid
  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'street', headerName: 'Street', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'zipCode', headerName: 'Zip Code', flex: 1 },
  ];

  // 4) Transformer les données  filtrées pour les rendre compatibles avec le DataGrid ("aplatit" les données pour etre directement accessible)
  const rows = filteredEmployees.map((employee, index) => ({
    id: index,
    firstName: employee.firstName,
    lastName: employee.lastName,
    dateOfBirth:  formatDate(new Date(employee.dateOfBirth)),
    startDate: formatDate(new Date(employee.startDate)),
    department: employee.department,
    street: employee.address.street,
    city: employee.address.city,
    state: employee.address.state,
    zipCode: employee.address.zipCode,
  }));



    
  return ( 
    <DataGrid
        autoHeight
        // Affichage données filtrées 
        rows={rows}
        // configuration collonnes depuis le tableau columns
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        disableSelectionOnClick
        getRowId={(row) => row.id || `${row.firstName}-${row.lastName}`}
    />
  );
}
