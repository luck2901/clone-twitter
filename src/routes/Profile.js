import React, { useEffect } from "react";
import { authService, dbService } from 'fbase';
import { useHistory } from "react-router-dom";

const Profile = ({userObj}) =>{
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
    };
    const getMyTweet = async() =>{
        const tweets = await dbService.collection("tweets").where("creatorID","==",userObj.uid).orderBy("creatorAt").get(); //필터링하는 방법
        //
        tweets.docs.map(doc => doc.data());
    }
    useEffect(() =>{
        getMyTweet();
    },[])
    return(
    <>
        <button onClick = {onLogOutClick}>Log Out</button>
    </>)
}
export default Profile;