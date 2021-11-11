import {
    Route,
    useHistory,
  } from "react-router-dom";
import { useStore } from "../store";

const ProtectedRoute = ({component:Component,...rest})=>{

    const isLoggedIn = useStore(state => state.isLoggedIn);

    const history = useHistory();

    return (
        <Route {...rest}  
        render={
            (props)=>{
                if(isLoggedIn){
                    return <Component {...props} />;
                }
                return history.push('/');
                
            }
        }
        
        />

    )

}   
export default ProtectedRoute;


