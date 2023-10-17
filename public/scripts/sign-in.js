function signIn(event) {
  event.preventDefault();
  const loginInput = document.querySelector('#sign-in-login');
  const value = loginInput.value;
  sessionStorage.setItem('login', value);
  document.location = '/';
}

function ready() {
  const form = document.querySelector('form');
  form.addEventListener('submit', signIn);
}

document.addEventListener('DOMContentLoaded', ready);
