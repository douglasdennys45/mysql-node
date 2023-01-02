export interface AddUserRepo {
  add: (body: AddUserRepo.Request) => Promise<AddUserRepo.Response>
}

export namespace AddUserRepo {
  export type Request = any
  export type Response = string
}
