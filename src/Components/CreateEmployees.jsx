import React, {useContext , useState} from 'react';
import { EmployeesContext } from '../context/EmployeesContext';
import states from '../state';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateEmployees() {

    // destructuration pour importer le setEmployee avec usecontext
    const {setEmployees} = useContext(EmployeesContext)
    const [confirmationMessage, setConfirmationMessage] = useState('');

    // 1) creation etat initial de l'employee 
    const [employee , setEmployee] = useState({
        firstName: '',
        lastName: '',
        // initialisé a nul pour mieux gerer le type de valeurs des date avec datePicker
        dateOfBirth: null,
        startDate: null,
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
        },
        department: '',
    })

    // 2) mise a jour de l'etat  local au changement de l'input 

    // a) gestion de mise a jour des input normaux
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    // b) gestion de mise a jour de l'input de l'adresse
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            address: {
                ...prevEmployee.address,
                [name]: value,
            },
        }));
    };

    // b) gestion de mise a jour des input de date avec le pluggin datePicker
    const handleDateChange = (date, name) => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: date,
        }));
    };
    

    // 3) soumission du formulaire et mise a jour de l'etat global 
    const handleSubmit = (e) =>{
        e.preventDefault();
        // mise a jour de l'etat de tous les employees
        setEmployees((prevEmployees) => [...prevEmployees, employee])
        setConfirmationMessage('Employee created successfully!');

    }

    return (
        <form onSubmit={handleSubmit}>

            <h1>Create Employees</h1>

            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" onChange={handleChange}  required/>
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" onChange={handleChange} required />
            </div>

            {/* Integration pluggin REACT DATEPICKER */}
            <div>
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                {/* <input type="text" id="dateOfBirth" name="dateOfBirth" onChange={handleChange} /> */}

                <DatePicker 
                    // selected => selectionne la date depuis l'etat employee
                    selected={employee.dateOfBirth}
                    // onChange => selectionne la nouvelle date dans linput
                    // date : la nouvelle date selectionnée , name : le nom du champs est dateOfBirth
                    onChange={(date) => handleDateChange(date, 'dateOfBirth')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select date of birth"
                    required
                />
            </div>
            <div>
                <label htmlFor="startDate">Start Date</label>
                {/* <input type="text" id="startDate" name="startDate" onChange={handleChange} /> */}

                <DatePicker
                    selected={employee.startDate}
                    onChange={(date) => handleDateChange(date , 'startDate')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select start date"
                    required
                />
            </ div>


            <div>
                <fieldset>
                    <legend>Address</legend>
                    <div>
                        <label htmlFor="street">Street</label>
                        <input id="street" name="street" type="text" onChange={handleAddressChange} required />
                    </div>
                    <div>
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" onChange={handleAddressChange} required/>
                    </div>

                    <div>
                        <label htmlFor="state">State</label>
                        <select name="state" id="state"  onChange={handleAddressChange} required>
                            {states.map((state)=>(
                                <option key={state.abbreviation} value={state.name}>
                                {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="zipCode">Zip Code</label>
                        <input id="zipCode" name="zipCode" type="number" onChange={handleAddressChange} required />
                    </div>
                </fieldset>
            </div>

            <div>
                <label htmlFor="department">Department</label>
                <select  id="department" name="department" onChange={handleChange} required>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HumanResources">Human Resources</option>
                    <option value="Legal">Legal</option>
                </select>
            </div>
            
            <button type='submit'>Save</button>

            <p>{confirmationMessage}</p>
        </form>
    );
}

export default CreateEmployees;