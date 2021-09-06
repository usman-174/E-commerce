import { Box, Center, Divider, Flex, FormControl, FormLabel, Heading, Select, Text, useMediaQuery } from "@chakra-ui/react"
import "bootstrap/dist/css/bootstrap.min.css"
import 'rc-slider/assets/index.css'
import { useState } from "react"
import Pagination from "react-js-pagination"
import { MoonLoader } from 'react-spinners'
import ProductLayout from "../components/product/ProductLayout"
import MetaData from "../components/MetaData"
import useProducts from "../hooks/useGetProducts"
import RangeSlider from '../components/RangeSlider'
import { StarIcon } from "@chakra-ui/icons"
const categories = [
    "all",
    "electronics",
    "food",
    "camera",
    "laptops",
    "mobiles",
    "headphones",
    "accessories",
    "sports",
    "outdoor",
]
const Home = ({ match }) => {
    const [isLargerThan708px] = useMediaQuery("(min-width: 708px)");
    const [isLargerThan800px] = useMediaQuery("(min-width: 800px)");

    const [category, setCategory] = useState("")
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [rating, setRating] = useState<number>(0)

    const [price, setPrice] = useState<number[]>([1, 1000])

    const keyword = match.params.keyword

    let link = `/products?keyword=${keyword ? keyword :
        ''}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

    if (category && category !== "all") {
        link = `/products?keyword=${keyword ? keyword :
            ''}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
    }
    const { success, products, resultsPerPage, count, isValidating, totalProducts, revalidate } = useProducts(link)
    if (category === "all") {
        revalidate()
    }
    const setCurrentPageFun = (pageNUmber: number) => {
        setCurrentPage(pageNUmber)
    }
    if (!success && isValidating) {
        return <Center my='20'>
            <MoonLoader color='#FF6347' />
        </Center>
    }
    return (

        <Flex justifyContent='flex-start' flexDirection='column' mx='10' my='2' mb='10'>

            <MetaData title='HomePage' />
            {!isLargerThan800px && <Center mb={keyword ? "6" : "0"} >
                <Heading as='h1' fontSize='5xl' textColor='teal' fontFamily='mono' my={isLargerThan800px ? '8' : '4'
                }>PRODUCTS</Heading>
            </Center>}


            {/* MAIN PART */}
            <Flex alignItems={isLargerThan800px ? "flex-start" : undefined} justifyContent={isLargerThan800px
                ? 'space-around' : undefined} flexDirection={isLargerThan800px ? 'row' : 'column'}>

                {/* FILtER AREA */}
                <Flex w={isLargerThan800px ? "22vw" : undefined} flexDirection={"column"}
                    my={isLargerThan800px ? '32' : '3'
                    } justifyContent='space-around'>
                    {isLargerThan800px ? <Heading textAlign="center" size='lg' color='teal'>
                        FILTERS
                    </Heading> : null}
                    {/* Price Range Slider START*/}
                    {keyword && <>

                        {isLargerThan800px ? <Divider my="10" /> : null}


                        <RangeSlider price={price} setPrice={setPrice} />
                        <Box textAlign='center' mt="8">
                            Greater than Ratings : {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon onClick={() => setRating(currR => {
                                        if (currR === i + 1) {
                                            return i - 1
                                        }
                                        return i + 1
                                    })}

                                        key={i} color={i < Number(rating) ? "teal.500" : "gray.300"} />
                                ))}
                        </Box>
                        {isLargerThan800px ? <Divider my="10" /> : null}

                    </>}
                    {/* Price Range Slider END */}

                    <FormControl id="category" mt={keyword ? "0" : "8"} >
                        <Flex alignItems='center' justifyContent='center'>

                            <FormLabel fontSize='large'>Category:</FormLabel>
                            <Select placeholder="Select category" w={isLargerThan800px ? "60%" : "30%"}>
                                {categories.map(category => <option onClick={() => setCategory(category)} key={category} value={category}>
                                    {category.toUpperCase()}</option>)
                                }
                            </Select>
                        </Flex>
                    </FormControl>

                </Flex>

                {/* FILtER AREA FINISH */}

                <Box w="100%"
                    my={5} ml={isLargerThan800px ? "20" : "2"}>
                    {isLargerThan800px && <Center mb={keyword ? "10" : "0"} >
                        <Text as='h1' fontSize='4xl' textColor='teal' fontFamily='mono' my={isLargerThan708px ? '8' : '3'
                        }>PRODUCTS</Text>
                    </Center>}
                    {!isLargerThan800px && <Divider mb="2" />}
                    <ProductLayout products={products} keyword={keyword} />
                    {/* PAGINATION START */}
                    {
                        (resultsPerPage! <= totalProducts!) &&
                        (<Box textAlign='center' my="20" >
                            <Center>
                                <Pagination activePage={currentPage} itemsCountPerPage={resultsPerPage}
                                    totalItemsCount={!keyword ? totalProducts! : count!} nextPageText='Next'
                                    prevPageText='Previos' onChange={setCurrentPageFun} lastPageText='Last'
                                    firstPageText='First' itemClass='page-item' linkClass='page-link' />
                            </Center>
                        </Box>)
                    }

                    {/* PAGINATION END */}

                </Box>
            </Flex>

            {/* MAIN PART FINISH*/}

        </Flex >
    )
}

export default Home