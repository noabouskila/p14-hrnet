import React, {useContext , useState , useCallback} from 'react';
import { EmployeesContext } from '../context/EmployeesContext';

import '../App.css';

// importations donnée des etats
import states from '../state';


// importation de la bibliotheque reactDatePicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// importation de la bibliotheque modal
import  Modal from '@noabouskil/p14-modal/dist/Modal/Modal';
import '@noabouskil/p14-modal/dist//Modal/Modal.css';



function CreateEmployees() {

    // destructuration pour importer le setEmployee avec usecontext
    const {setEmployees} = useContext(EmployeesContext)

    // usestates
    const [isModalOpen , setModalIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    // 1) creation etat initial de l'employee 
    const initialEmployeeState ={
        firstName: '',
        lastName: '',
        // initialisé a nul pour mieux gerer le type de valeurs des date avec datePicker
        dateOfBirth: null,
        startDate: null,
        address: {
            street: '',
            city: '',
            state: states[0].name,  // Définir le premier état par défaut,
            zipCode: '',
        },
        department: 'Sales',  // Définir le département par défaut
    }

    const [employee , setEmployee] = useState(initialEmployeeState)

    // reinitialisation du formualire  (apres la soummission)
    const resetForm = useCallback(() => {
        setEmployee(initialEmployeeState);
    }, []);

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

        // Vérification que la startDate est au moins 16 ans après la date de naissance*

        const validateDates = (birthDate, startDate)=>{
            const birth = new Date(birthDate);
            const start = new Date(startDate);
            const ageAtStart = start.getFullYear() - birth.getFullYear();
    
            const isValidAge = ageAtStart > 16 || (ageAtStart === 16 && start >= new Date(birth.setFullYear(birth.getFullYear() + 16)));
    
            if (!isValidAge) {
                setErrorMessage("The start date must be at least 16 years after the date of birth.");
                return;
            }
            else{
                setErrorMessage(''); // Effacer le message d'erreur si la condition est respectée
            }
    
        }

        // Si les deux dates sont présentes, effectuer la validation
        if(name === 'startDate' && employee.dateOfBirth ) {
            validateDates(employee.dateOfBirth, date);

        // Si la date de naissance est modifiée après la sélection de la date de début
        }else if(name === 'dateOfBirth' && employee.startDate) {
            validateDates(date, employee.startDate);
        }
       
        // Mise à jour de l'état de l'employé avec la nouvelle date
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: date,
        }));
    };
    

    // 3) soumission du formulaire et mise a jour de l'etat global 
    const handleSubmit = (e) =>{
        e.preventDefault();


        // Formatage des dates
        const formattedDateOfBirth = employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : null;
        const formattedStartDate = employee.startDate ? new Date(employee.startDate).toLocaleDateString() : null;


        // Mise à jour de l'état de tous les employés avec un nouvel ID
        const newEmployee = {
            ...employee,
            dateOfBirth: formattedDateOfBirth,
            startDate: formattedStartDate,
        };

        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        setModalIsOpen(true) //ouvrir la modale apres la soumission du form

        // Réinitialiser le formulaire
        resetForm()
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }





    return (
        <div className='container'>
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

                        // : Affiche un menu déroulant permettant de sélectionner l'année.
                        showYearDropdown 
                        // : Affiche un menu déroulant permettant de sélectionner le mois.
                        showMonthDropdown 
                        // : Change le comportement des menus déroulants pour permettre une sélection rapide (au lieu de devoir faire défiler un par un).
                        dropdownMode="select" 
                        
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

                        // : Affiche un menu déroulant permettant de sélectionner l'année.
                        showYearDropdown 
                        // : Affiche un menu déroulant permettant de sélectionner le mois.
                        showMonthDropdown 
                        // : Change le comportement des menus déroulants pour permettre une sélection rapide (au lieu de devoir faire défiler un par un).
                        dropdownMode="select" 
                       
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

                {/* Affichage du message d'erreur */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* <p>{confirmationMessage}</p>  */}
                {/* Affichage de la modale */}
                {isModalOpen && (
                    
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <h2>Employee created Succesfully</h2>
                        <button id='btn-modal' onClick={closeModal}>Close</button>
                    </Modal>
                )}

            </form>

        </div>

    );
}

export default CreateEmployees;