import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { SubjectDetailsContainer } from '../../components/subject/subject-details';
import { useRouter } from 'next/router';
import { getDetailSubjectService } from '../../services/subjects';
import { useQuery } from '@tanstack/react-query';



const Page = () => {
    const router = useRouter();
    const { id } = router.query

    const { data: subjectDetail } = useQuery(
        ['getDetailSubject', id],
        () => getDetailSubject(id),
        { refetchOnWindowFocus: false, staleTime: 0, cacheTime: 0 }
    );
    console.log(subjectDetail)
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
                    Thay đổi thông tin môn học
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
                        {subjectDetail && <SubjectDetailsContainer subjectDetail={subjectDetail} />}

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

const getDetailSubject = async (id) => {
    return getDetailSubjectService(id);
}


export default Page;
