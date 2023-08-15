export default class API {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  // Проверяем, все ли в порядке с ответом
  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Загружаем информацию о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      });
  }

  // Загружаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      });
  }

  // Редактируем профиль
  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
      .then(this._checkResponseStatus);
  }

  // Добавляем новую карточку
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      });
  }

  //Удаляем добавленную нами карточку
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  // Cтавим лайк карточке
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponseStatus);
  }

  // Снимаем лайк с карточки
  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponseStatus);
  }

  //Обновляем аватар пользователя
  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(this._checkResponseStatus);
  }
}