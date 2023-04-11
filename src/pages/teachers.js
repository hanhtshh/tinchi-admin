import Head from 'next/head';
import { Box, Container, Skeleton } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getListTeacherService } from '../services/teachers';
import { TeacherListToolbar } from '../components/teacher/teacher-list-toolbar';
import { TeacherListResults } from '../components/teacher/teacher-list-results';

const Page = () => {
    const router = useRouter();
    const { pageSize = 10, current = 1, name = '' } = router.query;

    const { data: listTeacher, isLoading } = useQuery(
        ['getListTeacher', pageSize, current, name],
        () => getListTeacher(pageSize, current, name),
        { refetchOnWindowFocus: false }
    );


    const setKeySearch = (key) => {
        router.push({
            query: key ? {
                name: key
            } : {}
        })
    };

    return (
        <>
            <Head>
                <title>
                    Admin | Danh sách giảng viên
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <TeacherListToolbar keySearch={name} setKeySearch={setKeySearch} />
                    <Box sx={{ mt: 3 }}>
                        {listTeacher && <TeacherListResults listTeacher={listTeacher} isLoading={isLoading} pageSize={pageSize} current={current} />}
                    </Box>
                </Container>
            </Box>
        </>
    );
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

const getListTeacher = async (pageSize, current, name) => {
    return getListTeacherService(pageSize, current, name);
}

// export const getServerSideProps = async ({ query }) => {
//   const queryClient = new QueryClient();
//   const pageSize = query?.pageSize || '';
//   const current = query?.current || '';
//   await queryClient.prefetchQuery(
//     ['getListStudent', pageSize, current],
//     () => getListStudent(pageSize, current)
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default Page;
