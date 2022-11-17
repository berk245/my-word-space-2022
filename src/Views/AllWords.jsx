import React, { useState, useEffect } from "react";
import useAllUserWords from "../Hooks/useAllUserWords";
import WordsList from "../Components/WordsList";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../utils";
function AllWords() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState('')
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUserId(userInfo.userId)
      setUsername(userInfo.username)
    }
  }, []);

  const { userWords, fetchError, fetchingData } = useAllUserWords(
    userId,
    refetch
  );

  if (fetchingData) return <p>Loading</p>;
  return (
    <div>
      <button onClick={() => navigate("/")}>Go back</button>
      <h2>Words of {username}</h2>
      <WordsList
        wordList={userWords}
        userId={userId}
        reload={() => setRefetch(!refetch)}
      />
    </div>
  );
}

export default AllWords;
