'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', [
      {
        name: "Sefl Improvement",
        user: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Business and Economics",
        user: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Politics",
        user: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', null, {});
  }
};
