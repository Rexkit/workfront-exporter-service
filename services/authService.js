const instance = require('../config/workfront');
let sessionID;

const login = async () => {
    instance.setApiKey('4pr8sh2mdap9sm87k65djakzky82ydxj');
    // if (typeof sessionID === 'undefined') {
    //     console.log('no si');
    //     sessionID = await instance.login(process.env.WF_USERNAME, process.env.WF_PASS);
    // } else {
    //     console.log('si');
    // }
};

module.exports = {
    login
};