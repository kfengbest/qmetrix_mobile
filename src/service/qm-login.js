/**
 * Created by lvs on 22/11/2016.
 * the login apis, states
 */

import Global from './qm-global'
import HttpUtil from './qm-httputil'

var _loginState = {
    isLogin: false, // change this to true to skip the login
    token: '',
    userDisplayName: '',
    userAccount: '',
    userMail: ''
};
var _loginUrl = Global.baseUrl() + 'rest-userValidation/';
export default class LoginApi {
    static login (username, password) {
        console.log("login now", username);
        return new Promise(function (resolve, reject) {
            HttpUtil.postForm(_loginUrl, null, {username: username, psw: password})
                    .then((data) => {
                        console.log("login:", data);
                        _loginState.isLogin = data.status;
                        _loginState.userDisplayName = data.fullName;
                        _loginState.token = data.token;
                        _loginState.userAccount = username;
                        _loginState.userMail = data.mail;
                        //TODO: persist the login state

                        resolve(_loginState);
                    })
                    .catch((error) => {
                        console.log("loginerror:", error);
                        reject(error);
                    });
        });
    }

    static userName () {
        return _loginState.userDisplayName;
    }

    static token() {
        if(_loginState.isLogin) {
            return _loginState.token;
        }
        return null;
    }

    static logout () {
        _loginState = {
            isLogin: false,
            token: '',
            userDisplayName: '',
            userAccount: '',
            userMail: ''
        };
        //TODO: persist the login state

    }

    static isLoggedIn() {
        return _loginState.isLogin;
    }

}

function initLogin () {
    //TODO: here maybe good to load stored login data
    console.log("loading the persisted login states.");

}

// load the login states from local storage
initLogin();