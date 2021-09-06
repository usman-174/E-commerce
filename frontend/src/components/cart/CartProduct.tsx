import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Flex, Heading, Image, useMediaQuery, useToast } from '@chakra-ui/react'
import { MdDeleteForever } from 'react-icons/md'
import { cartItem, useCartDispatch } from '../../Context/cart'
const CartProduct = ({ item }: { item: cartItem }) => {
    const [isLargerThan376px] = useMediaQuery("(min-width: 376px)");

    const dispatch = useCartDispatch()
    const toast = useToast()
    const RemoveFromCart = () => {
        dispatch("REMOVE_FROM_CART", item.product)
    }
    const increaseQty = (qty, stock) => {

        const newQty = qty + 1
        if (newQty > stock) {

            toast({
                title: "Stock limit reached",
                description: "You have selected all the products available",
                status: "error",
                duration: 1500,
                isClosable: true,
            })
            return;
        }
        const data: cartItem = {
            ...item,
            quantity: newQty
        }
        dispatch("ADD_TO_CART", data)
    }
    const decreaseQty = (qty) => {
        const newQty = qty - 1
        if (newQty <= 0) return;
        const data: cartItem = {
            ...item,
            quantity: newQty
        }
        dispatch("ADD_TO_CART", data)
    }
    return (

        <Box Box my="5" className="row" shadow="md" borderRadius="md"
            boxShadow="md" borderWidth="2px" >

            <Box className="col-4 col-lg-3" >
                <Image src={item.image} alt={item.name}
                    width={isLargerThan376px ? "155" : "25vw"} height={isLargerThan376px ? "120" : "10vh"} />
            </Box>
            <Box className="col-5 col-lg-3 mt-2">
                <Heading as="h1" textColor="teal"> {item.name}</Heading>

            </Box>
            <Box className="col-4 col-lg-2 mt-4 mt-lg-2">
                <Heading d="inline-block" textColor="tomato" as="h2" > ${item.price}</Heading>

            </Box>
            <Box className="col-4 col-lg-3 mt-4 mt-lg-2 mb-2" >
                <Flex alignItems='center' justifyContent='space-around'>
                    <Button mr="2" color='teal' onClick={() => increaseQty(item.quantity, item.stock)}>
                        <SmallAddIcon /></Button >
                    {item.quantity}
                    <Button ml="2" color='tomato' onClick={() => decreaseQty(item.quantity)}>
                        <MinusIcon /></Button>
                </Flex>

            </Box>
            <Box className="col-4 col-lg-1 mt-4 mt-lg-2" onClick={RemoveFromCart} color="tomato" fontSize="2xl" cursor="pointer">
                <Center>

                    <MdDeleteForever />
                </Center>
            </Box>
        </Box>
    )
}

export default CartProduct
