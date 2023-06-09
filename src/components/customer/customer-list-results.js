import { useEffect, useMemo, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials, stringToColor } from '../../utils/get-initials';
import axios from 'axios';
import moment from 'moment';
import { DeleteOutline, Edit } from '@mui/icons-material';
import classes from './styles.module.css';
import SimpleDialog from './add-students-dialog';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const CustomerListResults = (props) => {
  const { listStudent, isLoading, pageSize, current } = props;
  const { students, totalRows } = listStudent
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false)


  const handlePageChange = (event, newPage) => {
    router.push({
      query: {
        current: newPage + 1
      }
    });
  };

  const loadingComponent = useMemo(() => <>
    <Skeleton />
    <Skeleton animation="wave" />
    <Skeleton animation={false} />
    <Skeleton height={60} />
    <Skeleton />
    <Skeleton animation="wave" />
    <Skeleton animation={false} />
    <Skeleton height={60} />
  </>, [])
  return (
    isLoading ? loadingComponent :
      <Card >
        <SimpleDialog open={openDialog} setOpenDialog={setOpenDialog} />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                  </TableCell>
                  <TableCell>
                    ID
                  </TableCell>
                  <TableCell>
                    Họ & Tên
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Mật khẩu
                  </TableCell>
                  <TableCell>
                    Số điện thoại
                  </TableCell>
                  <TableCell>
                    Ngày tạo
                  </TableCell>
                  <TableCell>
                    Ngày cập nhật
                  </TableCell>
                  <TableCell>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students?.map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={students.indexOf(customer.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar

                          sx={{ mr: 2, bgcolor: stringToColor(customer?.name) }}
                        >
                          {getInitials(customer?.name)}
                        </Avatar>
                      </Box>
                    </TableCell>
                    <TableCell className={classes.link}>{customer?.id}</TableCell>
                    <TableCell className={classes.link}>{customer?.name}</TableCell>
                    <TableCell>
                      {customer?.email}
                    </TableCell>
                    <TableCell>
                      {customer?.password}
                    </TableCell>
                    <TableCell>
                      {customer?.phone_number}
                    </TableCell>
                    <TableCell>
                      {moment(customer?.created_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {moment(customer?.updated_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {/* <DeleteOutline className={classes.icon} /> */}
                      <Link href={`/student/${customer?.id}`}><Edit className={classes.icon} /></Link>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={totalRows}
          onPageChange={handlePageChange}
          page={current - 1}
          rowsPerPage={pageSize}
        />
      </Card>
  );
};

CustomerListResults.propTypes = {
  listStudent: PropTypes.array.isRequired
};
