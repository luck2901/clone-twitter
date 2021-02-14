import React, {useState} from "react";
import { dbService, storageService } from 'fbase';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

const Tweet = ({tweetObj, isOwner}) =>  {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.tweet);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
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
        <div className="tweet">
            {
                editing ? (
                    <>
                    <form onSubmit={onSubmit} className="container tweetEdit">
                        <input onChange = {onChange}type = "text" placeholder = "Edit" value={newTweet} required autoFocus className="formInput"/>
                        <input type="submit" value="Update Tweet" className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                    </>
                    ) : 
                <>
                    <h4>{tweetObj.tweet}</h4>
                    {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl}/>}
                    {isOwner && (
                    <div class="tweet_actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
            )}
            </>
            }
        </div>
    )
}

export default Tweet;