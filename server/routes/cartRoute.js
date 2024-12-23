
import {Router} from 'express'
import auth from '../middleware/auth.js'
import { addToCartItemController,
    getCartItemController, 
    updateCartItemQty,
    deleteCartItemQtyController
 } from '../controllers/cartController.js'

const cartRouter = Router()

cartRouter.post('/create', auth, addToCartItemController)

cartRouter.get('/get',  getCartItemController)

cartRouter.put('/update-qty', auth, updateCartItemQty)

cartRouter.delete('/delete-cart-item', auth, deleteCartItemQtyController)

export default cartRouter 