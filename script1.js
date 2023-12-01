// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
//     Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост, то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
//     Зробити завдання використовуючи проміси, перехопити помилки.

const button = document.querySelector('.form__button');
const content = document.querySelector('.page__content');

const parse = (data) => JSON.parse(data);

function requestData(id) {
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const post = parse(xhr.response);
                    resolve(post);
                } else {
                    reject('Post not found');
                }
            }
        };
        xhr.send();
    });
}

function renderCard(post) {
    const postBlock = document.createElement('div');
    postBlock.classList.add('page__post');
    postBlock.classList.add('post');

    const postTitle = document.createElement('h2');
    postTitle.classList.add('post__title');
    postTitle.textContent = post.title;
    postBlock.appendChild(postTitle);

    const postBody = document.createElement('p');
    postBody.classList.add('post__body');
    postBody.textContent = post.body;
    postBlock.appendChild(postBody);

    const postId = document.createElement('div');
    postId.classList.add('post__id');
    postId.textContent = `Post ID: ${post.id}`;
    postBlock.appendChild(postId);

    content.appendChild(postBlock);
}

button.addEventListener('click', () => {
    const postId = parseInt(document.querySelector('.form__input').value);

    requestData(postId).then(renderCard).catch(console.error);
});

