import { Box, useMediaQuery } from "@chakra-ui/react"
import { createSliderWithTooltip, Range } from "rc-slider"

const RangePriceSlider = createSliderWithTooltip(Range)

const RangeSlider = ({ price, setPrice }) => {
    const [isLargerThan800px] = useMediaQuery("(min-width: 800px)");

    return (<Box textAlign='center' mx="auto" w={isLargerThan800px ? "100%" : '60%'} >

        <RangePriceSlider marks={{
            1: '$1',
            1000: '$1000'

        }} style={{ marginRight: "20px" }} min={1} max={1000} defaultValue={[1, 1000]}
            tipFormatter={value => `$${value}`}
            tipProps={
                { placement: 'top', visible: true }
            }
            value={price}
            onChange={price => setPrice(price)}
        />
    </Box>
    )
}

export default RangeSlider
