import React,{Fragment} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStore } from '../store';
import { handleLogout } from '../Utilities/Utility';

function Dropdown({handleDropMenu}) {

    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
    const history = useHistory();
    return (
        <div className="grid grid-rows-2 text-center bg-indigo-100" onClick={handleDropMenu}>
            <Link to="/" className="p-4 hover:bg-blue-200 ">Home</Link>
            <Link to="/news" className="p-4 hover:bg-blue-200">All News</Link>

            {isLoggedIn ? (
          <Fragment >
    
                <Link to="/admin" className="p-4">
                  Admin
                </Link>{" "}
            
                
                

                <Link to="#" className="p-4" onClick={()=> handleLogout(setIsLoggedIn,history)}>
                  Logout
                </Link>
              
           
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/login" className="p-4">
              Login
            </Link>
          </Fragment>
        )}



        </div>
    )
}

export default Dropdown
