// ищем элементы в разметке и добавляем их в переменные
const articlesList = document.querySelector('.articles');

const firstSection = document.querySelector('.first-section');
const firstInput = document.querySelector ('.input-one');
const secondInput = document.querySelector ('.input-two');
const output = document.querySelector ('.output');


// Задание 1

// создаем кнопку
const button = document.createElement('button');
button.classList.add('button');
 button.textContent = 'Cоздать пост'
// добавляем кнопку на страницу
firstSection.append(button);

// создаем разметку для размещения постов
const newPost = document.createElement("p");
    newPost.classList.add("new-post");
    newPost.textContent = secondInput.value;

// создаем переменную для номера пользователя
let userId = 1;


// добавляем обработчик события нажатия кнопки
button.addEventListener("click", () => {
  const postHeader = document.createElement("h3");
  postHeader.classList.add("post-header");
  postHeader.textContent = firstInput.value;
  
  const newPost = document.createElement("p");
  newPost.classList.add("new-post");
  newPost.textContent = secondInput.value;

  if (firstInput.value.trim() === "") { // с помощью условия ограничиваем выведение пустой строки при нажатии на кнопку,
    return;                             // если пользователь не ввел задачу или нажал на пробел
}

if (secondInput.value.trim() === "") { // с помощью условия ограничиваем выведение пустой строки при нажатии на кнопку,
  return;                              // если пользователь не ввел задачу или нажал на пробел
}

// добавляем новые посты и их заголовки в разметку
  output.append(postHeader, newPost);
  firstInput.value = '';
  secondInput.value = '';


// отправляем данные на сервер с помощью HTTP-сообщения с методом POST
  fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: firstInput.value,
    body: secondInput.value,
    userId: userId++,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
});


// Используем fetch-запрос для получения данных от API
fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        json.forEach((elem) => { // перебираем все данные из полученного массива
          console.log(`Заголовок: ${elem.title}`);
          console.log(`Cтатья: ${elem.body}`);
          const div = document.createElement('div'); // создаем контейнер
          div.classList.add('article-name');
          // добавляем в контейнер элементы из массива и текст
          div.innerHTML = `
          <h2>Заголовок: ${elem.title}</h2> 
          `;
          const article = document.createElement('p');
          article.classList.add('article');
          article.innerHTML = `Статья: ${elem.body}`;
          articlesList.append(div);
          articlesList.append(article);
        })
      })
      // в случае обнаружения ошибки выводим сообщение для пользователя о возникшей ошибке
      .catch((err)=> {
        console.log('Произошла ошибка' + err);
        articlesList.innerHTML = 'Произошла ошибка. Попробуйте загрузить страницу снова позже.'
      });