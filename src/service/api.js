const API = "http://localhost:5000/api/v1";

export const getProject = () => {
  return fetch(`${API}/card/project-cards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authToken: localStorage.getItem("token"),
    },
  }).then((data) => data.json());
};

export const updateProject = (body) => {
  return fetch(`${API}/project/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authToken: localStorage.getItem("token"),
    },
    body: body,
  }).then((data) => data.json());
};

export const updateCard = (body) => {
  return fetch(`${API}/card/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authToken: localStorage.getItem("token"),
    },
    body: body,
  }).then((data) => data.json());
};

export const createCard = (body) => {
  return fetch(`${API}/card/create`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authToken: localStorage.getItem("token"),
    },
    body: body,
  }).then((data) => data.json());
};

export const signUp = (email, password, name) => {
  return fetch("/auth/signup", {
    method: "POST",
    body: {
      email: email,
      password: password,
      name: name,
    },
  });
};

export const signIn = (email, password) => {
  return fetch("/auth/signin", {
    method: "POST",
    body: {
      email: email,
      password: password,
    },
  });
};
