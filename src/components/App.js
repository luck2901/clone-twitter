import AppRouter from "components/Router"
import React, {useEffect, useState} from "react";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false); //init이 false이면 router 숨김.
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() =>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
      });
    }, []);   
    return (
      <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
        <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
      </>
    );
  }

export default App;