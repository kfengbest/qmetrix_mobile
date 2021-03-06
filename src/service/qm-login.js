/**
 * Created by lvs on 22/11/2016.
 * the login apis, states
 */

import React from 'react'
import {AsyncStorage} from 'react-native'
import Global from './qm-global'
import HttpUtil from './qm-httputil'

const _dataKey = '@ActiveUserInfo';
var _initialized = false;
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
                        saveLoginState();
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

    static userMail () {
        return _loginState.userMail;
    }

    static token () {
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
        saveLoginState();

        return new Promise(function (resolve, reject) {
            //TODO: call the logout rest api
            resolve(true);
        });
    }

    /**
     * return a promise
     */
    static isLoggedIn () {
        if(_initialized) {
            return new Promise(function (resolve, reject) {
                resolve(_loginState.isLogin);
            });
        } else {
            return new Promise(function (resolve, reject) {
                initLogin().then(() => {
                    resolve(_loginState.isLogin);
                });
            });
        }
    }
}

async function saveLoginState () {
    try {
        console.log("saving user state");
        await
            AsyncStorage.setItem(_dataKey, JSON.stringify(_loginState));
    }
    catch(error) {
        console.log("error in saving user state:", error);
    }

}

function initLogin () {
    console.log("loading the persisted login states.");
    return new Promise(function (resolve, reject) {
        AsyncStorage.getItem(_dataKey).then((userData) => {
            if(userData !== null) {
                _loginState = JSON.parse(userData);
                console.log("load userinfo ok:", userData);
            }
            _initialized = true;
            resolve(_initialized);

        }).catch((error) => {
            console.log("Error loading user data:", error);
            _initialized = true;
            resolve(_initialized);
        });

    });
}
