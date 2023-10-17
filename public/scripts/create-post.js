function submitPost(event) {
  event.preventDefault();

  const separatedURL = window.location.href.split('/');
  const themeId = separatedURL[separatedURL.length - 1];

  fetch(location.protocol + '//' + location.host + '/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      authorId: 1,
      themeId: parseInt(themeId),
      title: document.getElementById('post-title').value,
      text: document.getElementById('post-text').value,
    }),
  }).then(() => {
    window.location.replace(location.protocol + '//' + location.host + '/');
  });
}

function ready() {
  const form = document.querySelector('form');
  form.addEventListener('submit', submitPost);
}

document.addEventListener('DOMContentLoaded', ready);
