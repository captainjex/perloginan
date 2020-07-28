import { SET_LATLONG, SET_USER } from '~/constants/storeTypes'

export const state = () => ({
  latlong: '',
  user: null
})

export const mutations = {
  [SET_LATLONG] (state, latlong) {
    state.latlong = latlong
  },
  [SET_USER] (state, user) {
    state.user = user
  }
}
