import React from 'react';
import  wealthHealth  from '../assets/wealthHealth.svg'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            
            <div>
               <Link to="/">
                    <img src={wealthHealth} alt="logo hrNet wealthhealth" />
               </Link> 
                <span><i>HRnet Platforme interne de wealthHealth</i></span>
            </div> 

            <Link className='header-link-employees' to="/employees-list">Listes des employés</Link>

        </header>
    );
}

export default Header;