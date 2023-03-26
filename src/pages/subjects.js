import Head from 'next/head';
import { Box, Container, Skeleton } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ClassListResults } from '../components/class/class-list-results';
import { getListSubjectService } from '../services/subjects';
import { SubjectListToolbar } from '../components/subject/subject-list-toolbar';
import { SubjectListResults } from '../components/subject/subject-list-results';

const Page = () => {
    const router = useRouter();
    const { pageSize, current } = router.query;
    const { keySearch } = router.query

    const { data: listSubject, isLoading } = useQuery(
        ['getListSubject', pageSize, current],
        () => getListSubject(pageSize, current, keySearch),
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
                    Admin | Danh sách môn học
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
                    <SubjectListToolbar keySearch={keySearch} setKeySearch={setKeySearch} />
                    <Box sx={{ mt: 3 }}>
                        <SubjectListResults listSubject={listSubject?.subjects} totalRows={listSubject?.totalRows} isLoading={isLoading} />
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

const getListSubject = async (pageSize, current, keySearch) => {
    return getListSubjectService(pageSize, current, keySearch);
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
