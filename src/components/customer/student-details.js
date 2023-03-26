import { useState } from 'react';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import classes from './styles.module.css';
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
import { useFormik } from 'formik';
import ClassInfo from '../class/class-info';

export const StudentDetailsContainer = (props) => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: 'example@gmail.com',
            name: 'Nguyễn Văn Hạnh',
            phone_number: '',
            password: 'Password123'
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Địa chỉ email không hợp lệ')
                .max(255)
                .required('Email không được để trống'),
            name: Yup
                .string()
                .max(255)
                .required('Họ & tên không được để trống'),
            phone_number: Yup
                .string()
                .max(255)
                .required('Số điện thoại không được để trống'),
            password: Yup
                .string()
                .max(255)
                .required('Mật khẩu không được để trống')
        }),
        onSubmit: (event) => {
            try {
                // const username = formik.getFieldProps("email").value;
                // const password = formik.getFieldProps("password").value;
                // const response = await loginAccount(username, password);
                // localStorage.setItem('token', response.data.data.token)
                // localStorage.setItem('userInfo', JSON.stringify(response.data.data.userInfo))
                // Router.push('/')
                // event.preventDefault();
                setOpenDialog(false)
            }
            catch (error) {
                setErrorMessage(error.response.data.message)
            }
        }
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

                    title="Thông tin sinh viên"
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
                                label="Họ & Tên"
                                className={classes.textField}
                                error={Boolean(formik.touched.name && formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                margin="normal"
                                name="name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                label="Email"
                                className={classes.textField}
                                error={Boolean(formik.touched.email && formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                margin="normal"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                label="Mật khẩu"
                                className={classes.textField}
                                error={Boolean(formik.touched.password && formik.errors.password)}

                                helperText={formik.touched.password && formik.errors.password}
                                margin="normal"
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                label="Số điện thoại"
                                className={classes.textField}
                                error={Boolean(formik.touched.phone_number && formik.errors.phone_number)}
                                helperText={formik.touched.phone_number && formik.errors.phone_number}
                                margin="normal"
                                name="phone_number"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="phone_number"
                                value={formik.values.phone_number}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />

                <CardHeader

                    title="Danh sách lớp học"
                />
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
                            <button className={classes.addClassButton}><AddIcon fontSize={'large'} className={classes.addClassIcon} /></button>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <div className={classes.classInfoBox}><ClassInfo /></div>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <div className={classes.classInfoBox}><ClassInfo /></div>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <div className={classes.classInfoBox}><ClassInfo /></div>
                        </Grid>

                    </Grid>
                </CardContent>


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
