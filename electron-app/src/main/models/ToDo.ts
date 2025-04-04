import mongoose from 'mongoose'

const ToDoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'], // Predefined status values
      default: 'pending'
    },
    dueDate: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

const ToDo = mongoose.model('ToDo', ToDoSchema)
export default ToDo
