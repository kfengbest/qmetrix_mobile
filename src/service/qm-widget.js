/**
 * Created by lvs on 25/11/2016.
 */

import Global from './qm-global'
import DashboardApi from './qm-dashboard'

function extractWidgets (dbdContent, data) {

    if(Global.isDefined(dbdContent.rows)) {
        dbdContent.rows.forEach(function (row) {
            if(Global.isDefined(row.widgets)) {
                data.widgets = data.widgets.concat(row.widgets);
            }
            if(Global.isDefined(row.columns)) {
                row.columns.forEach(function (col) {
                    if(Global.isDefined(col.widgets)) {
                        data.widgets = data.widgets.concat(col.widgets);
                    }
                    extractWidgets(col, data);
                });
            }
        });
    }
}

export default class WidgetApi {
    static getWidgetsOfDashboard (dashboardId) {
        return new Promise(function (resolve, reject) {
            if(dashboardId) {
                DashboardApi.getById(dashboardId)
                            .then(function (data) {
                                console.log("dashboard content:", data.dashboards[0].content);
                                let wdata = {widgets:[]};
                                extractWidgets(data.dashboards[0].content, wdata);
                                resolve(wdata);
                            })
                            .catch(function (error) {
                                console.log("error fetch dashboard content:", error);
                                reject(error);
                            });

            } else {
                console.log("no dashboard id provided:", dashboardId);
                reject({error:"invalid dashboard"});
            }
        });

    }
}