import { useState, useEffect } from "react";

function useNotebooksList(userId, reloadList) {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [userNotebooks, setUserNotebooks] = useState([]);

  const getUserNotebooks = async (userId) => {
    try {
      const url = `http://localhost:5000/notebook/get-all/${userId}`;
      let response = await fetch(url);
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
    resetData()
    getUserNotebooks(userId);
  }, [userId, reloadList]);

  return { fetchingData, fetchError, userNotebooks };
}

export default useNotebooksList;
