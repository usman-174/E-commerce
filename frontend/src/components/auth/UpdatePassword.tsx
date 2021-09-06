import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useAuthDispatch } from '../../Context/auth'
const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const dispatch = useAuthDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onSubmit = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast({
                title: "Failed",
                description: "PLease provide the details.",
                status: "error",
                duration: 2300,
                isClosable: true,
                position: 'top-right'
            })
            return
        } else if (newPassword !== confirmPassword) {
            toast({
                title: "Failed",
                description: "New and Confirm Passwords donot match",
                status: "error",
                duration: 2300,
                isClosable: true,
                position: 'top-right'
            })
            return
        }
        setLoading(true)
        try {

            const { data } = await axios.put("/users/update-password", { oldPassword, newPassword, confirmPassword })
            if (data.success) {
                toast({
                    title: "Password Changed",
                    description: "You have successfully updated the password",
                    status: "success",
                    duration: 2300,
                    isClosable: true,
                    position: 'top-right'
                })
                dispatch('LOGIN', data.user)
                setLoading(false)
                onClose()
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

    return (<>

        <Button onClick={onOpen} color="teal" my="2">Change Password</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box mx="auto" my="10">

                        <Flex flexDirection="column" alignItems='center' justifyContent='center' >

                            <FormControl id="oldPassword" p="4" >
                                <FormLabel fontWeight="bold" >Old Password</FormLabel>
                                <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                <FormHelperText></FormHelperText>
                            </FormControl>
                            <FormControl id="newPassword" p="4" >
                                <FormLabel fontWeight="bold">New Password</FormLabel>
                                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                <FormHelperText></FormHelperText>
                            </FormControl>
                            <FormControl id="confirmPassword" p="4" >
                                <FormLabel fontWeight="bold">Confirm Password</FormLabel>
                                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <FormHelperText></FormHelperText>
                            </FormControl>

                        </Flex>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onSubmit} color="tomato" my="2" mx="auto" isLoading={loading} colorScheme={loading ? "red" : "teal"}>Submit</Button>

                </ModalFooter>
            </ModalContent>
        </Modal>



    </>
    )
}

export default UpdatePassword
