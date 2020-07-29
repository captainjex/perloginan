import { SET_LATLONG } from '~/constants/storeTypes'

export const state = () => ({
  latlong: ''
})

export const mutations = {
  [SET_LATLONG] (state, latlong) {
    state.latlong = latlong
  }
}
