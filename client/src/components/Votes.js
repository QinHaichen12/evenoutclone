import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Votes = ({upvotes, downvotes, threadId}) => {
    const [upVotes, setUpVotes] = useState(upvotes);
    const [downVotes, setDownVotes] = useState(downvotes);
    const { id } = useParams();

    const handleVoteFunction = (action) => {
        fetch("http://localhost:8080/api/thread/vote", {
           method: "POST",
           body: JSON.stringify({
                threadId,
                userId:localStorage.getItem("_id"),
                action
           }),
           headers: {
            "Content-Type": "application/json",
           }, 
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message);
                } else {
                    fetchVoteCounts();
                    alert(data.message);
                }
            })
            .catch((err) => console.log(err));
    }

    const fetchVoteCounts = () => {
        fetch("http://localhost:8080/api/thread/votes", {
            method: "POST",
            body: JSON.stringify({
                id: threadId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUpVotes(data.upvotes);
                setDownVotes(data.downvotes);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
		fetchVoteCounts();
    }, [threadId]);

    return (
        <div className="votes__container">
        <div className="vote__item">
            <button className="voteBtn" onClick={() => handleVoteFunction('upvote')}>
            Upvote
            </button>
            <p>{upVotes}</p>
        </div>
        <div className="vote__item">
            <button className="voteBtn" onClick={() => handleVoteFunction('downvote')}>
            Downvote
            </button>
            <p>{downVotes}</p>
        </div>
        </div>
    );

}

export default Votes;