const instance = require('../config/workfront');

const wfLogin = async () => {
    try {
        const apiKey = await instance.getApiKey(process.env.WF_USERNAME, process.env.WF_PASS);
        instance.setApiKey(apiKey);
    } catch (e) {
        throw new Error(`Workfront error: ${e.message}`);
    }
};

const sysSignup = async () => {

};

module.exports = {
    wfLogin,
    sysSignup
};