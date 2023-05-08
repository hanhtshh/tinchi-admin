import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../..//components/dashboard-layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserDetailService } from '../../services/students';
import { TeacherDetailsContainer } from '../../components/teacher/teacher-details';
import { getClassInfoService } from '../../services/classes';
import { ClassDetailsContainer } from '../../components/class/class-detail';

const Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [classInfo, setClassInfo] = useState();
    useEffect(() => {
        const getClassInfo = async () => {
            try {
                const result = await getClassInfoService(id);
                setClassInfo(result);
            } catch (error) {
                console.log(error);
            }
        };
        getClassInfo();
    }, [id]);
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
                    Thay đổi thông tin lớp học
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
                        {classInfo && <ClassDetailsContainer classInfo={classInfo} />}
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
