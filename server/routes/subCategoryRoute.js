
import {Router} from 'express'
import auth from '../middleware/auth.js'
import { AddSubCategoryController, getSubCategoryController } from '../controllers/subCategoryController.js'

const subCategoryRouter = Router() 

subCategoryRouter.post('/create', auth, AddSubCategoryController)

subCategoryRouter.post('/get', getSubCategoryController)

export default subCategoryRouter