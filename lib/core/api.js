export const handleApi = promise => promise
  .then(data => ([data, undefined]))
  .catch((error) => {
    if (error.response && error.response.data.error) {
      const errors = error.response.data.error.errors
      return Promise.resolve([undefined, errors])
    }

    return Promise.resolve([undefined, [error.message]])
  })
