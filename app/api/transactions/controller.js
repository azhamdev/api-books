const { Transaction, DetailTransaction, Book } = require('../../db/models')
const { Op } = require('sequelize')
const sequelize = require('../../db/models').sequelize

module.exports = {
  getTranscationList: async (req, res, next) => {
    try {
      const { keyword = '' } = req.query


      let condition = {
        user: req.user.id
      }

      if (keyword !== '' && keyword !== undefined) {
        condition = { ...condition, invoice: { [Op.like]: `%${keyword}%` } }
      }


      const transaction = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,
          as: 'detailTransaction',
        }
      })


      res.status(200).json({ message: "Success get all transaction", data: transaction })
    } catch (err) {
      next(err)
    }
  },
  detailTransactionList: async (req, res, next) => {
    try {
      const { id } = req.params

      const detailTransaction = await Transaction.findOne({
        where: { id },
        include: {
          model: DetailTransaction,
          as: 'detailTransaction',
        }
      })


      res.status(200).json({ message: "Success get all detail transaction", data: detailTransaction })
    } catch (err) {
      next(err)
    }
  }
}