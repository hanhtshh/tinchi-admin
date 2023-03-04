import Head from 'next/head';
import { Box, Container, Skeleton } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getListTeacherService } from '../services/teachers';
import { TeacherListToolbar } from '../components/teacher/teacher-list-toolbar';
import { TeacherListResults } from '../components/teacher/teacher-list-results';

const Page = () => {
    const router = useRouter();
    const { pageSize, current } = router.query;
    const { keySearch } = router.query

    const { data: listTeacher, isLoading } = useQuery(
        ['getListTeacher', pageSize, current],
        () => getListTeacher(pageSize, current, keySearch),
        { refetchOnWindowFocus: false }
    );


    const setKeySearch = (key) => {
        router.push({
            query: {
                keySearch: key
            }
        })
    };


    console.log(keySearch)
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
                    <TeacherListToolbar keySearch={keySearch} setKeySearch={setKeySearch} />
                    <Box sx={{ mt: 3 }}>
                        <TeacherListResults listTeacher={listTeacher} isLoading={isLoading} />
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

const getListTeacher = async (pageSize, current, keySearch) => {
    return getListTeacherService(pageSize, current, keySearch);
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
