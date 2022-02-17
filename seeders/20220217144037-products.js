'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', [{
      name: "Black Tshirt",
      price: 29.97,
      sizes: '{"S":false,"M":true,"L":true,"XL":true,"XXL":true}',
      reference: 984706,
      quantity: 135,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at libero nec risus tincidunt luctus. Nulla tempus eu massa sed efficitur. Proin interdum quis velit blandit vulputate. Duis tempus vehicula augue, eget tincidunt lectus.",
      colors: '{"Black":true,"White":true}',
      care: "Hand wash cold with like colours. Do not wring. Do not use bleach. Do not tumble dry. Do not dry clean. Do not iron. Lay flat to dry.",
      composition: "100% Cotton",
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
     await queryInterface.bulkDelete('Products', null, {});
  }
};
