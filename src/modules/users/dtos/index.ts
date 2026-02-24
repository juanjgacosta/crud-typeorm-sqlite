interface ICreateUserDTO {
  name: string
  email: string
  company: string
  password: string
  avatar?: string
}

interface IUpdateUserDTO {
  id: string
  name: string
  email: string
  company: string
  password?: string
  avatar?: string
}

interface PublicUserInfoDTO {
  id: string
  name: string
  email: string
  company: string
  created_at: Date
  updated_at: Date
}

interface IUpdateUserAvatarDTO {
  id: string
  avatar: string
}

export { ICreateUserDTO, IUpdateUserDTO, PublicUserInfoDTO, IUpdateUserAvatarDTO }
