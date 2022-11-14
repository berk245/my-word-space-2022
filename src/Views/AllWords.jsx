import React, {useState, useEffect} from 'react'
import useAllUserWords from '../Hooks/useAllUserWords';
import WordsList from '../Components/WordsList';
import {useNavigate} from 'react-router-dom';
import {isUserAuthenticated} from '../utils'
function AllWords() {
  const { userId, username } = JSON.parse(localStorage.getItem("user"));
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    if(!isUserAuthenticated()) navigate('/not-authorized')
  }, [])

  const navigate = useNavigate()

  const {userWords, fetchError, fetchingData} = useAllUserWords(userId, refetch)

  if(fetchingData) return <p>Loading</p>
  return (
    <div>
      <button onClick={()=> navigate('/')}>Go back</button>
      <h2>Words of {username}</h2>
      <WordsList wordList={userWords} userId={userId} reload={()=>setRefetch(!refetch)}/>
    </div>
  )
}

export default AllWords