import { loadCurrentPosition } from '~/lib/core/location'
import { SET_LATLONG } from '~/constants/storeTypes'

export default ({ store }) => {
  loadCurrentPosition()
    .then(({ lat, lng }) => {
      const latlong = `${lat},${lng}`
      store.commit(SET_LATLONG, latlong)
    })
}
