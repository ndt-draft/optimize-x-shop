import data from './data'
import optimizely from '@optimizely/optimizely-sdk'

export default {
  projectJson: 'https://cdn.optimizely.com/json/11116229115.json',
  optimizelyInstance: undefined,
  datafile: undefined,
  getOptimizelyInstance() {
    return new Promise((resolve, reject) => {
      if (!this.datafile) {
        this.fetchDatafile()
          .then(response => response.json())
          .then(datafile => {
            this.datafile = datafile
            this.optimizelyInstance = optimizely.createInstance({
              datafile: datafile
            })
            resolve(this.optimizelyInstance)
          })
      } else {
        resolve(this.optimizelyInstance)
      }
    })
  },
  fetchDatafile() {
    return window.fetch(this.projectJson, { mode: 'cors' })
  },
  // Write your api functions here
  fetchProducts(sortBy) {
    return data.getItems(sortBy)
  },
  fetchProduct(productId) {
    return data.getItem(productId)
  }
}
