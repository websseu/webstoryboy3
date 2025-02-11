import { IUserInput } from '@/lib/types'
import { Document, Model, model, models, Schema } from 'mongoose'

export interface IUser extends Document, IUserInput {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: 'User',
    },
    visitCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const User = (models.User as Model<IUser>) || model<IUser>('User', userSchema)

export default User
