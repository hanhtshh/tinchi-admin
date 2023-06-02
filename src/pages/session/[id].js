import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getDetailSessionService } from '../../services/sessions';
import { SessionDetailsContainer } from '../../components/session/subject-details';



const Page = () => {
    const router = useRouter();
    const { id } = router.query

    const { data: sessionDetail } = useQuery(
        ['getDetailSession', id],
        () => getDetailSession(id),
        { refetchOnWindowFocus: false, staleTime: 0, cacheTime: 0 }
    );
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
                    Thay đổi thông tin phiên học
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
                        {sessionDetail && <SessionDetailsContainer sessionDetail={sessionDetail} />}

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

const getDetailSession = async (id) => {
    return getDetailSessionService(id);
}


export default Page;
