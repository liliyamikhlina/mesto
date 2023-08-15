export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileAbout = document.querySelector(aboutSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent,
            avatar: this._avatarSelector.src,
        }
    }

    setUserInfo({ name, job, avatar }) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = job;
        if (avatar) {
            this._avatarSelector.src = avatar;
        }
    }

    setUserAvatar(link) {
        if (this._avatarSelector) {
            this._avatarSelector.src = link;
        };
    }
}