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


export const LatestOrders = (props) => {
  const [latestPatient, setLastestPatient] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/patients?page=${0}`)
      .then((data) => {
        setLastestPatient(data.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const router = useRouter();
  return <Card {...props}>
    <CardHeader title="Bệnh nhân gần nhất" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Time
                  </TableSortLabel>
                </Tooltip>
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
                key={patient._id}
              >
                <TableCell>
                  {patient._id}
                </TableCell>
                <TableCell>
                  {"Hanh"}
                </TableCell>
                <TableCell>
                  {moment(patient.createdAt).format('DD/MM/YYYY-hh:mm:ss')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(patient.Outcome === 0 && 'success')
                      || (patient.Outcome === 1 && 'error' || 'warning')}
                  >
                    {patient.Outcome === 0 ? "Khỏe mạnh" : "Mắc bệnh"}
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
          router.push('/patients')
        }}
      >
        View all
      </Button>
    </Box>
  </Card >
}