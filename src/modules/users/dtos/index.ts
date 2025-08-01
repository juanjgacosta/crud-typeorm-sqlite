interface ICreateUserDTO {
  id?: string
  name: string
  email: string
  company: string
  password: string
}

interface IUpdateUserDTO {
  id: string
  name: string
  email: string
  company: string
  password?: string
}

interface PublicUserInfoDTO {
  id: string
  name: string
  email: string
  company: string
  created_at: Date
  updated_at: Date
}

export { ICreateUserDTO, IUpdateUserDTO, PublicUserInfoDTO }
