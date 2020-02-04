"use strict";
const Workfront = require("workfront-api")

module.exports = new Workfront.NodeApi({
    url: "http://intermedia.my.workfront.com",
    version: "10.0"
});