import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

// User Interface
export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

// User Schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

// Hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this as IUser
  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Create User Model
const User = mongoose.model<IUser>('User', UserSchema)
export default User
