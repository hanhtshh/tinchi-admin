import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export const TrafficByDevice = (props) => {
  const theme = useTheme();
  const [tile, setTile] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:8080/ti-le')
      .then((data) => {
        setTile(data.data.data.mac / (data.data.data.khoe + data.data.data.mac) * 100)
      })
  }, [])
  const data = useMemo(() => ({
    datasets: [
      {
        data: [100 - tile, tile],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Đã đăng kí', 'Còn trống']
  }), [tile])

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = useMemo(() => [
    {
      title: 'Đã đăng kí',
      value: Math.round(100 - tile),
      icon: LaptopMacIcon,
      color: '#3F51B5'
    },
    {
      title: 'Còn trống',
      value: Math.round(tile),
      icon: TabletIcon,
      color: '#E53935'
    }
  ], [tile])

  return (
    <Card {...props}>
      <CardHeader title="Tỉ lệ sinh viên đăng kí" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
          
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
