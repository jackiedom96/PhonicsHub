const DB_NAME = 'phonics-hub-editor'
const STORE_NAME = 'pdf-assets'
const DB_VERSION = 1

function isIndexedDbAvailable() {
  return typeof window !== 'undefined' && 'indexedDB' in window
}

function openDatabase() {
  if (!isIndexedDbAvailable()) {
    return Promise.resolve(null)
  }

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const database = request.result

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function listPdfAssets() {
  const database = await openDatabase()

  if (!database) {
    return []
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result ?? [])
    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => database.close()
    transaction.onabort = () => reject(transaction.error)
  })
}

export async function savePdfAsset(id, file) {
  const database = await openDatabase()

  if (!database) {
    return
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    store.put({
      id,
      blob: file,
      fileName: file.name,
      updatedAt: Date.now(),
    })

    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => reject(transaction.error)
    transaction.onabort = () => reject(transaction.error)
  })
}

export async function deletePdfAsset(id) {
  const database = await openDatabase()

  if (!database) {
    return
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    store.delete(id)

    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => reject(transaction.error)
    transaction.onabort = () => reject(transaction.error)
  })
}

export async function clearPdfAssets() {
  const database = await openDatabase()

  if (!database) {
    return
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    store.clear()

    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => reject(transaction.error)
    transaction.onabort = () => reject(transaction.error)
  })
}
