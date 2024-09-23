export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  password: string
}

export interface StoreState {
  posts: Post[]
  users: User[]
}
