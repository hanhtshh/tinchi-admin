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

export const SubjectListResults = (props) => {
  const { listSubject, totalRows, isLoading, pageSize, current } = props;
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
                    Tên môn học
                  </TableCell>
                  <TableCell>
                    Số tín chỉ
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
                {listSubject?.map((subject_detail) => (
                  <TableRow
                    hover
                    key={subject_detail.id}
                    selected={listSubject.indexOf(subject_detail.id) !== -1}
                  >
                    <TableCell>{subject_detail?.id}</TableCell>
                    <TableCell>{subject_detail?.name}</TableCell>

                    <TableCell>
                      {subject_detail?.tinchi_number}
                    </TableCell>
                    <TableCell>
                      {moment(subject_detail?.created_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {moment(subject_detail?.updated_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {/* <DeleteOutline className={classes.icon} /> */}
                      <Link href={`/subject/${subject_detail.id}`}><Edit className={classes.icon} /></Link>
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

SubjectListResults.propTypes = {
  listSubject: PropTypes.array.isRequired
};
