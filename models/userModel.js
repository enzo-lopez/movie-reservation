import {User} from '../schemas/userSchema.js'

export class UserModel {
  static async register({username, email, password}) {
    const newUser = new User({username, email, password})
    await newUser.save()
    return newUser
  }

  static async getUserByEmail({email}) {
    return User.findOne({email})
  }
}
