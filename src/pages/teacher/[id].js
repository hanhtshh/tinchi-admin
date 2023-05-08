import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../..//components/dashboard-layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserDetailService } from '../../services/students';
import { TeacherDetailsContainer } from '../../components/teacher/teacher-details';

const Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [userInfo, setUserInfo] = useState();
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const result = await getUserDetailService(id);
                setUserInfo(result);
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfo();
    }, [id]);
    console.log(userInfo)
    return <>
        <Head>
            <title>
                Account | Material Kit
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Thay đổi thông tin giảng viên
                </Typography>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={12}
                        md={6}
                        xs={12}
                    >
                        {userInfo && <TeacherDetailsContainer userInfo={userInfo} />}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
