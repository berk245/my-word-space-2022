const loginUser = async (userData) => {
  try {
    let response = await fetch(
      "http://localhost:5000/login",
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

const signupUser = async (userData) => {
  let response = await fetch(
    "http://localhost:5000/signup",
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



const saveUserData = ({ token, userId, username }) => {
  try {
    console.log("Here");
    document.cookie = `token=${token}`;

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

export { loginUser, signupUser };
