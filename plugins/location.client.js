import { loadCurrentPosition } from '~/lib/core/location'
import { SET_LATLONG } from '~/constants/storeTypes'

export default async ({ store }) => {
  const { lat, lng } = await loadCurrentPosition()
  const latlong = `${lat},${lng}`
  store.commit(SET_LATLONG, latlong)
}
