const baseUrl = "http://localhost:5000";
const loginUser = async (userData) => {
  try {
    let response = await fetch(
      baseUrl + "/login",
      getRequestBody("POST", userData)
    );
    if (response.ok) {
      response = await response.json();
      saveUserData(response);
      return true;
    }
  } catch {
    return false;
  }
};

const isUserAuthenticated = () => {
  let authToken = document.cookie.match("auth_token");
  if (authToken) return true;
  else return false;
};

const signupUser = async (userData) => {
  let response = await fetch(
    baseUrl + "/signup",
    getRequestBody("POST", userData)
  );
  return response.ok;
};

const getRequestBody = (requestType, data) => {
  return {
    method: requestType,
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
    body: JSON.stringify(data),
  };
};

const createNotebook = async ({ userId, newNotebookName }) => {
  let response = await fetch(
    baseUrl + "/notebook/add",
    getRequestBody("POST", { userId: userId, notebookName: newNotebookName })
  );
  return response.ok || false;
};

const editNotebookName = async (params) => {
  let response = await fetch(
    baseUrl + "/notebook/edit",
    getRequestBody("POST", params)
  );
  return response.ok || false;
};

const getNotebookData = async (notebookId) => {
  const url = `http://localhost:5000/notebook/get-notebook-data/${notebookId}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
  });
  return response;
};

const getUserNotebooksList = async (userId) => {
  const url = `http://localhost:5000/notebook/get-all/${userId}`;

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
  });
  return response;
};

const saveUserData = ({ token, userId, username }) => {
  try {
    document.cookie = `auth_token=${token}`;

    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: userId,
        username: username,
      })
    );
    return;
  } catch (err) {
    console.log(err);
    return;
  }
};

const parseIdFromURL = (url) => {
  return url.pathname.split("/").reverse()[0];
};

const deleteNotebook = async (params) => {
  let response = await fetch(
    baseUrl + "/notebook/delete",
    getRequestBody("DELETE", params)
  );
  return response.ok;
};
const createWord = async (newWord) => {
  let response = await fetch(
    baseUrl + "/word/add",
    getRequestBody("POST", newWord)
  );
  return response.ok;
};

const editWord = async (newWord) => {
  let response = await fetch(
    baseUrl + "/word/edit",
    getRequestBody("POST", newWord)
  );
  return response.ok;
};

const deleteWord = async (params) => {
  let response = await fetch(
    baseUrl + "/word/delete",
    getRequestBody("DELETE", params)
  );

  return response.ok;
};

const parseAuthCookie = (cookieName) => {
  let cookies = document.cookie.split(";");
  let result;
  cookies.map((cookie) => {
    let split = cookie.split("=");
    if (split[0] === cookieName) result = split[1];
  });
  return result;
};

const getWordData = async (wordId) => {
  const url = `http://localhost:5000/word/${wordId}`;

  let wordData = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
  });
  return wordData;
};

const getUserWords = async (userId) => {
  let response = await fetch(baseUrl + `/word/get-all/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: parseAuthCookie("auth_token"),
    },
  });

  if (response.ok) {
    response = await response.json();
    return response.words;
  } else {
    return false;
  }
};

const formatNotebooksArray = (userNotebooks) => {
  let result = [];
  userNotebooks.map((nb) => {
    result.push({
      label: nb.NotebookName,
      key: nb.NotebookID,
      value: nb.NotebookID,
    });
  });

  return result;
};

const getExerciseQuestions = async (userId, exerciseParameters) => {
  const postObj = {
    userId: userId,
    exerciseParameters: exerciseParameters,
  };
  const response = await fetch(
    baseUrl + "/exercise/begin",
    getRequestBody("POST", postObj)
  );

  const exerciseQuestions = await response.json();
  return exerciseQuestions;
};

const completeExercise = async (params) => {
  const response = await fetch(
    baseUrl + "/exercise/complete",
    getRequestBody("POST", params)
  );

  const exerciseResults = await response.json();
  return exerciseResults;
};

export {
  loginUser,
  signupUser,
  formatNotebooksArray,
  createWord,
  getWordData,
  getUserNotebooksList,
  createNotebook,
  getNotebookData,
  editNotebookName,
  parseIdFromURL,
  deleteNotebook,
  editWord,
  deleteWord,
  getUserWords,
  getExerciseQuestions,
  completeExercise,
  isUserAuthenticated,
};
