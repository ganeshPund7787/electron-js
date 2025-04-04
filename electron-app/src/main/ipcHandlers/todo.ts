import { ipcMain, session } from 'electron'
import ToDo from '../models/ToDo'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'jay-shree-ram'

// Middleware: Get user from token
async function getUserFromToken(): Promise<string | null> {
  const cookies = await session.defaultSession.cookies.get({ name: 'authToken' })
  if (cookies.length === 0) return null

  const token = cookies[0].value
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded.userId
  } catch (error) {
    return null
  }
}

// Create To-Do
ipcMain.handle('create-todo', async (_event, todoData) => {
  try {
    const userId = await getUserFromToken()
    if (!userId) throw new Error('Unauthorized')

    const todo = await ToDo.create({ ...todoData, user: userId })
    return { success: true, todo }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})

// Get To-Dos
ipcMain.handle('get-todos', async () => {
  try {
    const userId = await getUserFromToken()
    if (!userId) throw new Error('Unauthorized')

    const todos = await ToDo.find({ user: userId })
    return { success: true, todos }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})

// Update To-Do
ipcMain.handle('update-todo', async (_event, { id, updates }) => {
  try {
    const userId = await getUserFromToken()
    if (!userId) throw new Error('Unauthorized')

    const todo = await ToDo.findOneAndUpdate({ _id: id, user: userId }, updates, { new: true })
    if (!todo) throw new Error('To-Do not found')

    return { success: true, todo }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})

// Delete To-Do
ipcMain.handle('delete-todo', async (_event, id) => {
  try {
    const userId = await getUserFromToken()
    if (!userId) throw new Error('Unauthorized')

    const result = await ToDo.findOneAndDelete({ _id: id, user: userId })
    if (!result) throw new Error('To-Do not found')

    return { success: true, message: 'To-Do deleted' }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})
