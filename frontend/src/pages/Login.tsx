import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Text, Input, useMediaQuery, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import MetaData from "../components/MetaData";
import { useAuthDispatch, useAuthState } from "../Context/auth";

const Login = ({ history }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useAuthDispatch()

    const [isLargerThan830px] = useMediaQuery("(min-width: 830px)");
    const [isLargerThan375px] = useMediaQuery("(min-width: 375px)");
    const toast = useToast()
    const { user } = useAuthState()
    useEffect(() => {
        if (user) {
            history.push("/")
        }
    }, [user, history])


    const SubmitLogin = async () => {
        try {
            const { data } = await axios.post('/users/login', {
                email, password
            })
            history.push("/")
            dispatch('LOGIN', data.user)

        } catch (error) {

            toast({
                title: "Login Failed",
                description: error.response.data.message || "Couldn't LogIn , Please try again later.",
                status: "error",
                duration: 1500,
                isClosable: true,
                position: 'top-right'
            })
        }
    }
    return (
        <Box>
            <MetaData title='Login' />
            <Flex flexDirection="column" alignItems='center' justifyContent='center' p="10">
                <Heading textAlign='center' my="4" textColor='teal'>LOGIN</Heading>
                <FormControl id="email" w={isLargerThan830px ? "40%" : isLargerThan375px ? '60%' : '90%'}>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl w={isLargerThan830px ? "40%" : isLargerThan375px ? '60%' : '90%'} id="password" my="4">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Box mx="10">

                    <Link to='/forgot-password'><Text mb="2" ml="auto" color='teal'>
                        Forgot Password?
                    </Text></Link>
                </Box>

                <Flex>

                    <Button mr="5" onClick={SubmitLogin} variant='outline' colorScheme='tomato' color='teal'>
                        Login
                    </Button>
                    <Link to='/register'><Button variant='outline' colorScheme='teal' color='tomato'>
                        Register
                    </Button></Link>
                </Flex>

            </Flex>
        </Box>
    )
}

export default Login
