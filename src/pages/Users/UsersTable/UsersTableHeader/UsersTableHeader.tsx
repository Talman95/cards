import React, { FC } from 'react';

import { TableCell, TableRow } from '@mui/material';

export const UsersTableHeader: FC = () => {
  return (
    <TableRow>
      <TableCell align="left" style={{ width: '100px' }}>
        Avatar
      </TableCell>
      <TableCell align="left" style={{ minWidth: '268px', maxWidth: '268px' }}>
        Name
      </TableCell>
      <TableCell align="left" style={{ width: '100px' }}>
        Public packs
      </TableCell>
      <TableCell align="left" style={{ width: '250px' }}>
        Last Updated
      </TableCell>
      <TableCell align="left" style={{ width: '250px' }}>
        Created
      </TableCell>
      <TableCell align="left" style={{ width: '100px' }}>
        Verified
      </TableCell>
    </TableRow>
  );
};
