/**
 * Created by macking on 22/11/2016.
 *
 * common useful utilities for HTTP
 */

import Global from './qm-global'
// need the login token from LoginApi
import LoginApi from './qm-login'

function encodeParams (data) {
    return Object.keys(data).map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

/**
 * common http wrapper for qmetrix api calls, return a Promise
 * @param method, the standard http methods
 * @param url, the api url to call
 * @param params, the parameters on the api call (in url)
 * @param data, the body data
 * @param callback, result check on successful call
 * @param isFormData, is using form or json for the data in request body
 * @returns {*}
 */
function httpreq (method, url, params, data, callback, isFormData) {
    let paramsLocal = params || {},
        cfg = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json'
            },
            body: isFormData ? (encodeParams(data)) : JSON.stringify(data),
            url: url
        };
    // include token if it's presented
    let token = LoginApi.token();
    if(token) {
        paramsLocal._xt_ = token;
    }
    cfg.url = url + (url.indexOf("?") < 0 ? "?" : "&") + encodeParams(paramsLocal);

    return new Promise(function (resolve, reject) {
        fetch(cfg.url, cfg)
            .then((response) => response.json())
            .then((data) => {
                if(!Global.isNullOrUndefined(data)) {
                    /*doc:
                     qmetrix native api, the return data format on success:
                     {status: 'ok', data:...} or {status: 'error', error:...}
                     */
                    if(data.status) {
                        if(data.status === 'ok' && data.data !== undefined) {
                            resolve(Global.isFunction(callback) ? callback(data.data) : data.data);
                        } else if(data.status === 'error' && data.error !== undefined) {
                            reject(data.error);
                        }
                    }
                }
                resolve(Global.isFunction(callback) ? callback(data) : data);
            })
            .catch((error) => function (error) {
                console.log("httpreq error:", error);
                reject(error);
            });
    });
}

export default class HttpUtil {

    /**
     * GET JSON data, return a Promise
     * @param url
     * @param params
     * @param data
     * @param callback
     * @returns {*}
     */
    static get (url, params, data, callback) {
        return httpreq('get', url, params, data, callback, true);
    }

    static postJson (url, params, data, callback) {
        return httpreq('post', url, params, data, callback, false);
    }

    static postForm (url, params, data, callback) {
        return httpreq('post', url, params, data, callback, true);
    }
}
