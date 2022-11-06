import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

export const AccountProfileDetails = (props) => {
  const router = useRouter()
  const [values, setValues] = useState({
    Age: 0,
    BMI: 0,
    BloodPressure: 0,
    DiabetesPedigreeFunction: 0,
    Glucose: 0,
    Insulin: 0,
    Pregnancies: 0,
    SkinThickness: 0,

  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/patient', values)
      .then((data) => {
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      {...props}
    >
      <Card>
        <CardHeader

          title="Thêm thông tin bệnh nhân"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Age"
                name="Age"
                onChange={handleChange}
                required
                value={values.Age}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="BMI"
                name="BMI"
                onChange={handleChange}
                required
                value={values.BMI}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="BloodPressure"
                name="BloodPressure"
                onChange={handleChange}
                type="number"
                value={values.BloodPressure}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="DiabetesPedigreeFunction"
                name="DiabetesPedigreeFunction"
                onChange={handleChange}
                required
                value={values.DiabetesPedigreeFunction}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Glucose"
                name="Glucose"
                onChange={handleChange}
                required
                value={values.Glucose}
                variant="outlined"
              >
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Insulin"
                name="Insulin"
                onChange={handleChange}
                required
                value={values.Insulin}
                variant="outlined"
              >
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Pregnancies"
                name="Pregnancies"
                onChange={handleChange}
                required
                value={values.Pregnancies}
                variant="outlined"
              >
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="SkinThickness"
                name="SkinThickness"
                onChange={handleChange}
                required
                value={values.SkinThickness}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>
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
            variant="contained"
            type='submit'
          >
            Thêm
          </Button>
        </Box>
      </Card>
    </form>
  );
};
