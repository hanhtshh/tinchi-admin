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
import Link from 'next/link';
import { useRouter } from 'next/router';

export const SessionListResults = (props) => {
  const { listSession, totalRows, isLoading, pageSize, current } = props;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const router = useRouter();


  const handlePageChange = (event, newPage) => {
    router.push({
      query: {
        current: newPage + 1
      }
    })
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
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    ID
                  </TableCell>
                  <TableCell>
                    Ngày học
                  </TableCell>
                  <TableCell>
                    Thời gian bắt đầu (giờ)
                  </TableCell>
                  <TableCell>
                    Tổng thời gian học (giờ)
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
                {listSession?.map((session) => (
                  <TableRow
                    hover
                    key={session.id}
                  >
                    <TableCell>{session?.id}</TableCell>
                    <TableCell>{moment(session?.date).format('DD/MM/yyyy')}</TableCell>
                    <TableCell>
                      {session?.start_time}
                    </TableCell>
                    <TableCell>
                      {session?.total_time}
                    </TableCell>
                    <TableCell>
                      {moment(session?.created_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {moment(session?.updated_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <DeleteOutline className={classes.icon} />
                      <Link href={`/session/${session?.id}`}><Edit className={classes.icon} /></Link>
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

SessionListResults.propTypes = {
  listSession: PropTypes.array.isRequired
};
