import { Flex, Heading } from '@chakra-ui/layout'

const Step = ({ step }) => {
    return (
        <Flex alignItems="center" justifyContent="center">

            <Heading textColor="tomato" as="h2"> STEP {step}</Heading>

        </Flex>
    )
}

export default Step
