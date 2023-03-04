import Head from 'next/head';
import { Box, Container, Skeleton } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getListClassService } from '../services/classes';
import { ClassListToolbar } from '../components/class/class-list-toolbar';
import { ClassListResults } from '../components/class/class-list-results';

const Page = () => {
    const router = useRouter();
    const { pageSize, current } = router.query;
    const { keySearch } = router.query

    const { data: listClass, isLoading } = useQuery(
        ['getListClass', pageSize, current],
        () => getListClass(pageSize, current, keySearch),
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
                    Admin | Danh sách lớp học
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
                    <ClassListToolbar keySearch={keySearch} setKeySearch={setKeySearch} />
                    <Box sx={{ mt: 3 }}>
                        <ClassListResults listClass={listClass?.classes} totalRows={listClass?.totalRows} isLoading={isLoading} />
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

const getListClass = async (pageSize, current, keySearch) => {
    return getListClassService(pageSize, current, keySearch);
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
