const { Transaction, DetailTransaction, Book } = require('../../db/models')
const { Op } = require('sequelize')
const sequelize = require('../../db/models').sequelize

module.exports = {
  checkout: async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
      const { payload } = req.body
      const user = req.user.id;

      const transaction = await Transaction.create({
        invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(),
        user: user
      })

      let errorBookIdNotFound = [],
        errorBookIdStock = [],
        updateStock = [];

      for (let i = 0; i < payload.length; i++) {
        const checkingBook = await Book.findOne({
          where: { id: payload[i].bookId, user: user }
        })

        // add field create detailTransaction
        payload[i].transaction = transaction.id;
        payload[i].book = checkingBook.id;
        payload[i].titleBook = checkingBook.title;
        payload[i].priceBook = checkingBook.price;
        payload[i].imageBook = checkingBook.image;
        payload[i].user = user;

        updateStock.push({
          id: payload[i].bookId,
          stock: checkingBook.stock - payload[i].quantity,
          user: user
        });

        if (payload[i].quantity > checkingBook.stock) {
          errorBookIdStock.push(`${payload[i].quantity} - ${checkingBook.stock}`)
        }

        if (!checkingBook) {
          errorBookIdNotFound.push(payload[i].bookId)
        }
      }

      if (errorBookIdStock.length !== 0) {
        return res.status(400).json({
          message: `Book with id ${errorBookIdStock.join(', ')} not enough in stock and user with id User : ${user} `
        })
      }

      if (errorBookIdNotFound.length !== 0) {
        return res.status(400).json({
          message: `Book with id ${errorBookIdNotFound.join(', ')} not found and user with id User : ${user} `
        })
      }

      await Book.bulkCreate(updateStock, {
        updateOnDuplicate: ['stock'],
        transaction: t
      }, {
        transaction: t
      })

      const detailTransaction = await DetailTransaction.bulkCreate(payload, { transaction: t })

      await t.commit();

      res.status(201).json({ message: 'Success checkout', data: detailTransaction })
    } catch (err) {
      if (t) await t.rollback();
      next(err)
    }
  },
}