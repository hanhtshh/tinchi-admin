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
import Router, { useRouter } from 'next/router';
import { useFormik } from 'formik';
import ClassInfo from '../class/class-info';
import { addSubjectService, updateSubjectService } from '../../services/subjects';

export const SubjectDetailsContainer = (props) => {
    const { add_new_flag = false, subjectDetail } = props
    const router = useRouter()
    console.log(subjectDetail)
    const formik = useFormik({
        initialValues: {
            name: add_new_flag ? '' : subjectDetail?.name,
            tinchi_number: add_new_flag ? 0 : subjectDetail?.tinchi_number,
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required('Tên môn học không được để trống'),
            tinchi_number: Yup
                .number()
                .max(10)
                .min(0)
                .required('Số tín chỉ không được để trống'),
        }),
        onSubmit: async () => {
            try {
                const name = formik.getFieldProps("name").value;
                const tinchi_number = formik.getFieldProps("tinchi_number").value;
                if (add_new_flag) {
                    const response = await addSubjectService({
                        name, tinchi_number
                    });
                }
                else {
                    const response = await updateSubjectService(subjectDetail?.id, {
                        name, tinchi_number
                    })
                }
                Router.push('/subjects');
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

                    title="Thông tin môn học"
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
                                label="Tên môn học"
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
                                label="Số tín chỉ"
                                className={classes.textField}
                                error={Boolean(formik.touched.tinchi_number && formik.errors.tinchi_number)}
                                helperText={formik.touched.tinchi_number && formik.errors.tinchi_number}
                                margin="normal"
                                name="tinchi_number"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tinchi_number}
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
