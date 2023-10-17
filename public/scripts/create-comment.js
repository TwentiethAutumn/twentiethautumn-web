function submitComment(event) {
  event.preventDefault();
  if (!document.getElementById('comment-text').value.trim()) return;

  const separatedURL = window.location.href.split('/');
  const postId = separatedURL[separatedURL.length - 1];

  fetch(location.protocol + '//' + location.host + '/comments', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      authorId: 1,
      postId: parseInt(postId),
      text: document.getElementById('comment-text').value,
    }),
  }).then(renderComments);
}

async function renderComments() {
  const separatedURL = window.location.href.split('/');
  const postId = separatedURL[separatedURL.length - 1];
  const commentsBlock = document.getElementById('comments-block');
  let content = '';

  const response = await fetch(
    location.protocol + '//' + location.host + '/comments/post/' + postId,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    },
  );

  const data = await response.json();
  if (response.ok) {
    data.forEach((comment) => {
      content +=
        '<div class="comment-block">' +
        '<div class="comment-block__author">' +
        comment.author.name +
        '</div>' +
        '<div class="comment-block__text">' +
        comment.text +
        '</div>' +
        '</div>';
    });

    commentsBlock.innerHTML = content;
  }
}

function ready() {
  const form = document.querySelector('form');
  form.addEventListener('submit', submitComment);
  renderComments();
}

document.addEventListener('DOMContentLoaded', ready);
