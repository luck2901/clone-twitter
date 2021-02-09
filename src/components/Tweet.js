import React from "react";

const Tweet = ({tweetObj, isOwner}) => (
    <div>
        <h4>{tweetObj.tweet}</h4>
        {isOwner && (
            <>
            <button>DEL</button>
            <button>EDIT</button>
            </>
        )}
    </div>
)

export default Tweet;