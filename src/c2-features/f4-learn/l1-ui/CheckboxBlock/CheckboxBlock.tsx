import React, {FC} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

type CheckboxBlockType = {
    grade: number | null
    handleChange: (grade: number) => void
}

export const CheckboxBlock: FC<CheckboxBlockType> = ({grade, handleChange}) => {
    const gradeList = [
        {value: 1, name: 'Did not know'},
        {value: 2, name: 'Forgot'},
        {value: 3, name: 'A lot of thought'},
        {value: 4, name: 'Confuced'},
        {value: 5, name: 'Knew the answer'},
    ]

    return (
        <FormControl sx={{m: 3}} component={'fieldset'} variant={'standard'} size={'small'}>
            <FormLabel component={'legend'}>Rate yourself:</FormLabel>
            <FormGroup>
                {gradeList.map((gl, i) => (
                    <FormControlLabel
                        key={i}
                        control={
                            <Checkbox checked={grade === gl.value}
                                      onChange={() => handleChange(gl.value)}
                                      name={gl.name}
                                      size={'small'}
                            />
                        }
                        label={gl.name}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}