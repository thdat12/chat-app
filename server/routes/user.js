const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const auth = require('../middlewares/auth')

const router = express.Router()

const generateToken = (id) => {
  return token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.json({ message: "This email is taken" })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({ ...req.body, password: hashedPassword })
    await newUser.save()
    const token = generateToken(newUser._id)
    res.status(200).json({ success: true, userData: { ...newUser._doc, password: null }, token })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ loginSuccess: false, message: 'Email not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ loginSuccess: false, message: 'Wrong credential, password is incorrect' })
    }
    const token = generateToken(user._id)
    res.json({ loginSuccess: true, userData: { ...user._doc, password: null }, token})
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

router.get('/auth', auth, async (req, res) => {
  const user = await User.findById(req.user.id)
  if(!user) return res.json({message: 'User does not exist'})
  res.json({userData: {...user._doc, password: null }})
})

module.exports = router