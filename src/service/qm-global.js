/**
 * Created by lvs on 22/11/2016.
 * the global namespace holding all globally shared stuff
 */

// const qmBaseUrl = "https://qmetrix.autodesk.com/";
// const qmAPIBaseUrl = "https://qmetrix.autodesk.com/api/";
const qmBaseUrl = "http://localhost:8000/";
const qmAPIBaseUrl = "http://localhost:8000/api/";


export default class Global {
    static baseUrl() { return qmBaseUrl;}
    static baseAPIUrl() { return qmAPIBaseUrl;}
    static isNullOrUndefined (obj) {
        return obj === undefined || obj === null;
    }

    static isDefined(obj) {
        return ! this.isNullOrUndefined(obj);
    }
    static isFunction(obj) {
        return typeof obj == 'function';
    }

}


