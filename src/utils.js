const loginUser = async (userData) => {
  let response = await fetch(
    "http://localhost:5000/login",
    getRequestBody("POST", userData)
  );
  if (response.ok) {
    response = await response.json();
    return response;
  }
  return false;
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

export { loginUser, signupUser };
