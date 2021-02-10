import React,{ useEffect, useState }  from "react";
import { dbService } from './../fbase';
import Tweet from './../components/Tweet';

const Home = ({userObj}) =>{
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    useEffect(() =>{
        dbService.collection("tweets").onSnapshot((snapshot) =>{
            const tweetArray = snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}));
            setTweets(tweetArray);
        })
    },[])
    const onSubmit = async(event) =>{
        event.preventDefault();
        await dbService.collection("tweets").add({
            tweet : tweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
        });
        setTweet("");
    }
    const onChange = (event) =>{
        const{target:{value}}  = event;
        setTweet(value);
    };
    const onFileChange = (event) =>{
         const{target:{files}} = event;
         const theFile = files[0];
    }
    return(
    <div>
        <form onSubmit ={onSubmit}>
            <input value = {tweet} onChange= {onChange}type="text" placeholder="What is on your mind?" maxLength={120} />
            <input type = "file" accept="image/*" onChange={onFileChange}/> 
            <input type="submit" value="Tweet" />
        </form>
        <div>
            {tweets.map((tweet) => 
            (<Tweet key={tweet.id} tweetObj = {tweet} isOwner={tweet.creatorId===userObj.uid} />
                ))}
        </div>
    </div>
    );
}

export default Home;