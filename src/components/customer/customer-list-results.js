import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import axios from 'axios';

export const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/patients?page=${page}`)
      .then((data) => {
        setSelectedCustomerIds(data.data.data)
        setTotal(data.data.total)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [page])

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                <TableCell>
                  Age
                </TableCell>
                <TableCell>
                  BMI
                </TableCell>
                <TableCell>
                  BloodPressure
                </TableCell>
                <TableCell>
                  DiabetesPedigreeFunction
                </TableCell>
                <TableCell>
                  Glucose
                </TableCell>
                <TableCell>
                  Insulin
                </TableCell>
                <TableCell>
                  Pregnancies
                </TableCell>
                <TableCell>
                  SkinThickness
                </TableCell>
                <TableCell>
                  Outcome
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCustomerIds.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={'none'}
                        sx={{ mr: 2 }}
                      >
                        {getInitials('dsfsd')}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer?.Name || "Hạnh"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer?.Age}
                  </TableCell>
                  <TableCell>
                    {customer?.BMI}
                  </TableCell>
                  <TableCell>
                    {customer?.BloodPressure}
                  </TableCell>
                  <TableCell>
                    {customer?.DiabetesPedigreeFunction}
                  </TableCell>

                  <TableCell>
                    {customer?.Glucose}
                  </TableCell>
                  <TableCell>
                    {customer?.Insulin}
                  </TableCell>
                  <TableCell>
                    {customer?.Pregnancies}
                  </TableCell>
                  <TableCell>
                    {customer?.SkinThickness}
                  </TableCell>
                  <TableCell>
                    {customer?.Outcome}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={total}
        onPageChange={handlePageChange}
        page={page}
        rowsPerPage={limit}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
