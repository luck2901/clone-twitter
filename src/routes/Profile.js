import React, { useEffect, useState } from "react";
import { authService, dbService } from 'fbase';
import { useHistory } from "react-router-dom";

const Profile = ({refreshUser, userObj}) =>{
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyTweet = async() =>{
        const tweets = await dbService.collection("tweets").where("creatorID","==",userObj.uid).orderBy("creatorAt").get(); 
        //필터링하는 방법
        //orderby를 만드려면 index 생성해야함.
        //tweets.docs.map(doc => doc.data());
    }
    const onChange = (e) =>{
        const{
            target:{value}
        } = e;
        setNewDisplayName(value);
    }
    const onSubmit = async(e) =>{
        e.preventDefault();
        if(userObj.displayName !==newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
        };
        refreshUser();
    }
    useEffect(() =>{
        getMyTweet();
    },[])
    return(
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
        <input onChange = {onChange} type="text" autoFocus placeholder="Display name" value = {newDisplayName}
        className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}/>
    </form>
    <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
        )
}
export default Profile;