import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import config from '../../config';
import { useQuery } from '@tanstack/react-query';


export const LatestOrders = (props) => {
  const { data: latestPatient = [], isLoading } = useQuery(
    ['getDasboardData3'],
    () => axios.get(`${config.service_host}/class/dashboard-data-3`)
      .then((data) => {
        return data.data?.data
      })
      .catch((error) => {
        console.log(error)
      }),
    { refetchInterval: 5000 }
  );

  const router = useRouter();
  return <Card {...props}>
    <CardHeader title="Lớp học có sinh viên đăng kí nhiều nhất" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Tên môn học
              </TableCell>
              <TableCell>
                NMH
              </TableCell>
              <TableCell >
                Sĩ số hiện tại
              </TableCell>
              <TableCell >
                Sĩ số tối đa
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestPatient.map((patient) => (
              <TableRow
                hover
                key={patient?.id}
              >
                <TableCell>
                  {patient?.id}
                </TableCell>
                <TableCell>
                  {patient?.subject?.name}
                </TableCell>
                <TableCell>
                  {patient?.group}
                </TableCell>
                <TableCell>
                  {patient?.total_student}
                </TableCell>
                <TableCell>
                  {patient?.max_student}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(patient?.status === "OPEN" && 'success')
                      || (patient?.status === "OPEN" && 'error' || 'warning')}
                  >
                    {patient?.status === "OPEN" ? "OPEN" : "CLOSE"}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
        onClick={() => {
          router.push('/classes')
        }}
      >
        View all
      </Button>
    </Box>
  </Card >
}