function ready() {
  const loginValue = sessionStorage.getItem('login');
  const headerSignIn = document.getElementById('header-sign-in');
  if (loginValue != null) {
    headerSignIn.innerHTML =
      '<div class="header__sign-in__login">' + loginValue + '</div>';
  } else {
    headerSignIn.innerHTML = '<a href="/sign-in">Войти</a>';
  }

  if (document.location.href.includes('/index')) {
    document
      .getElementById('index-nav')
      .classList.add('navigation__elem-selected');
  }
  if (document.location.href.includes('/about')) {
    document
      .getElementById('about-nav')
      .classList.add('navigation__elem-selected');
  }
}

document.addEventListener('DOMContentLoaded', ready);
