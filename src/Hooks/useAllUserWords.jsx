import React, { useEffect, useState } from "react";
import { getUserWords } from "../utils";

function useAllUserWords(userId, refetch) {
  const [userWords, setUserWords] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [fetchingData, setFetchingData] = useState(true);

  const getWords = async () => {
    try {
      let words = await getUserWords(userId);
      if (!words) throw new Error();

      setUserWords(words);
    } catch (err) {
      setFetchError(true);
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    getWords();
  }, [userId, refetch]);

  return { userWords, fetchError, fetchingData };
}

export default useAllUserWords;
