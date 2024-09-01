import React , {useContext} from 'react' ;
import  {EmployeesContext}  from '../context/EmployeesContext';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Composant pour l'en-tete   +  la recherche
export default function TableToolbar() {

  const { searchQuery, setSearchQuery } = useContext(EmployeesContext);
    
  
  // Mise à jour de searchQuery
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" component="div">
        Employees List
      </Typography>

      <TextField
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        variant="outlined" // css
        size="small"
        sx={{ marginLeft: 'auto', marginRight: 2 }}
      />
    </Box>
  );
}

TableToolbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};