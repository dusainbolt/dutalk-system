import { StatusKYC } from '@common/Chip/StatusKyc';
import { TableGrid } from '@common/TableGrid';
import { Button, Divider, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { getKycHistorySlice, searchKycHistoryStart } from '@redux/slices/kycHistorySlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import Date from '@services/date';
import Helper from '@services/helper';
import { TableHelper } from '@services/table';
import { ProfileStatus } from '@type/user';
import { useEffect } from 'react';

export const KycHistory = () => {
  const { paging, loadingData, data } = useAppSelector(getKycHistorySlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchKycHistoryStart({ ...TableHelper.queryDefault }));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 50 },
    {
      field: 'updatedAt',
      headerName: 'Updated at',
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      renderCell: ({ value: updatedAt }) => <div>{Date.toDateHoursStr(updatedAt)}</div>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: ({ value: status }) => <StatusKYC status={status} />,
    },
    {
      field: 'message',
      headerName: 'Message',
      flex: 1,
      maxWidth: 400,
      minWidth: 150,
      renderCell: ({ row, value: message }) => {
        switch (row.status) {
          case ProfileStatus.DEPLOY:
            return (
              <Button variant="contained" size="small" target="_blank" href={Helper.getEtherUrl(message)}>
                View Transaction
              </Button>
            );
          case ProfileStatus.REJECT:
            return message;
          default:
            return '';
        }
      },
    },
  ];

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        KYC History
      </Typography>
      <Divider style={{ marginBottom: 30 }} />
      <div style={{ height: 550, width: '100%' }}>
        <TableGrid paging={paging} columns={columns} loadingData={loadingData} rows={data} />
      </div>
    </div>
  );
};
