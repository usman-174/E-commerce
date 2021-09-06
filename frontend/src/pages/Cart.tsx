import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import CartProduct from "../components/cart/CartProduct"
import { cartItem } from "../Context/cart"

const Cart = ({ cart: { cartItems } }: { cart: { cartItems: cartItem[] } }) => {


    return (<>

        {cartItems.length && <div className="container-fluid">
            <div className="row">
                <Box className="col-sm-12 col-md-8" p="2">
                    <Box m="5">
                        <Heading as="main" my="5">Cart Items : {cartItems.length}</Heading>
                        <div className="row" >
                            {cartItems?.map(item =>
                                <CartProduct item={item} key={item.price} />
                            )}
                        </div>
                    </Box>
                </Box>
                <Box className="col-sm-12 col-md-3 col-md-offset-2 align-middle" p="2" >
                    <Box shadow="md" className="my-lg-5" borderRadius="md" my="auto"
                        boxShadow="md" borderWidth="1px" p="3">

                        <Heading my="2" fontSize="xl" textAlign="center">ORDER SUMMARRY </Heading>
                        <hr />
                        <Box>
                            <Flex alignItems="center" justifyContent="space-around">
                                <Text as="p" fontSize="lg" fontWeight="bold">
                                    Subtotal:
                                </Text>
                                <Text fontWeight="md">
                                    {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} units
                                </Text>

                            </Flex>
                            <Flex alignItems="center" justifyContent="space-around">
                                <Text fontSize="lg" fontWeight="bold">
                                    Est. Total:
                                </Text>
                                <Text fontWeight="md">
                                    $ {cartItems.reduce((acc, item) => acc + Number(item.quantity! * item.price!), 0).toFixed(2)}
                                </Text>

                            </Flex>
                        </Box>
                        <hr />
                        <Center>
                            <Link to="/shipping">
                                <Button color="tomato" colorScheme="teal" my="2"> CHECKOUT </Button>
                            </Link>
                        </Center>
                    </Box>
                </Box>

            </div>
        </div>}</>
    )
}

export default Cart
