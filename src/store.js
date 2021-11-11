import create from 'zustand';


// logged In or  set auth stage process to false

export const useStore = create(set =>({

    stateOfAuth:localStorage.getItem("stateOfAuth") != null ? localStorage.getItem("stateOfAuth") : false,
    setStateOfAuth:(isStateOfAuth)=>{
        localStorage.setItem("stateOfAuth",true);
        set(state =>({stateOfAuth:isStateOfAuth}));
    },

    isLoggedIn: localStorage.getItem("userInfo") ? true : false,
    setIsLoggedIn:(loginState)=>{
        set(state => ({isLoggedIn:loginState}));
    },
    

    signInInfo:{
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    },
    
    setSignInInfo:(userInfo)=>{
        set(state =>({signInInfo : {userInfo}}))
    }

    // authToken: userInfo.token, username:userInfo.username
    // userInfo:{
    //     authToken: localStorage.getItem("AuthToken") ? localStorage.getItem("AuthToken") : null,
    //     username:null
    // },
    


}))