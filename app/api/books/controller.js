const { Op, where } = require('sequelize');
const { Book, Category, User } = require('../../db/models');

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = '', category = '' } = req.query

      let condition = {
        user: req.user.id
      }

      if (keyword !== '' && keyword !== undefined) {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } }
      }

      if (category !== '') {
        condition = { ...condition, category: category }
      }

      const books = await Book.findAll({
        where: condition,
        include: [
          {
            model: Category,
            attributes: ['id', 'name']
          },
          {
            model: User,
            attributes: ['id', 'name']
          }
        ]
      })

      res.status(200).json({ data: books, message: "Success get all books" })
    } catch (err) {
      next(err)
    }
  },
  getBookById: async (req, res, next) => {
    try {
      const { id } = req.params
      const book = await Book.findOne({
        where: {
          id,
          user: req.user.id
        },
        include: [
          {
            model: Category,
            attributes: ['id', 'name']
          },
          {
            model: User,
            attributes: ['id', 'name']
          }
        ]
      })
      res.status(200).json({ data: book, message: "Success get book by id" })
    } catch (err) {
      next(err)
    }
  },
  createBook: async (req, res, next) => {
    try {
      let user = req.user.id
      const { title, price, category, author, stock, image, published } = req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user
        }
      })

      if (!checkCategory) {
        return res.status(404).json({ message: "Category not found" })
      }

      const book = await Book.create({
        title,
        price,
        category,
        author,
        stock,
        image,
        published,
        user: user
      })

      res.status(201).json({ data: book, message: "Success create book" })

    } catch (err) {
      next(err)
    }
  },

  updateBook: async (req, res, next) => {
    try {
      const { id } = req.params
      let user = req.user.id

      const { title, price, category, author, stock, image, published } = req.body;

      const checkBook = await Book.findOne({
        where: {
          id,
          user
        }
      })

      if (!checkBook) {
        return res.status(404).json({ message: "Book not found" })
      }

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user
        }
      })

      if (!checkCategory) {
        return res.status(404).json({ message: "Category not found" })
      }

      const book = await checkBook.update({
        title,
        price,
        category,
        author,
        stock,
        image,
        published
      })

      res.status(200).json({ data: book, message: "Success update book" })
    } catch (err) {
      next(err)
    }
  },

  deleteBook: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = req.user.id
      const book = await Book.destroy({
        where: {
          id,
          user
        }
      })
      if (!book) {
        return res.status(404).json({ message: "Book not found" })
      }

      res.status(200).json({ message: "Success delete book" })
    } catch (err) {
      next(err)
    }
  }

}