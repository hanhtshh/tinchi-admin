import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import classes from './styles.module.css'
import { registerAccount } from '../services/register';
import { useState } from 'react';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone_number: '',
      password: '',
      secret: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Địa chỉ email không hợp lệ')
        .max(255)
        .required(
          'Email không được để trống'),
      name: Yup
        .string()
        .max(255)
        .required('Họ & tên không được để trống'),
      phone_number: Yup
        .string()
        .max(255)
        .required('Số điện thoại không được để trống'),
      secret: Yup
        .string()
        .max(255)
        .required('Mã bí mật không được để trống'),
      password: Yup
        .string()
        .max(255)
        .required('Mật khẩu không được để trống'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'Đồng ý điều khoản trước khi đăng kí'
        )
    }),
    onSubmit: async () => {
      try {
        const username = formik.getFieldProps("email").value;
        const password = formik.getFieldProps("password").value;
        const name = formik.getFieldProps("name").value;
        const phone_number = formik.getFieldProps("phone_number").value;
        const secret = formik.getFieldProps("secret").value;
        const response = await registerAccount(username, password, name, phone_number, secret);
        localStorage.setItem('token', response.data.data.token)
        Router.push('/')
      }
      catch (error) {
        setErrorMessage(error.response.data.message)
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm" className={classes.container}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Tạo mới tài khoản
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sử dụng email của bạn để tạo mới tài khoản
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Họ & tên"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.phone_number && formik.errors.phone_number)}
              fullWidth
              helperText={formik.touched.phone_number && formik.errors.phone_number}
              label="Số điện thoại"
              margin="normal"
              name="phone_number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mật khẩu"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.secret && formik.errors.secret)}
              fullWidth
              helperText={formik.touched.secret && formik.errors.secret}
              label="Mã bí mật"
              margin="normal"
              name="secret"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.secret}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Tôi đồng ý với
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    điều khoản
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Đăng ký ngay
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Bạn đã có tài khoản?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Đăng nhập
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
