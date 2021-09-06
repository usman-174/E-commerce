import { StarIcon } from "@chakra-ui/icons"
import { Badge, Box, Button, Center, Image, useMediaQuery, } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import './product.css'
const Product = ({ id,
    name, numOfReviews, ratings, price, images, }) => {

    const [isLargerThan769px] = useMediaQuery("(min-width: 769px)");
    const [isLargerThan453px] = useMediaQuery("(min-width: 453px)");
    return (
        <Box maxW="sm" mx="2" borderWidth="1px" borderRadius="lg">
            <Image src={(images)[0].url} alt={((images)[0]).public_id} objectFit="fill" h={isLargerThan769px ? "30vh" :
                isLargerThan453px ? "20vh" : "16vh"} w='100%' />

            <Box p={isLargerThan769px ? "5" : "3"}>


                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        Price
                    </Badge>
                    <Box color="gray.700" fontWeight="semibold" letterSpacing="wide" fontSize={isLargerThan453px ? "md" : "sm"}
                        textTransform="uppercase" ml="2">
                        ${price}
                    </Box>
                </Box>

                <Box className='name' mt={isLargerThan453px ? "2" : 1} fontWeight="bold" as="h3" lineHeight="tight" isTruncated>
                    {name}
                </Box>

                <Box d={isLargerThan453px ? "flex" : "block"} mt={isLargerThan453px ? "2" : "1"} alignItems="center">
                    {Array(5)
                        .fill("")
                        .map((_, i) => (
                            <StarIcon key={i} color={i < Number(ratings) ? "teal.500" : "gray.300"} />
                        ))}
                    <Box ml="2" color="gray.600" fontSize={isLargerThan453px ? "sm" : "x-small"}>
                        {numOfReviews} reviews
                    </Box>
                </Box>
                {isLargerThan453px ? <br /> : null}

                <Center mt={!isLargerThan453px ? '1' : 0}>
                    <Link to={`product/${id}`} className='Link'>  <Button colorScheme="teal" color='tomato' variant="outline" size={isLargerThan453px ? 'md' : 'xs'}>
                        View Details
                    </Button></Link>
                </Center>
            </Box>
        </Box>
    )
}

export default Product