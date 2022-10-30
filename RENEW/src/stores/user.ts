import { makeAutoObservable } from 'mobx'
import { LoggedInUser } from '../types/type'

class UserStore {
  loggedIn = false
  user: LoggedInUser | null = null

  constructor() {
    makeAutoObservable(this)
  }

  login(user: LoggedInUser) {
    console.log(user)
    this.loggedIn = true
    this.user = user
  }
}

export const userStore = new UserStore()
