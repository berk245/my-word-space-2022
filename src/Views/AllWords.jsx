import React, {useState, useEffect} from 'react'
import useAllUserWords from '../Hooks/useAllUserWords';
import WordsList from '../Components/WordsList';
function AllWords() {
  const { userId, username } = JSON.parse(localStorage.getItem("user"));
  const [refetch, setRefetch] = useState(false)


  const {userWords, fetchError, fetchingData} = useAllUserWords(userId, refetch)

  if(fetchingData) return <p>Loading</p>
  return (
    <div>
      <h2>Words of {username}</h2>
      <WordsList wordList={userWords} userId={userId} reload={()=>setRefetch(!refetch)}/>
    </div>
  )
}

export default AllWords