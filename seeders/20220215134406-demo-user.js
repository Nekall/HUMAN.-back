'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      firstName: "Prénom",
      lastName: "Nom",
      email: "oizrhgozecgrz@guzrhgzih.com",
      password: "password",
      streetAddress: "6 Allée du Capitaine Faustée",
      zipCode: "66000",
      state: "Faux de France",
      city: "Faux-Sur-Mer",
      country: "France",
      phone: "060000000",
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
