import { Box, Flex, Heading, useToast, Input, FormHelperText, FormControl, FormLabel, Button, useMediaQuery } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

const ForgotPassword = () => {
    const [isLargerThan708px] = useMediaQuery("(min-width: 708px)");

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const toast = useToast()

    const onSubmit = async () => {
        if (!email || !email.includes("@")) {
            toast({
                title: "Email Error",
                description: "Please enter a valid Email.",
                status: "error",
                duration: 2300,
                isClosable: true,
                position: 'top-right'
            })
        }
        try {
            setLoading(true)
            const { data } = await axios.post("/users/forgot-password", { email })
            if (data?.success) {
                toast({
                    title: "Email Sent",
                    description: data?.message,
                    status: "success",
                    duration: 2300,
                    isClosable: true,
                    position: 'top-right'
                })
                setLoading(false)

            }
        } catch (error) {
            toast({
                title: "Failed",
                description: error?.response.data.message || "Process failed please try again.",
                status: "error",
                duration: 2300,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
        }

    }
    return (
        <Box mx="auto" my="10" h="66.4vh" w={isLargerThan708px ? "40vw" : "70vw"}>

            <Flex flexDirection="column" alignItems='center' justifyContent='center' >
                <Heading my="7" as='h1' fontSize='2xl' color="tomato" fontWeight="bold">Forgot Password</Heading>

                <FormControl id="email" p="4">
                    <FormLabel fontWeight="bold" >Email</FormLabel>
                    <Input type="email" placeholder="Enter Email...." value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText>A code will be sent to you Email to reset your password</FormHelperText>
                </FormControl>

                <Button onClick={onSubmit} color={!loading ? "red" : "teal"} my="2" mx="auto" isLoading={loading} colorScheme={loading ? "red" : "teal"}>Send Email</Button>
            </Flex>
        </Box>
    )
}

export default ForgotPassword
