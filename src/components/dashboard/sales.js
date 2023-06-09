import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import config from '../../config';
import { useQuery } from '@tanstack/react-query';

export const Sales = (props) => {
  const theme = useTheme();
  const { data: dashboardData = [], isLoading } = useQuery(
    ['getDasboardData'],
    () => axios.get(`${config.service_host}/class/dashboard-data`)
      .then((data) => {
        return data.data?.data
      })
      .catch((error) => {
        console.log(error)
      }),
    { refetchInterval: 5000 }
  );

  const [last7daymac, setLast7daymac] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [last7daykhoe, setLast7daykhoee] = useState([0, 0, 0, 0, 0, 0, 0]);
  const data = useMemo(() => ({
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: last7daymac,
        label: 'Đã đăng kí',
        maxBarThickness: 10
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: last7daykhoe,
        label: 'Còn trống',
        maxBarThickness: 10
      }
    ],
    labels: [moment(Date.now()).add(-6, 'd').format('DD/MM'), moment(Date.now()).add(-5, 'd').format("DD/MM"), moment(Date.now()).add(-4, 'd').format("DD/MM"), moment(Date.now()).add(-3, 'd').format("DD/MM"), moment(Date.now()).add(-2, 'd').format("DD/MM"), moment(Date.now()).add(-1, 'd').format("DD/MM"), moment(Date.now()).format("DD/MM")]
  }), [last7daymac, last7daykhoe])
  useEffect(() => {
    setLast7daykhoee(dashboardData?.map((slot) => slot?.emptySlot))
    setLast7daymac(dashboardData?.map((slot) => slot?.submitSlot))
  }, [dashboardData])

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
          </Button>
        )}
        title="7 ngày gần nhất"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
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
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
