import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import * as Yup from 'yup';
import { Button, DialogContent, TextField } from '@mui/material';
import classes from './styles.module.css';
import { useFormik } from 'formik';
import { Close } from '@mui/icons-material';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { setOpenDialog, selectedValue, open } = props;
    const [errorMessage, setErrorMessage] = React.useState("");
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

    const handleClose = () => {
        setOpenDialog(false)
    };

    const handleListItemClick = (value) => {

    };

    return (
        <Dialog onClose={handleClose} open={open} className={classes.dialogBox}>
            <Close className={classes.closeButton} onClick={handleClose} />
            <DialogTitle>Thêm sinh viên</DialogTitle>
            <DialogContent >
                <form className={classes.dialogContentBox} onSubmit={formik.handleSubmit}>
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
                        variant="outlined" />

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
                        variant="outlined" />

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
                        variant="outlined" />

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
                        variant="outlined" />

                    {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}
                    <div className={classes.dialogListButton}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            Thêm sinh viên
                        </Button>
                    </div>
                </form>
            </DialogContent>

        </Dialog>
    );
}

export default SimpleDialog