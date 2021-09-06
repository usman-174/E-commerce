import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from '../Context/auth';

const ResetPassword = ({ history, match }) => {
    const [isLargerThan708px] = useMediaQuery("(min-width: 708px)");
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const toast = useToast()
    const { user } = useAuthState()

    const onSubmit = async () => {
        if (!password || !confirmPassword) {
            toast({
                title: "Password Error",
                description: "Please fill all Fields.",
                status: "error",
                duration: 2100,
                isClosable: true,
                position: 'top-right'
            })
            return
        } else if (password !== confirmPassword) {

            toast({
                title: "Password Error",
                description: "Passwords do not match.",
                status: "error",
                duration: 2100,
                isClosable: true,
                position: 'top-right'
            })
            return
        }
        try {
            setLoading(true)

            const { data } = await axios.put(`users/reset-password/${match.params.token}`, { password, confirmPassword })
            if (data?.success) {
                toast({
                    title: "Success",
                    description: "Passwords updated Successfully",
                    status: "success",
                    duration: 2100,
                    isClosable: true,
                    position: 'top-right'
                })
                setLoading(false)

                history.push("/login")
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
    useEffect(() => {
        if (user) {
            history.push("/")
        }
    }, [user, history])
    return (
        <Box mx="auto" my="10" h="66.4vh" w={isLargerThan708px ? "40vw" : "70vw"}>

            <Flex flexDirection="column" alignItems='center' justifyContent='center' >
                <Heading my="7" as='h1' fontSize='2xl' color="tomato" fontWeight="bold">Forgot Password</Heading>

                <FormControl id="password" p="4">
                    <FormLabel fontWeight="bold" >New Password</FormLabel>
                    <Input type="password" placeholder="Enter Password...." value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <FormControl id="confirmPassword" p="4">
                    <FormLabel fontWeight="bold" >Confirm Password</FormLabel>
                    <Input type="password" placeholder="Enter Confirm Password...." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </FormControl>

                <Button onClick={onSubmit} color={!loading ? "red" : "teal"} my="2" mx="auto" isLoading={loading} colorScheme={loading ? "red" : "teal"}>Update Password</Button>
            </Flex>
        </Box>
    )
}

export default ResetPassword
