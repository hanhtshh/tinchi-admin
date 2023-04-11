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

export const ClassDetailsContainer = (props) => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            subject_id: 0,
            group: 0,
            max_student: 0
        },
        validationSchema: Yup.object({
            subject_id: Yup
                .number()
                .required('ID môn học không được để trống'),
            group: Yup
                .number()
                .required('Nhóm môn học không được để trống'),
            max_student: Yup
                .number()
                .required('Số lượng học sinh tối đa không được để trống'),
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

                    title="Thông tin lớp học"
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
                                label="ID môn học"
                                className={classes.textField}
                                error={Boolean(formik.touched.subject_id && formik.errors.subject_id)}
                                helperText={formik.touched.subject_id && formik.errors.subject_id}
                                margin="normal"
                                name="subject_id"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.subject_id}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                label="Nhóm môn học"
                                className={classes.textField}
                                error={Boolean(formik.touched.group && formik.errors.group)}
                                helperText={formik.touched.group && formik.errors.group}
                                margin="normal"
                                name="group"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.group}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                label="Số lượng học sinh tối đa"
                                className={classes.textField}
                                error={Boolean(formik.touched.max_student && formik.errors.max_student)}

                                helperText={formik.touched.max_student && formik.errors.max_student}
                                margin="normal"
                                name="max_student"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.max_student}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />

                <CardHeader

                    title="Danh sách phiên học"
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
