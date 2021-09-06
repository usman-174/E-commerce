import { Box, Button, Flex, FormControl, FormHelperText, Image, FormLabel, Heading, Input, Text, useMediaQuery, useToast, Divider } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom";
import MetaData from "../components/MetaData";
import { useAuthDispatch, useAuthState } from "../Context/auth";

const Register = ({ history }) => {

    const [isLargerThan830px] = useMediaQuery("(min-width: 830px)");
    const [isLargerThan375px] = useMediaQuery("(min-width: 375px)");
    const { user } = useAuthState()
    if (user) history.push('/')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [previewAvatar, setPreviewAvatar] = useState<string>("/default_avatar.png")
    const [avatar, setAvatar] = useState<string>("")
    const dispatch = useAuthDispatch()
    const toast = useToast()

    const SubmitRegister = async () => {
        // if (!avatar) {
        //     toast({
        //         title: "Profile Error",
        //         description: "Please select a profile avatar",
        //         status: "error",
        //         duration: 1900,
        //         isClosable: true,
        //         position: 'top-right'
        //     })
        //     return
        // }
        try {
            const { data } = await axios.post('/users/register', {
                email, password, name, avatar
            })
            dispatch('LOGIN', data.user)
            history.push('/')

        } catch (error) {
            console.log(error);

            toast({
                title: "Registration Failed",
                description: error.response.data.message,
                status: "error",
                duration: 1500,
                isClosable: true,
                position: 'top-right'
            })


        }

    }
    const imageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPreviewAvatar(reader.result as string)
                    setAvatar(reader.result as string)
                }
            }
            reader.readAsDataURL(e.target.files![0])
        }
    }
    return (
        <Box>
            <MetaData title='SignUp' />
            <Flex flexDirection="column" alignItems='center' justifyContent='center' p="10">
                <Heading textAlign='center' my="5" textColor='teal'>SignUp</Heading>
                <FormControl id="email" w={isLargerThan830px ? "40%" : isLargerThan375px ? '60%' : '90%'}>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl w={isLargerThan830px ? "40%" : isLargerThan375px ? '60%' : '90%'} id="password" my="4">
                    <FormLabel>Name</FormLabel>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl w={isLargerThan830px ? "40%" : isLargerThan375px ? '60%' : '90%'} id="password" mt="4">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <FormLabel mt="10">Choose Avatar</FormLabel>
                    <Flex alignItems='center' >
                        <Image src={previewAvatar} alt={"avatar"} borderRadius='full' boxSize="90px"
                            objectFit="cover" />
                        <Input mx="5" w="40%" type="file" accept='images/*' name="avatar" onChange={imageOnChange} />
                    </Flex>
                    <Divider my="10" />
                </FormControl>





                <Button onClick={SubmitRegister} variant='outline' colorScheme='teal' color='tomato'>
                    Register
                </Button>
                <Text my="2" as='p' color="tomato">Already have an account? <Link to='/login'><Text d='inline-block' color="teal">
                    Login</Text></Link></Text>
            </Flex>
        </Box>
    )
}

export default Register
