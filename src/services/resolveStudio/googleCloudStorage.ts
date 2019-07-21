// Creates a client

import { Storage } from '@google-cloud/storage'

const gcs = new Storage({
  keyFilename: 'src/assets/storage/mbaas.json',
  projectId: 'mbaas-desarrollo-229516',
})

export { gcs }
