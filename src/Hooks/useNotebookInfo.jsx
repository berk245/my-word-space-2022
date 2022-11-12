import { useState, useEffect } from "react";

function useNotebookInfo(notebookId, reloadList) {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [notebookInfo, setNotebookInfo] = useState('')
  const [notebookWords, setNotebookWords] = useState('')

  const getNotebookData = async (notebookId) => {
    try {
      const url = `http://localhost:5000/notebook/get-notebook-data/${notebookId}`;
      let response = await fetch(url);
      if (response.ok) {
        response = await response.json();
        setNotebookInfo(response.notebookInfo)
        setNotebookWords(response.notebookWords)
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
    if(!notebookId) return
    resetData()
    getNotebookData(notebookId);
  }, [notebookId, reloadList]);

  return { fetchingData, fetchError, notebookInfo, notebookWords };
}

export default useNotebookInfo;
