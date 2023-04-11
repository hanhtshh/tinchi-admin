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
    const { pageSize = 10, current = 1, name = '' } = router.query;

    const { data: listClass, isLoading } = useQuery(
        ['getListClass', pageSize, current, name],
        () => getListClass(pageSize, current, name),
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
                    <ClassListToolbar keySearch={name} setKeySearch={setKeySearch} />
                    <Box sx={{ mt: 3 }}>
                        <ClassListResults listClass={listClass?.classes} totalRows={listClass?.totalRows} pageSize={pageSize} current={current} isLoading={isLoading} />
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

const getListClass = async (pageSize, current, name) => {
    return getListClassService(pageSize, current, name);
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
