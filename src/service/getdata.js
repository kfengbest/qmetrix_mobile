/**
 * Created by macking on 22/11/2016.
 */

function encodeData(data) {
    return Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

exports.httpreq = function httpreq(api, params) {
    let request_url = 'https://qmetrix.autodesk.com/' + api +'/?'+ encodeData(params);
    return fetch(request_url).then((response) => response.json()).catch(err => console.error(err));
};