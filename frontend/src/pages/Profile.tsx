import { Box, Button, Heading, Image, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import UpdatePassword from '../components/auth/UpdatePassword';
import { useAuthState } from '../Context/auth';

const Profile = ({ history }) => {
    const { user } = useAuthState()

    const [isLargerThan450px] = useMediaQuery("(min-width: 450px)");


    return (
        <Box>
            {user && <> <Heading textAlign='center' as='h1' mx="auto" my="10" fontSize="5xl" color="teal">Profile</Heading>
                <SimpleGrid columns={[1, 2, 2]} spacing={isLargerThan450px ? "10%" : "0%"} mb="10">
                    <Box align="center" p="7">
                        <Image my="5" src={user.avatar?.url || "/default_avatar.png"} borderRadius='full' w={isLargerThan450px ? "30vw" : "36vw"} h={isLargerThan450px ? "30vw" : "36vw"} />
                        <Button color="tomato" colorScheme='teal' onClick={() => history.push("/updateProfile")}>Edit Profile</Button>
                    </Box>
                    <Box mx="5" p={isLargerThan450px ? "5" : "2"} align={!isLargerThan450px ? "center" : undefined}>
                        <Box my="5">
                            <Heading as="h1" fontSize="4xl" fontWeight='bold' color="tomato">Name</Heading>
                            <Text as='h2' mt="2" fontSize='2xl'>{user.name}</Text>
                        </Box>
                        <Box my="5">
                            <Heading as="h1" fontSize="4xl" fontWeight='bold' color="tomato">Email</Heading>
                            <Text as='h2' mt="2" fontSize='2xl'>{user.email}</Text>
                        </Box>
                        <Box my="5">
                            <Heading as="h1" fontSize="4xl" fontWeight='bold' color="tomato">Joined ON</Heading>
                            <Text as='h2' mt="2" fontSize='2xl'>{user.createdAt.substr(0, 10)}</Text>
                        </Box>
                        <UpdatePassword />
                        <br />
                        <Button my="2" color="white" colorScheme='messenger' variant='solid'>My Orders</Button>

                    </Box>

                </SimpleGrid></>}
        </Box>
    )
}

export default Profile
