import React, { useEffect, useState } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import ClassInfo from '../class/class-info';
import SimpleDialog from './add-teacher-dialog';
import { addClassService, checkScheduleService } from '../../services/classes';
import { createUserInfoService, updateUserInfoService } from '../../services/students';

export const TeacherDetailsContainer = (props) => {
    const router = useRouter();
    const { userInfo } = props;
    const [listIdChecked, setListIdChecked] = useState(userInfo?.listClass || []);
    const [displayError, setDisplayError] = React.useState(false);
    const [displaySuccess, setDisplaySuccess] = React.useState(false);
    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: userInfo?.email || 'example@gmail.com',
            name: userInfo?.name || '',
            phone_number: userInfo?.phone_number || '',
            password: userInfo?.password || ''
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
        onSubmit: async (event) => {
            try {
                const email = formik.getFieldProps("email").value;
                const name = formik.getFieldProps("name").value;
                const phone_number = formik.getFieldProps("phone_number").value;
                const password = formik.getFieldProps("password").value;

                // const response = await loginAccount(username, password);
                // localStorage.setItem('token', response.data.data.token)
                // Router.push('/')
                // event.preventDefault();
                if (userInfo) {
                    await Promise.all([updateUserInfoService({
                        email,
                        name,
                        phone_number,
                        password,
                        role: 1,
                        id: userInfo?.id
                    }), addClassService(listIdChecked.map(classInfo => classInfo.id), userInfo?.id)])
                }
                else {
                    await createUserInfoService({
                        email,
                        name,
                        phone_number,
                        password,
                        role: 1
                    }, listIdChecked.map(classInfo => classInfo.id))
                }
                router.push('/students')
            }
            catch (error) {
                setErrorMessage(error.response.data.message)
            }
        }
    });
    useEffect(() => {
        setListIdChecked(userInfo?.listClass || [])
    }, [userInfo])
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:8080/patient', values)
    //         .then((data) => {
    //             router.push('/')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleCheckboxChange = async (class_info) => {
        const checkId = listIdChecked.find((classInfo) => classInfo.id === class_info.id);
        if (checkId) {
            setListIdChecked((listIdChecked) =>
                listIdChecked.filter((classInfo) => classInfo.id !== class_info.id)
            );
        } else {
            const checkScheduleResult = await checkScheduleService(
                listIdChecked.map(classInfo => classInfo.id).concat([class_info.id])
            );
            if (checkScheduleResult) {
                setListIdChecked((listIdChecked) => listIdChecked.concat([class_info]));
            } else {
                setDisplayError(true);
            }
        }
    };

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            {...props}
        >
            <SimpleDialog setDisplayError={setDisplayError} setDisplaySuccess={setDisplaySuccess} displayError={displayError} displaySuccess={displaySuccess} handleCheckboxChange={handleCheckboxChange} listIdChecked={listIdChecked} setListIdChecked={setListIdChecked} open={open} setOpen={setOpen} />
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
                            <button type='button' onClick={() => setOpen(true)} className={classes.addClassButton}><AddIcon fontSize={'large'} className={classes.addClassIcon} /></button>
                        </Grid>

                        {
                            listIdChecked?.map((classInfo, index) => <Grid
                                item
                                key={index}
                                md={6}
                                xs={12}
                            >
                                <div className={classes.classInfoBox}>
                                    <CloseIcon className={classes.deleteIcon} onClick={() => {
                                        handleCheckboxChange(classInfo)
                                    }} />
                                    <ClassInfo classInfo={classInfo} /></div>
                            </Grid>)
                        }



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
                        {userInfo ? "Lưu" : "Thêm"}
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
