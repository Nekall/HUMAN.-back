'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      firstName: "Fake",
      lastName: "User",
      email: "test@test.test",
      password: "password",
      streetAddress: "6 Austin Run Suite",
      zipCode: "85939",
      state: "Lorem",
      city: "Sky city",
      country: "South Sharonmouth",
      phone: "060000000",
      tickets: '{"date":"09/04/2045","price":155,"paymentStatus":"Pending","products":{"item1":{},"item2":{}}}',
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
     await queryInterface.bulkDelete('Users', null, {});
  }
};
