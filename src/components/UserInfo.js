 class UserInfo {
    constructor(nameSelector, aboutSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileAbout = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._profileName.textContent;
        userInfo.about = this._profileAbout.textContent;
        return userInfo;
    }

    setUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = about;
    }
}