'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Carts', [{
      userId: 2,
      caddy: '{"item1":{"reference":735679477,"size":"M","color":"Black"},"item2":{"reference":84979839,"size":"M","color":"Black"}}',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Carts', null, {});
  }
};
