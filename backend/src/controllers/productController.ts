import {
    ApiFeatures
} from '../utils/apiFeatures';
import {
    NextFunction,
    Request,
    Response
} from "express";
import Product from "../models/product/Product";
import {
    errorHandler
} from '../utils/errorHandler'
import CatchError from '../middlewares/catchAsyncError'
// GET PRODUCT ------------------------------
export const getProducts = CatchError(async (req: Request, res: Response) => {
    const resultsPerPage = 6
    const totalProducts = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product, req.query).search().filter().pagination(resultsPerPage)
    const products = await apiFeature.query
    res.status(200).json({
        success: true,
        products,
        count: products.length,
        totalProducts,
        resultsPerPage
    })

})
// ADMIN CREATE PRODUCT------------------------
export const createProduct = CatchError(async (req: Request, res: Response) => {
    req.body.user = res.locals.user._id
    req.body.seller = res.locals.user.name
    const products = await Product.create(req.body)
    res.status(201).json({
        success: true,
        products
    })

})
// GET PRODUCT BY ID =========================
export const getProductById = CatchError(async (req: Request, res: Response, next: NextFunction) => {

    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new errorHandler("Product not found", 404))
    }
    return res.status(201).json({
        success: true,
        product
    })

})
// ADMIN UPDATE PRODUCT -------------------------
export const updateProduct = CatchError(async (req: Request, res: Response, next: NextFunction) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new errorHandler("Product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
        runValidators: true,
        new: true
    })

    return res.status(201).json({
        success: true,
        product
    })


})
// ADMIN DELETE PRODUCT -----------------
export const deleteProduct = CatchError(async (req: Request, res: Response) => {

    await Product.findByIdAndDelete(req.params.id)
    return res.json({
        success: true
    })

})
// USER CREATE A PRODUCT REVIEW ==========================
export const postProductReview = CatchError(async (req: Request, res: Response, next: NextFunction) => {
    const {
        rating,
        comment,
        productId
    } = req.body
    const review = {
        rating: Number(rating),
        comment,
        user: res.locals.user._id,
        name: res.locals.user.name
    }
    if (rating > 5) {
        next(new errorHandler("Rating cannot be above than 5 points.", 400))
    }
    const product = await Product.findById(productId)
    if (!product) return next(new errorHandler("Product not found", 400))
    const isReviewed = product.reviews.find(review => review.user.toString() === res.locals.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === res.locals.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
    }
    product.numOfReviews = product.reviews.length
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    await product.save({
        validateModifiedOnly: true
    })
    res.status(200).json({
        success: true
    })

})
// GET ALL PRODUCT REVIEWS ==========================
export const getAllReviews = CatchError(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.id)
    if (!product) return next(new errorHandler("Product not found", 400))

    res.status(200).json({
        success: true,
        reviews: product!.reviews
    })
})
// DELETE PRODUCT REVIEW
export const deleteProductReview = CatchError(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.query.productId)
    if (!product) return next(new errorHandler("Product not found", 400))
    product.reviews = product.reviews.filter(review => {
        review!._id!.toString() !== req.query!.id
    })


    product.numOfReviews = product.reviews.length
    product.ratings = Number(product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length)



    await product.save({ validateModifiedOnly: true })
    res.status(200).json({
        success: true
    })
})