import React from 'React'
import {Link} from "react-router-dom"

function SideNavBar(){
    return(
        <div classname='sidebar'>
            <div classname='sidebar-logo'>
                Side Bar
            </div>
            <div>
                <ul classname='sidebar-menu'>
                    <li><Link to='/AdminSurvey'>AdminSurvey</Link></li>
                    <li><Link to='/Questionari'>Questionari</Link></li>
                    <li><Link to='/Report'>Report</Link></li>

                </ul>
            </div>


        </div>
    )
}
