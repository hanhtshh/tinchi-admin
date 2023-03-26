import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { StudentDetailsContainer } from '../components/customer/student-details';
import { SubjectDetailsContainer } from '../components/subject/subject-details';

const Page = () => (
    <>
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
                    Thêm môn học
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
                        <SubjectDetailsContainer add_new_flag />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
);

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
