import { useState, useEffect } from "react";

function useWordData(wordId) {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [wordData, setWordData] = useState([]);

  const getWordData = async (wordId) => {
    try {
      const url = `http://localhost:5000/word/${wordId}`;
      let response = await fetch(url);
      if (response.ok) {
        response = await response.json();
        setWordData(response);
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
    getWordData(wordId);
  }, [wordId]);

  return { fetchingData, fetchError, wordData };
}

export default useWordData;
