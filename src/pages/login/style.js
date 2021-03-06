module.exports = require('react-native').StyleSheet.create({
    "container": {
        "flex": 1,
        "justifyContent": "center",
        "alignItems": "center"
    },
    "backgroundImage": {"flex": 1, "width": null, "height": null},
    "logo": {"position": "absolute", "top": 120, "left": 40, "width": 120, "height": 40},
    "content": {
        "backgroundColor": "rgba(255,255,255,.6)",
        "paddingTop": 20,
        "paddingBottom": 20,
        "paddingLeft": 10,
        "paddingRight": 10,
        "minWidth": 300,
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderColor": "#eee"
    },
    "welcome": {
        "justifyContent": "center",
        "alignItems": "center",
        "marginBottom": 20,
        "borderBottomWidth": 4,
        "borderBottomColor": "#3d88c4"
    },
    "title": {"fontSize": 20, "fontWeight": "bold", "color": "#333", "paddingBottom": 10},
    "instructions": {"textAlign": "center", "color": "#333333", "marginBottom": 5},
    "input": {
        "fontSize": 14,
        "padding": 10,
        "height": 40,
        "marginBottom": 10,
        "lineHeight": 1.428571429,
        "color": "#555",
        "backgroundColor": "#fff",
        "borderRadius": 0,
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderColor": "#ccc"
    },
    "btn": {
        "backgroundColor": "#428bca",
        "paddingTop": 2,
        "paddingBottom": 2,
        "paddingLeft": 16,
        "paddingRight": 16,
        "borderRadius": 0,
        "justifyContent": "space-around",
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderColor": "#357ebd"
    },
    "error": {"backgroundColor": "#f2dede", "borderColor": "#ebccd1", "padding": 15, "marginBottom": 10},
    "errorinfo": {"color": "#a94442"}
});