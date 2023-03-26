import { useState } from 'react';
import * as Yup from 'yup';
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
import Router from 'next/router';
import { useFormik } from 'formik';
import { addSessionService } from '../../services/sessions';

export const SessionDetailsContainer = (props) => {
    const { add_new_flag = false, sessionDetail } = props
    const formik = useFormik({
        initialValues: {
            date: add_new_flag ? '' : sessionDetail?.date,
            start_time: add_new_flag ? 0 : sessionDetail?.start_time,
            total_time: add_new_flag ? 0 : sessionDetail?.total_time
        },
        validationSchema: Yup.object({
            date: Yup
                .date()
                .required('Ngày học không được để trống'),
            start_time: Yup
                .number()
                .max(24)
                .min(0)
                .required('Thời gian bắt đầu không được để trống'),
            total_time: Yup
                .number()
                .max(24)
                .min(0)
                .required('Tổng thời gian học không được để trống'),
        }),
        onSubmit: async () => {
            try {
                const date = formik.getFieldProps("date").value;
                const start_time = formik.getFieldProps("start_time").value;
                const total_time = formik.getFieldProps("total_time").value;
                if (add_new_flag) {
                    const response = await addSessionService({
                        date, start_time, total_time
                    });
                }
                else {
                    // const response = await updateSubjectService(sessionDetail?.id, {
                    //     name, tinchi_number
                    // })
                }
                Router.push('/sessions');
            }
            catch (error) {
                setErrorMessage(error.response.data.message)
            }
        }
    });

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
            onSubmit={formik.handleSubmit}
            {...props}
        >
            <Card>
                <CardHeader

                    title="Thông tin phiên học"
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
                                label="Ngày học"
                                className={classes.textField}
                                error={Boolean(formik.touched.date && formik.errors.date)}
                                helperText={formik.touched.date && formik.errors.date}
                                margin="normal"
                                name="date"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.date}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                label="Thời gian bắt đầu"
                                className={classes.textField}
                                error={Boolean(formik.touched.start_time && formik.errors.start_time)}
                                helperText={formik.touched.start_time && formik.errors.start_time}
                                margin="normal"
                                name="start_time"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.start_time}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                label="Tổng thời gian học"
                                className={classes.textField}
                                error={Boolean(formik.touched.total_time && formik.errors.total_time)}
                                helperText={formik.touched.total_time && formik.errors.total_time}
                                margin="normal"
                                name="total_time"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.total_time}
                                variant="outlined"
                            />
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
                        {add_new_flag ? 'Thêm' : 'Lưu'}
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
