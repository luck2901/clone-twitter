import React,{useState} from "react";
import "firebase/auth";

const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = e =>{
        const {target:{name,value}} = e;
        if(name === "email"){
            setEmail(e.target.value);
        }else if(name === "password") {
            setPassword(e.target.value);
        }
    }
    const onSubmit = e =>{
        e.preventDefault();
    }
return (
    <div>
        <form onSubmit = {onSubmit}>
            <input name = "email" type="text" placeholder = "Email" required value = {email}  onChange={onChange}/>
            <input name = "password" type="password" placeholder = "Password" required value={password} onChange={onChange}/>
            <input type="submit" value="Log In" />
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>
)
}
export default Auth;