import { Avatar, Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useAuthDispatch } from '../Context/auth'
import User, { AxiosResponse } from '../types/UserI'
const UpdateProfile = ({ user }: { user: User }) => {
    const [email, setEmail] = useState(user.email)
    const [loading, setLoading] = useState(false)
    const dispatch = useAuthDispatch()
    const [name, setName] = useState(user.name)
    const toast = useToast()

    const [avatar, setAvatar] = useState<string | undefined>(undefined)
    const [avatarPreview, setavatarPreview] = useState(user.avatar!.url)

    const onSubmit = async () => {

        avatar && toast({
            title: "Updating...",
            description: "Please wait while we update your profile.",
            status: "info",
            duration: 2000,
            isClosable: true,
            position: 'top-right'
        })

        try {
            setLoading(true)
            const { data } = await axios.put<AxiosResponse>("/users/update-profile", { email, name, avatar })
            if (data?.success) {
                dispatch('LOGIN', data?.user)
                toast({
                    title: "Updated Profile",
                    description: "You updated the profile successfully.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right'
                })
            }
            setLoading(false)

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
    const onChange = (e) => {

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setavatarPreview(reader.result as string)
                setAvatar(reader.result as string)
            }

        }
        reader.readAsDataURL(e.target.files[0])

    }


    return (<>
        <Box mx="auto" my="10" borderWidth="1px" borderRadius="lg" w="42vw">

            <Flex flexDirection="column" alignItems='center' justifyContent='center' >
                <Heading my="7" as='h1' fontSize='4xl' color="tomato" fontWeight="bold">Update Profile</Heading>

                <FormControl id="email" p="4" >
                    <FormLabel fontWeight="bold" >Email address</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl id="name" p="4" >
                    <FormLabel fontWeight="bold">Name</FormLabel>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl id="avatar" p="4" >
                    <FormLabel fontWeight="bold">Avatar</FormLabel>
                    <Flex alignItems="center">
                        <Avatar name={user.name} src={avatarPreview} size="lg" />
                        <Input d="inline-block" type="file" mx="2" w="50%" px="2" accept="images/*" onChange={onChange} />
                    </Flex>
                </FormControl>
                <Button onClick={onSubmit} color="tomato" my="2" mx="auto" isLoading={loading} colorScheme={loading ? "red" : "teal"}>Update Profile</Button>
            </Flex>
        </Box>

    </>
    )
}

export default UpdateProfile
