import React, { useContext, useState , useMemo } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { EmployeesContext } from '../context/EmployeesContext';


export default function Datalist() {
    
    const { employees  , searchQuery } = useContext(EmployeesContext);
    

   // 1) Utilisation de useMemo pour mémoriser la liste filtrée
   const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      `${employee.firstName} ${employee.lastName} ${employee.dateOfBirth} ${employee.startDate} ${employee.department} ${employee.address.street} ${employee.address.city} ${employee.address.state} ${employee.address.zipCode}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]); // Le calcul est refait seulement si employees ou searchQuery change


    // 2) Configuration des colonnes pour le DataGrid
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

    // 3)  Transformer les données pour les rendre compatibles avec le DataGrid ("aplatit" les données pour etre directement accessible)
    const rows = filteredEmployees.map((employee, index) => ({
        id: index,
        firstName: employee.firstName,
        lastName: employee.lastName,
        dateOfBirth: employee.dateOfBirth,
        startDate: employee.startDate,
        department: employee.department,
        street: employee.address.street,
        city: employee.address.city,
        state: employee.address.state,
        zipCode: employee.address.zipCode,
    }));



    
  return ( 
    <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        disableSelectionOnClick
        getRowId={(row) => row.id || `${row.firstName}-${row.lastName}`}
    />
  );
}
