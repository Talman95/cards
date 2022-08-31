import React, {FC} from 'react';
import {Box, Slider, Stack, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {setMinMaxCount} from "../../p2-bll/packsReducer";

function valuetext(value: number) {
    return `${value}°C`;
}

export const DoubleRangeCards: FC = () => {
    const dispatch = useAppDispatch()
    const {min, max} = useAppSelector(state => state.packs)
    const [values, setValues] = React.useState<number[]>([min, max])

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
        dispatch(setMinMaxCount({min: values[0], max: values[1]}))
    }

    return (
        <Box sx={{width: 250}}>
            <Typography variant={'body2'}>Number of cards</Typography>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                <Typography variant={'body2'} style={{minWidth: '16px'}}>{values[0]}</Typography>
                <Slider
                    getAriaLabel={() => 'Cards range'}
                    value={values}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    onMouseUp={() => onMouseUpHandler()}
                />
                <Typography style={{minWidth: '24px'}} variant={'body2'}>{values[1]}</Typography>
            </Stack>
        </Box>
    );
}