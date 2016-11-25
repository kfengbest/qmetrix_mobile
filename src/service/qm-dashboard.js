/**
 * Created by lvs on 22/11/2016.
 * the qmetrix dashboard api service
 */

import Global from './qm-global'
import HttpUtil from './qm-httputil'

const _dashboardUrl = Global.baseAPIUrl() + 'v2/dashboard/';
const portfolioQueryMode = {'by_id': 'pfoid', 'by_name': 'pfoname'};

function getDashboard (dashboardId) {
    var url = _dashboardUrl;
    if(dashboardId) {
        url += dashboardId;
    }
    return HttpUtil.get(url);
}

/**
 * get dashboard list of a portfolio by its id or url-name
 * @param portfolioKey, id or url-name
 * @param mode, is portfolioKey id or url-name?
 * @returns {*}
 */
function getAllDashboard (portfolioKey, mode) {
    var params = {};
    params[portfolioQueryMode[mode]] = portfolioKey;
    return HttpUtil.get(_dashboardUrl, params);
}

export default class DashboardApi {
    static getMine() {
        return getDashboard();
    }

    static getById(dashboardId) {
        return getDashboard(dashboardId);
    }

    static getPortfolioDashboards(portfolioId) {
        return getAllDashboard(portfolioId, 'by_id');
    }

}