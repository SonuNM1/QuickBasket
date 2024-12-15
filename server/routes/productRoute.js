
import {Router} from 'express'
import auth from '../middleware/auth.js'
import { createProductController, getProductController } from '../controllers/productController.js'

const productRouter = Router()

productRouter.post('/create', auth, createProductController)

productRouter.post('/get', getProductController)

export default productRouter