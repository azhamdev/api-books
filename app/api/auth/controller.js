const { User } = require('../../db/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password)

        if (checkPassword) {
          const token = jwt.sign({
            user: {
              id: checkUser.id,
              name: checkUser.name,
              email: checkUser.email,
            }
          }, 'secret')

          res.status(200).json({ message: "Signin Success", data: token })
        } else {
          res.status(403).json({ message: "Invalid Password" })
        }
      } else {
        res.status(403).json({ message: "Invalid Email" })
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  },

  signUp: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser) {
        return res.status(403).json({ message: "Email is already used" })
      }

      if (password !== confirmPassword) {
        res.status(403).json({ message: "Password doesn't match" })
      }

      const hashPassword = bcrypt.hashSync(password, 10)
      const user = await User.create({
        name,
        email,
        password: hashPassword,
        role: 'admin'
      })


      delete user.dataValues.password;


      res.status(201).json({
        data: user,
        message: "Sign Up Success"
      })


    } catch (err) {
      next(err)
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      const dataUsers = await User.findAll({
        attributes: ['id', 'name', 'email', 'role']
      });
      res.status(200).json({ data: dataUsers })
    } catch (err) {
      next(err)
    }
  }
}
