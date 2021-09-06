import {
    authorizeRoles
} from './../middlewares/auth';
import {
    Router
} from 'express'
import {
    authMiddleware
} from '../middlewares/auth'
import {
    createOrder,
    adminUpdateOrderStatus,
    getSingleOrder,
    myOrders,adminDeleteOrder,
    adminAllOrders
} from '../controllers/orderController'
const orderController = Router()


orderController.route("/admin").get(authMiddleware, authorizeRoles('admin'), adminAllOrders)

orderController.route("/delivered/:id").put(authMiddleware, authorizeRoles('admin'), adminUpdateOrderStatus)
orderController.route("/delete/:id").delete(authMiddleware, authorizeRoles('admin'), adminDeleteOrder)

orderController.route("/my").get(authMiddleware, myOrders)

orderController.route("/:id").get(authMiddleware, getSingleOrder)

orderController.route("/create").post(authMiddleware, createOrder)


export default orderController