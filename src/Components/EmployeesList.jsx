import React from 'react';
import '../App.css';
import Datalist from '../features/Datalist';
import TableToolbar from '../features/TableToolbar';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';




function EmployeesList() {

    return (
        <div className='container'>
            <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableToolbar/>
                <Datalist/>
                
            </Paper>
            </Box>
        </div>
        
        
    );
}

export default EmployeesList;

