const instance = require('../config/workfront');

const wfLogin = async () => {
    const apiKey = await instance.getApiKey(process.env.WF_USERNAME, process.env.WF_PASS);
    instance.setApiKey(apiKey);
};

const sysSignup = async () => {

};

module.exports = {
    wfLogin,
    sysSignup
};