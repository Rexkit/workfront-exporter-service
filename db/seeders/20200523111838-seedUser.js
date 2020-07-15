'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SystemUsers', [{
      email: 'nkuzin-c@intermedia.net',
      password: '$2a$08$AKQO4A.l3iIJ4RVIsJKVSuCQToo.g105Qnl3NsL4s7oB6PD2Eu1wi',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SystemUsers', null, {});
  }
};
