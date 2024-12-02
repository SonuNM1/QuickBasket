import multer from 'multer'

// set up memory storage to store the file buffer in memory 

const storage = multer.memoryStorage()

// initialize multer with the storage configuration 

const upload = multer({storage: storage})

export default upload 