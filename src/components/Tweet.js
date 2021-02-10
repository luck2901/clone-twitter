import React, {useState} from "react";
import { dbService } from 'fbase';

const Tweet = ({tweetObj, isOwner}) =>  {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.tweet);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
        }
    };
    const toggleEditing = () =>setEditing((prev) => !prev);
    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            tweet:newTweet,
        });
        setEditing(false);
    }
    const onChange = (e) =>{
        const {target:{value}} = e;
        setNewTweet(value);
    }
    return(
        <div>
            {
                editing ? (
                    <>
                    <form onSubmit={onSubmit}>
                        <input onChange = {onChange}type = "text" placeholder = "Edit" value={newTweet} required />
                        <input type="submit" value="Update Tweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                    </>
                    ) : 
                <>
                    <h4>{tweetObj.tweet}</h4>
                    {isOwner && (
                    <>
                    <button onClick={onDeleteClick}>DEL</button>
                    <button onClick={toggleEditing}>EDIT</button>
                    </>
            )}
            </>
            }
        </div>
    )
}

export default Tweet;