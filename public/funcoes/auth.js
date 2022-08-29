function isAuthenticated() {
  if (!getToken()) {
    window.location.href = '/signin.html';
  } else {
    return true;
  }
}

function getToken() {
  return localStorage.getItem('@petApp:token');
}

function signin(token) {
  localStorage.setItem('@petApp:token', token);

  window.location.href = '/cadastro.html';
}

function signout() {
  localStorage.removeItem('@petApp:token');

  window.location.href = '/signin.html';
}

export default { isAuthenticated, getToken, signin, signout }; 