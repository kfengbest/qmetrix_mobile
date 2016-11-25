/**
 * Created by lvs on 22/11/2016.
 * the qmetrix dashboard api service
 */

import {AsyncStorage} from 'react-native'

import Global from './qm-global'
import HttpUtil from './qm-httputil'

const _dashboardUrl = Global.baseAPIUrl() + 'v2/dashboard/';
const portfolioQueryMode = {'by_id': 'pfoid', 'by_name': 'pfoname'};
const _dataKey = '@Dashboards';

function getDashboard (dashboardId, forceUpdate) {
    let url = _dashboardUrl;
    if(dashboardId) {
        url += dashboardId;
    }
    return HttpUtil.get(url);
    // return new Promise(function (resolve, reject) {
    //     AsyncStorage.getItem(_dataKey).then((data) => {
    //         if (data !== null && forceUpdate !== true) {
    //             let portfolios_data = JSON.parse(data);
    //             resolve(portfolios_data.dashboards);
    //         } else {
    //             HttpUtil.get(url).then((data) => {
    //                 _saveDashboardsToCache(data);
    //                 resolve(data.dashboards);
    //             }).catch((error) => {
    //                 reject(error);
    //             });
    //         }
    //     }).catch((error) => {
    //         console.log("Error loading dashboards:", error);
    //     });
    // })
}

async function _saveDashboardsToCache(data) {
    try {
        console.log("saving dashboards");
        await
            AsyncStorage.setItem(_dataKey, JSON.stringify(data));
    }
    catch (error) {
        console.log("error in saving dashboards:", error);
    }
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
    static getMine(forceUpdate=false) {
        return getDashboard('', forceUpdate);
    }

    static getById(dashboardId) {
        return getDashboard(dashboardId);
    }

    static getPortfolioDashboards(portfolioId) {
        return getAllDashboard(portfolioId, 'by_id');
    }

}