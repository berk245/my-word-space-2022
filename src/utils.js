const baseUrl = "http://localhost:5000"
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
  let authToken = document.cookie.match('auth_token')
  if(authToken) return true
  else return false
}

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
    },
    body: JSON.stringify(data),
  };
};

const createNotebook = async({userId, newNotebookName}) => {
  let response = await fetch(
    baseUrl + "/notebook/add",
    getRequestBody("POST", {userId: userId, notebookName: newNotebookName})
  );
  return response.ok || false
}

const editNotebookName = async(params) => {
  console.log(params)
  let response = await fetch(
    baseUrl + "/notebook/edit",
    getRequestBody("POST", params)
  );
  return response.ok || false
}


const saveUserData = ({ token, userId, username }) => {
  try {
    console.log("Here");
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
  return (url.pathname.split('/').reverse()[0]);
}

const deleteNotebook = async(params) => {
  let response = await fetch(baseUrl + '/notebook/delete', getRequestBody("DELETE", params))
  return response.ok

}
const createWord = async(newWord) => {
  let response = await fetch(baseUrl + '/word/add', getRequestBody('POST', newWord))
  return response.ok
}

const editWord = async(newWord) => {
  let response = await fetch(baseUrl + '/word/edit', getRequestBody('POST', newWord))
  return response.ok
}

const deleteWord = async(params) => {
  let response = await fetch(baseUrl + '/word/delete', getRequestBody("DELETE", params))
  return response.ok
}

export { loginUser, signupUser, createWord, createNotebook, editNotebookName, parseIdFromURL, deleteNotebook, editWord, deleteWord, isUserAuthenticated };
