import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Flex, Grid, Heading, Image, Spacer, Stat, StatNumber, Tag, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Carousel } from 'react-bootstrap';
import { MoonLoader } from "react-spinners";
import MetaData from "../components/MetaData";
import QuantityCalucator from "../components/QuantityCalucator";
import { useCartDispatch } from "../Context/cart";
import useProductById from "../hooks/useGetProductById";
const ProductDetails = ({ match }) => {
    const [productQuantity, setProductQuantity] = useState(1)
    const [isLargerThan453px] = useMediaQuery("(min-width: 453px)");
    const [isLargerThan595px] = useMediaQuery("(min-width: 595px)");
    const toast = useToast()
    const dipatch = useCartDispatch()
    const { success, isValidating, product } = useProductById(`products/${match.params.id}`)
    const AddtoCart = async () => {
        const cartItem = {
            name: product?.name, stock: product?.stock, price: product?.price, image: product?.images[0].url,
            quantity: productQuantity, product: product?._id

        }
        dipatch("ADD_TO_CART", cartItem, toast)

    }
    if (isValidating) {
        return <Center my='30'>
            <MoonLoader color='#FF6347' />
        </Center>
    }

    return (<>
        {success && <> <Center>
            <Text as='h1' p='10' fontSize='5xl' color='teal'>Product</Text>
        </Center>

            <MetaData title={`${product?.name}`} />
            <Flex mb='10' justifyContent='space-around' flexDirection={isLargerThan453px ? 'row' : 'column'}>

                {isLargerThan453px && <Spacer />}


                <Grid align="center" templateColumns="repeat(1, 1fr)" mx='3' maxW={isLargerThan453px ? '50%' : undefined} p='2px'
                    className='img-fluid'>
                    <Carousel pause='hover'>
                        {product?.images.map(img => (
                            <Carousel.Item key={img.public_id + String(Math.floor(Math.random() * 22 + Math.floor(Math.random() *
                                999)))}>
                                <Image src={img.url} alt={product.name} h={isLargerThan595px ? '440px' : isLargerThan453px ? "350px" : "200px"}
                                    w={isLargerThan453px ? '440px' : "100%"} objectFit='cover' border='InfoText'
                                    borderRadius='lg' />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Grid>


                <Spacer />
                {/* Details */}
                <Box mx={!isLargerThan453px ? '2' : undefined} textAlign='left' mt={isLargerThan453px ? '5' : '2'}>
                    <Text textAlign={!isLargerThan453px ? 'center' : undefined} as='h1' color='black' my='2' fontSize='5xl'>
                        {product?.name}
                    </Text>
                    <Text textAlign={!isLargerThan453px ? 'center' : undefined} as='p' color='gray.500' my='2'
                        fontSize='md'>Product Id : <Tag>{match.params.id} </Tag></Text>
                    <Divider />
                    <Box mb="3" textAlign={!isLargerThan453px ? 'center' : undefined} d={isLargerThan453px ? "flex" : "block"}
                        mt={isLargerThan453px ? "4" : "2"} alignItems="center">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <StarIcon boxSize='1.5em' key={i} color={i < Number(product?.ratings) ? "#f7fc20" : "gray.300"} />
                            ))}
                        <Box ml="2" color="gray.700" fontSize={isLargerThan453px ? "md" : "sm"}>
                            {product?.numOfReviews} reviews
                        </Box>


                    </Box>
                    <Divider />
                    <Stat textAlign='center' my="2">
                        <StatNumber fontSize="5xl" fontFamily='fantasy'>${product?.price}</StatNumber>
                    </Stat>
                    <QuantityCalucator product={product} productQuantity={productQuantity} setProductQuantity={setProductQuantity} />
                    <Center>
                        <Button my="2" onClick={AddtoCart} disabled={product?.stock === 0} colorScheme={product?.stock === 0 ? "red" : "teal"}>Add to Cart</Button>
                    </Center>
                    <Divider />
                    <Text textAlign='center' as='h2' fontSize='lg' my="4">Status : <Text d='inline-block' fontSize='xl' fontWeight='bold' color={product!.stock > 0 ? "teal" : 'tomato'}>{product!.stock > 0 ? "In Stock" : "Out of Stock"}</Text></Text>
                    <Divider />
                    <Text textAlign='center' as='h2' fontSize='lg' my="4">Seller : <Text d='inline-block' fontSize='xl' fontWeight='lg' color='green.600' >{product!.seller}</Text></Text>

                </Box>
                <Spacer />
                <Spacer />
            </Flex>
            <hr />

            <Center textAlign='center'>

                <Box m="5" p="6" >
                    <Heading as='h1' size='xl' borderBottom='teal' mb='10'>
                        DESCRIPTION

                    </Heading>
                    <Text d='inline-block' as='p' className='lead'>
                        {product?.description}
                    </Text>
                </Box>
            </Center></>}
    </>)
}

export default ProductDetails