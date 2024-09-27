'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Books', [
      {
        title: "Atomic Habits",
        author: "James Clear",
        image: '/uploads/image 1.png',
        published: new Date(),
        price: 100000,
        stock: 13,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen R. Covey",
        image: '/uploads/image 2.png',
        published: new Date(),
        price: 100000,
        stock: 13,
        user: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Bussiness is the key',
        author: 'John Doe',
        image: '/uploads/image 3.png',
        published: new Date(),
        price: 100000,
        stock: 13,
        user: 1,
        category: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Books', null, {});

  }
};
