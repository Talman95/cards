import React, { FC, useEffect, useRef, useState } from 'react';

import { Slider, Stack, Typography } from '@mui/material';

type PropsType = {
  minFromServer: number;
  maxFromServer: number;
  minFromFilter: number | null;
  maxFromFilter: number | null;
  setMinMaxCount: ({ min, max }: { min: number; max: number }) => void;
  disabled?: boolean;
};

function valuetext(value: number): string {
  return `${value}°C`;
}

export const DoubleSlider: FC<PropsType> = ({
  minFromServer,
  maxFromServer,
  minFromFilter,
  maxFromFilter,
  setMinMaxCount,
  disabled,
}) => {
  const [values, setValues] = useState<number[]>([minFromServer, maxFromServer]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!minFromFilter && !maxFromFilter) {
      setValues([minFromServer, maxFromServer]);
    }
  }, [minFromFilter, maxFromFilter]);

  useEffect(() => {
    if (firstRender.current) {
      if (minFromFilter && maxFromFilter) {
        setValues([minFromFilter, maxFromFilter]);
      } else if (minFromFilter) {
        setValues([minFromFilter, maxFromServer]);
      } else if (maxFromFilter) {
        setValues([minFromServer, maxFromFilter]);
      }

      firstRender.current = false;

      return;
    }

    setValues([minFromServer, maxFromServer]);
  }, [minFromServer, maxFromServer]);

  const handleChange = (
    e: Event,
    newValue: number | number[],
    activeThumb: number,
  ): void => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValues([Math.min(newValue[0], values[1] - 1), values[1]]);
    } else {
      setValues([values[0], Math.max(newValue[1], values[0] + 1)]);
    }
  };

  const onMouseUpHandler = (): void => {
    setMinMaxCount({ min: values[0], max: values[1] });
  };

  return (
    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
      <Typography variant="body2" style={{ minWidth: '16px' }}>
        {values[0]}
      </Typography>
      <Slider
        min={minFromServer}
        max={maxFromServer}
        value={values}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        onChangeCommitted={onMouseUpHandler}
        disabled={disabled}
      />
      <Typography style={{ minWidth: '24px' }} variant="body2">
        {values[1]}
      </Typography>
    </Stack>
  );
};
