import { z } from 'zod'
import {
  UserInputSchema,
  UserNameSchema,
  UserSignInSchema,
  UserSignUpSchema,
} from './validator'

export type MenuItem = {
  name: string
  href: string
}

export type Data = {
  headerMenus: MenuItem[]
  adminMenus: MenuItem[]
}

// 회원가입 및 로그인
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>
export type IUserName = z.infer<typeof UserNameSchema>
