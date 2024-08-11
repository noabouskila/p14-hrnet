import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import EmployeesList from './Components/EmployeesList';
import CreateEmployees from './Components/CreateEmployees';
import { EmployeeProvider } from './context/EmployeesContext';



function App() {
  return (
    <div>
      <EmployeeProvider>
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<CreateEmployees/>} />
                <Route path='/employees-list' element={<EmployeesList/>} />
            </Routes>
            <Footer/>
        </Router>
      </EmployeeProvider>
     
    </div>
  );
}

export default App;
