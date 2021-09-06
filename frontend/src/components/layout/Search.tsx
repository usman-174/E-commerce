import { SearchIcon } from "@chakra-ui/icons"
import { Flex, Input, useMediaQuery, Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"


const Search = ({ location, match }) => {
    const history = useHistory()
    const [isLargerThan450px] = useMediaQuery("(min-width: 450px)");
    const [isLargerThan580px] = useMediaQuery("(min-width: 580px)");
    const [keyword, setKeyword] = useState(match.params.keyword || "")
    const SearchProducts = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {

            history.push('/')
        }
    }

    useEffect(() => {
        if (!location.pathname.includes(keyword)) {
            setKeyword("")
        }
        // eslint-disable-next-line
    }, [location.pathname])

    return (
        <Flex align='center' justifyContent='center' mw={isLargerThan580px ? '60%' : isLargerThan450px ? "80%" : '60%'}
            my={isLargerThan450px ? '1' : '2'}>
            <Form onSubmit={SearchProducts}>
                <Flex align='center'>

                    <Input type='text' w={isLargerThan450px ? '40vw' : '70vw'} bg='white' value={keyword} placeholder='Search' onChange={(e) =>
                        setKeyword(e.target.value)}
                        borderRightRadius='none'
                        textColor='black'
                    />
                    <Button type='submit' colorScheme='teal' borderLeftRadius='none'>
                        <SearchIcon className='SearchIcon' w={isLargerThan450px ? '2vw' : '3vw'} h={isLargerThan450px ? '2vh' : '3vh'} color='black' cursor='pointer' />
                    </Button>
                </Flex>
            </Form>


        </Flex>
    )
}

export default Search
