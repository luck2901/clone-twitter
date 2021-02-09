import AppRouter from "components/Router"
import React, {useEffect, useState} from "react";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false); //init이 false이면 router 숨김.
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObject, setUserObject] = useState(null);
  useEffect(() =>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObject(user);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
      });
    }, []);   
    return (
      <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObject}/> : "Initializing..."}
        <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
      </>
    );
  }

export default App;