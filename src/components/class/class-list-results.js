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
} from '@mui/material';
import moment from 'moment';
import { DeleteOutline, Edit } from '@mui/icons-material';
import classes from './styles.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const ClassListResults = (props) => {
  const { listClass, totalRows, isLoading, pageSize, current } = props;
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
                    NMH
                  </TableCell>
                  <TableCell>
                    Trạng thái
                  </TableCell>
                  <TableCell>
                    Số lượng sinh viên tối đa
                  </TableCell>
                  <TableCell>
                    Số lượng sinh viên hiện tại
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
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listClass?.map((class_detail) => (
                  <TableRow
                    hover
                    key={class_detail.id}
                    selected={listClass.indexOf(class_detail.id) !== -1}
                  >
                    <TableCell>{class_detail?.id}</TableCell>
                    <TableCell>{class_detail?.subject?.name}</TableCell>
                    <TableCell>{class_detail?.group}</TableCell>
                    <TableCell>
                      {class_detail?.status}
                    </TableCell>
                    <TableCell>
                      {class_detail?.max_student}
                    </TableCell>
                    <TableCell>
                      {class_detail?.total_student}
                    </TableCell>
                    <TableCell>
                      {class_detail?.subject?.tinchi_number}
                    </TableCell>
                    <TableCell>
                      {moment(class_detail?.created_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {moment(class_detail?.updated_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell style={{ display: 'flex' }}>
                      <DeleteOutline className={classes.icon} />
                      <Link href={`/class/${class_detail?.id}`}><Edit className={classes.icon} /></Link>
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

ClassListResults.propTypes = {
  listClass: PropTypes.array.isRequired
};
