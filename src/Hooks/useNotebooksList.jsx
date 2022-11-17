import { useState, useEffect } from "react";
import {getUserNotebooksList} from '../utils'
function useNotebooksList(userId, reloadList) {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [userNotebooks, setUserNotebooks] = useState([]);

  const getUserNotebooks = async (userId) => {
    try {

      let response = await getUserNotebooksList(userId)
      if (response.ok) {
        response = await response.json();
        setUserNotebooks(response.notebooks);
      }
    } catch (err) {
      console.log(err);
      setFetchError(true);
    } finally {
      setFetchingData(false);
    }
  };

  const resetData = () => {
    setFetchError(false)
    setFetchingData(true)
  }
  useEffect(() => {
    if(!userId) return
    resetData()
    getUserNotebooks(userId);
  }, [userId, reloadList]);

  return { fetchingData, fetchError, userNotebooks };
}

export default useNotebooksList;
