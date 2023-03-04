import Head from 'next/head';
import { Box, Container, Skeleton } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ClassListToolbar } from '../components/class/class-list-toolbar';
import { ClassListResults } from '../components/class/class-list-results';
import { getListSessionService } from '../services/sessions';
import { SessionListToolbar } from '../components/session/session-list-toolbar';
import { SessionListResults } from '../components/session/session-list-results';

const Page = () => {
    const router = useRouter();
    const { pageSize, current } = router.query;
    const { keySearch } = router.query

    const { data: listSession, isLoading } = useQuery(
        ['getListSession', pageSize, current],
        () => getListSession(pageSize, current, keySearch),
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
                    Admin | Danh sách phiên học
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
                    <SessionListToolbar keySearch={keySearch} setKeySearch={setKeySearch} />
                    <Box sx={{ mt: 3 }}>
                        <SessionListResults listSession={listSession?.sessions} totalRows={listSession?.totalRows} isLoading={isLoading} />
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

const getListSession = async (pageSize, current, keySearch) => {
    return getListSessionService(pageSize, current, keySearch);
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
