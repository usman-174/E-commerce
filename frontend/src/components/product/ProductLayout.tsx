import { SimpleGrid, Box, useMediaQuery } from "@chakra-ui/react"
import Product from "./Product"

const ProductLayout = ({ products, keyword }) => {
    const [isLargerThan708px] = useMediaQuery("(min-width: 708px)");

    return (
        <SimpleGrid ml={keyword ? "6" : undefined}
            columns={isLargerThan708px && products?.length ? 3 : !products?.length ? 1 : 2}
            spacing={isLargerThan708px ? 4 : !products?.length ? 0 : 8}>



            {products?.length ? products!.map(prod => {
                return <Product id={prod._id} key={prod._id} name={prod.name} price={prod.price} ratings={prod.ratings}
                    numOfReviews={prod!.numOfReviews} images={prod!.images} />

            }) :
                !products?.length &&
                <Box textAlign='center' fontSize='5xl' color='red.200' p='5'> There are no products available
                </Box>}

        </SimpleGrid>
    )
}

export default ProductLayout
