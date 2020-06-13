const db = require("../../../models");
const Files = db.Files;
const fs = require('fs');
const Base = require('./Base');

Base.init("Files");

module.exports = {
    ...Base
}