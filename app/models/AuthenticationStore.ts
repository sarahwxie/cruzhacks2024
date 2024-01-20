import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    // There are two props in the authetnciation store
    // authToken (optional) and authEmail
    authToken: types.maybe(types.string),
    authEmail: "",
  })
  .views((store) => ({
    // these are the computed properties
    get isAuthenticated() {
      // is the user authenticated?
      return !!store.authToken
    },
    get validationError() {
      // is the email address given valid?
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions((store) => ({
    // define the actions that can be performed on the state
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    // logout clears the authentication state
    logout() {
      store.authToken = undefined
      store.authEmail = ""
    },
  }))

// define TypeScript interfaces for store instance & snapshot
export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
