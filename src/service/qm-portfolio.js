/**
 * Created by lvs on 22/11/2016.
 * the qmetrix portfolio api service
 */

import Global from './qm-global'
import HttpUtil from './qm-httputil'
import {AsyncStorage} from 'react-native'

const _dataKey = '@Portfolios';
const _pfoUrl = Global.baseAPIUrl() + 'v2/portfolio/';
function getPortfolio(portfolioId, forceUpdate) {
    let url = _pfoUrl;
    if (portfolioId) {
        url += portfolioId;
    }
    return new Promise(function (resolve, reject) {
        AsyncStorage.getItem(_dataKey).then((data) => {
            if (data !== null && forceUpdate !== true) {
                let portfolios_data = JSON.parse(data);
                resolve(portfolios_data.portfolios);
            } else {
                HttpUtil.get(url).then((data) => {
                    _savePortfoliosToCache(data);
                    resolve(data.portfolios);
                }).catch((error) => {
                    reject(error);
                });
            }
        }).catch((error) => {
            console.log("Error loading portfolios:", error);
        });
    })
}

async function _savePortfoliosToCache(data) {
    try {
        console.log("saving portfolios");
        await
            AsyncStorage.setItem(_dataKey, JSON.stringify(data));
    }
    catch (error) {
        console.log("error in saving portfolios:", error);
    }
}

export default class PortfolioAPI {
    static getAll(forceUpdate = false) {
        return getPortfolio('', forceUpdate);
    }

    static getById(portfolioId) {
        return getPortfolio(portfolioId, true);
    }

    static getByName(portfolioName) {
        return HttpUtil.get(_pfoUrl, {url_name: portfolioName});
    }
}