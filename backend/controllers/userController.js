const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// GET /api/users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})

//  POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body

  if (!name || !email || !password || (typeof isAdmin !== 'boolean')) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user.isAdmin) {
        const admins = await User.find({isAdmin: true});
        console.log("admins:"+admins.length);
        if (admins.length<2) {
            res.status(400)
            throw new Error('Can not delete only admin.')
        }
    }
    await user.deleteOne();
    res.status(200).json({message: "User deleted"});
})

// GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    deleteUser,
    getMe
}