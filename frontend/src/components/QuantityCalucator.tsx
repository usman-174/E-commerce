import { MinusIcon, SmallAddIcon, } from "@chakra-ui/icons"
import { Flex, useToast, Button } from "@chakra-ui/react"

const QuantityCalucator = ({ product, setProductQuantity, productQuantity, }) => {
    const toast = useToast()
    return (
        <Flex alignItems='center' justifyContent='space-around'>
            <Button mr="2" color='teal' onClick={() => setProductQuantity(x => {
                if (x === product?.stock) {
                    toast({
                        title: "Stock limit reached",
                        description: "You have selected all the products available",
                        status: "error",
                        duration: 1500,
                        isClosable: true,
                    })
                    return x
                } else if (x > 0) {
                    return x + 1
                }
                else {
                    return 1
                }
            })}>
                <SmallAddIcon /></Button >
            {productQuantity}
            <Button ml="2" color='tomato' onClick={() =>
                setProductQuantity(x => x > 1 ? x
                    - 1 : 1)}>
                <MinusIcon /></Button>
        </Flex>
    )
}

export default QuantityCalucator
