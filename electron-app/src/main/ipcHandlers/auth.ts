import User from '../models/user'
import jwt from 'jsonwebtoken'
import { ipcMain, session } from 'electron'

ipcMain.handle('register-user', async (_event, { name, email, password }) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Create new user
    const newUser = new User({ name, email, password })
    await newUser.save()

    return { success: true, message: 'User registered successfully' }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})

const JWT_SECRET = process.env.JWT_SECRET || 'jay-shree-ram'

ipcMain.handle('login-user', async (_event, { email, password }) => {
  try {
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')

    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new Error('Invalid credentials')

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '2h'
    })

    // ✅ Set the cookie inside Electron Main Process
    await session.defaultSession.cookies.set({
      url: 'http://localhost', // Ensure this matches your app's origin
      name: 'authToken',
      value: token,
      httpOnly: true, // Secure cookie
      secure: false, // Set to true if using HTTPS
      sameSite: 'lax',
      expirationDate: Math.floor(Date.now() / 1000) + 7200 // 2 hours expiry
    })

    return { success: true, token }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})

ipcMain.handle('get-auth-token', async () => {
  const cookies = await session.defaultSession.cookies.get({ name: 'authToken' })
  if (cookies.length === 0) return null

  const token = cookies[0].value
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }

    // Fetch user from MongoDB
    const user = await User.findById(decoded.userId).select('-password -__v') // Exclude password
    console.log('user', user)
    if (!user) return null

    return { token, user }
  } catch (error) {
    return null
  }
})

ipcMain.handle('logout-user', async () => {
  try {
    await session.defaultSession.cookies.remove('http://localhost', 'authToken')
    return { success: true, message: 'Logged out successfully' }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})
