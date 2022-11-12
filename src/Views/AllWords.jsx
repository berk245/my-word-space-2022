import React, {useState, useEffect} from 'react'
import useAllUserWords from '../Hooks/useAllUserWords';
import WordsList from '../Components/WordsList';
import useNotebooksList from '../Hooks/useNotebooksList';
function AllWords() {
  const { userId, username } = JSON.parse(localStorage.getItem("user"));
  const [refetch, setRefetch] = useState(false)


  const {userWords, fetchError, fetchingData} = useAllUserWords(userId, refetch)
  const {userNotebooks} = useNotebooksList(userId)
  return (
    <div>
      <h2>Words of {username}</h2>
      <WordsList userNotebooks={userNotebooks} wordList={userWords} userId={userId} reload={()=>setRefetch(!refetch)}/>
    </div>
  )
}

export default AllWords