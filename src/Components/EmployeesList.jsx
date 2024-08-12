import React ,{useContext} from 'react';
import { EmployeesContext } from '../context/EmployeesContext';
import '../App.css';


function EmployeesList() {

    const { employees } = useContext(EmployeesContext);

    return (
        <div className='container'>

            <div>
                <h1>Employees List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Start Date</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Department</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        {/* la valeur est bien interprétée comme un objet date et aussi pour la formater */}
                        <td>{employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : 'Not set'}</td>
                        <td> {employee.startDate ? new Date(employee.startDate).toLocaleDateString() : 'Not set'}</td>

                        <td>{employee.address.street}</td>
                        <td>{employee.address.city}</td>
                        <td>{employee.address.state}</td>
                        <td>{employee.address.zipCode}</td>
                        <td>{employee.department}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
        
    );
}

export default EmployeesList;