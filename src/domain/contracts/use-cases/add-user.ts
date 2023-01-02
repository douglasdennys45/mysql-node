export interface AddUser {
  perform: (body: AddUser.Request) => Promise<AddUser.Response>
}

export namespace AddUser {
  export type Request = any
  export type Response = any
}
