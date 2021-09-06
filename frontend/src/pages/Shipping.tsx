import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Divider, Flex, Heading } from "@chakra-ui/layout"
import { useMediaQuery } from "@chakra-ui/media-query"
import { Select } from "@chakra-ui/select"
import { useToast } from "@chakra-ui/toast"
import { countries } from 'countries-list'
import { Fragment, useEffect, useState } from "react"
import Step from "../components/layout/Step"
import MetaData from "../components/MetaData"
import { cartItem, ShippingInfo, useCartDispatch } from "../Context/cart"

const Shipping = ({ cart: { shippingInfo }, history }: { cart: { cartItems: cartItem[], shippingInfo: ShippingInfo }, history: any }) => {

    const [isLargerThan830px] = useMediaQuery("(min-width: 830px)");
    const [isLargerThan375px] = useMediaQuery("(min-width: 375px)");
    const countryList = Object.values(countries)
    const toast = useToast()
    const [address, setAddress] = useState(shippingInfo?.address)
    const [city, setCity] = useState(shippingInfo?.city)
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo)
    const [country, setCountry] = useState(shippingInfo?.country)
    const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode)
    const dispatch = useCartDispatch()

    const SubmitRegister = () => {
        if (!address.trim() || address.trim().length < 6) {
            console.log(address.trim());
            console.log("addres Length", address.trim().length);

            toast({
                title: "Form Error",
                description: "Please provide valid address.",
                status: "error",
                duration: 1500,
                isClosable: true,
                position: 'top-right'
            })
            return
        } else if (!city.trim() || city.trim().length < 4) {
            toast({
                title: "Form Error",
                description: "Please enter valid city.",
                status: "error",
                duration: 1500,
                isClosable: true,
                position: 'top-right'
            })
            return
        } else if (!phoneNo.trim() || phoneNo.trim().length < 9) {
            toast({
                title: "Form Error",
                description: "Please enter valid Phone Number.",
                status: "error",
                duration: 1500,
                isClosable: true,
                position: 'top-right'
            })
            return
        } else if (!postalCode || postalCode < 4) {
            toast({
                title: "Form Error",
                description: "Please enter valid Postal Code.",
                status: "error",
                duration: 1500,
                isClosable: true,
                position: 'top-right'
            })
            return
        } else if (!country.trim()) {
            toast({
                title: "Form Error",
                description: "Please select a valid COuntry.",
                status: "error",
                duration: 1500,
                isClosable: true,
                position: 'top-right'
            })
            return
        }
        dispatch("SHIPPING_INFO", { address, city, country, phoneNo, postalCode })
        history.push("/order/confirm")
    }

    return (
        <Fragment>
            <MetaData title="Shipping Info" />
            <Flex flexDirection="column" alignItems='center' justifyContent='center' p="10">
                <Step step={1} />
                <Divider w="30%" />
                <Heading fontSize="xl" textAlign='center' my="5" textColor='teal'>Shipping Info</Heading>

                <FormControl w={isLargerThan830px ? "50%" : isLargerThan375px ? '70%' : '90%'} id="password" mt="4">
                    <FormLabel>Country</FormLabel>
                    <Select type="text" value={country} onChange={(e) => setCountry(e.target.value)} >
                        {countryList.map(Country => <option key={Country.name} value={Country.name}>{Country.name} </option>)}


                    </Select>
                </FormControl>
                <FormControl w={isLargerThan830px ? "50%" : isLargerThan375px ? '70%' : '90%'} id="password" my="4">
                    <FormLabel>City</FormLabel>
                    <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </FormControl>
                <FormControl id="postalCode" w={isLargerThan830px ? "50%" : isLargerThan375px ? '70%' : '90%'}>
                    <FormLabel>Postal Code</FormLabel>
                    <Input type="number" value={postalCode} onChange={(e) => setPostalCode(Number(e.target.value))} />
                </FormControl>
                <FormControl id="address" w={isLargerThan830px ? "50%" : isLargerThan375px ? '70%' : '90%'}>
                    <FormLabel>Address</FormLabel>
                    <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </FormControl>
                <FormControl id="phoneNo" w={isLargerThan830px ? "50%" : isLargerThan375px ? '70%' : '90%'}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                </FormControl>

                <Button onClick={SubmitRegister} my="2" variant='outline' colorScheme='teal' color='tomato'>
                    Submit Info
                </Button>

            </Flex>
        </Fragment>
    )
}

export default Shipping
