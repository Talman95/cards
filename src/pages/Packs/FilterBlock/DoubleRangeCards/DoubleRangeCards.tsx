import React, {FC, memo, useEffect, useState} from 'react';
import {Box, Slider, Stack, Typography} from "@mui/material";
import {useAppSelector} from "../../../../hooks/hooks";
import {useActions} from "../../../../hooks/useActions";

function valuetext(value: number) {
    return `${value}°C`;
}

export const DoubleRangeCards: FC = memo(() => {
    console.log('Double Range')
    const {setMinMaxCount} = useActions()

    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)

    const [values, setValues] = useState<number[]>([min, max])

    useEffect(() => {
        setValues([min, max])
    }, [min, max])

    const handleChange = (
        e: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValues([Math.min(newValue[0], values[1] - 1), values[1]])
        } else {
            setValues([values[0], Math.max(newValue[1], values[0] + 1)])
        }
    }
    const onMouseUpHandler = () => {
        setMinMaxCount({min: values[0], max: values[1]})
    }

    return (
        <Box sx={{height: '62px', width: '300px', display: 'grid'}}>
            <Typography variant={'body2'}>Number of cards</Typography>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                <Typography variant={'body2'} style={{minWidth: '16px'}}>
                    {values[0]}
                </Typography>
                <Slider
                    min={min}
                    max={max}
                    value={values}
                    onChange={handleChange}
                    valueLabelDisplay={'auto'}
                    getAriaValueText={valuetext}
                    disableSwap
                    onChangeCommitted={onMouseUpHandler}
                    disabled={min === max}
                />
                <Typography style={{minWidth: '24px'}} variant={'body2'}>
                    {values[1]}
                </Typography>
            </Stack>
        </Box>
    )
})