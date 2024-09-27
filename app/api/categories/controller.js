const { Category } = require('../../db/models')

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {

      const categories = await Category.findAll({
        where: { user: req.user.id },
        attributes: ['id', 'name', 'user']
      })
      res.status(200).json({ data: categories, message: "Success get all categories" })

    } catch (err) {
      next(err)
    }
  },

  createCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      const category = await Category.create({
        name,
        user: req.user.id
      })

      res.status(201).json({ message: "Success create category" })
    } catch (err) {
      next(err)
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const { id } = req.params
      const { name } = req.body;

      const checkCategory = await Category.findOne({
        where: {
          id,
          user: req.user.id
        }
      })

      const category = await checkCategory.update({
        name
      })

      res.status(200).json({ message: "Success update category", data: category })
    } catch (err) {
      next(err)
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.destroy({
        where: {
          id,
          user: req.user.id
        }
      })

      res.status(200).json({ message: "Success delete category" })
    } catch (err) {
      next(err)
    }
  }
}