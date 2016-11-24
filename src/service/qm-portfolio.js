/**
 * Created by lvs on 22/11/2016.
 * the qmetrix portfolio api service
 */

import Global from './qm-global'
import HttpUtil from './qm-httputil'

var _pfoUrl = Global.baseAPIUrl() + 'v2/portfolio/';
function getPortfolio (portfolioId) {
    var url = _pfoUrl;
    if(portfolioId) {
        url += portfolioId;
    }
    return HttpUtil.get(url);
}

export default class PortfolioAPI {
    static getAll () {
        return getPortfolio();
    }

    static getById (portfolioId) {
        return getPortfolio(portfolioId);
    }

    static getByName (portfolioName) {
        return HttpUtil.get(_pfoUrl, {url_name: portfolioName});
    }
}