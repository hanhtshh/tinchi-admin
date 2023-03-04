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

export const ClassListResults = (props) => {
  const { listClass, totalRows, isLoading } = props;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                    Tên lớp học
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
                  <TableCell>
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
                    <TableCell>{class_detail?.name}</TableCell>
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
                      {class_detail?.tinchi_number}
                    </TableCell>
                    <TableCell>
                      {moment(class_detail?.created_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {moment(class_detail?.updated_at).format('DD/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <DeleteOutline className={classes.icon} />
                      {/* <Edit className={classes.icon} onClick={() => setOpenDialog(true)} /> */}
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
          page={page}
          rowsPerPage={limit}
        />
      </Card>
  );
};

ClassListResults.propTypes = {
  listClass: PropTypes.array.isRequired
};
