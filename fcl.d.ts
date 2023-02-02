declare module '@onflow/fcl' {
    export const config: any
    export const t: any
    export const authz: any
    export const authenticate: any
    export const unauthenticate: any
    export const send: any
    export const mutate: any
    export const transaction: any
    export const payer: any
    export const proposer: any
    export const authorizations: any
    export const args: any
    export const arg: any
    export const limit: any
    export const decode: any
    export const currentUser: any
    export interface User {
        loggedIn: Boolean | null
        addr?: string
    }
}