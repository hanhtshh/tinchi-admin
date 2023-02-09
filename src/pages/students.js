import Head from 'next/head';
import { Box, Container, Skeleton } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getListStudentService } from '../services/students';

const Page = () => {
  const router = useRouter();
  const { pageSize, current } = router.query;

  const { data: listStudent, isLoading } = useQuery(
    ['getListStudent', pageSize, current],
    () => getListStudent(pageSize, current),
    { refetchOnWindowFocus: false }
  );
  console.log(listStudent)
  return (
    <>
      <Head>
        <title>
          Students
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
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults listStudent={listStudent} isLoading={isLoading} />
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

const getListStudent = async (pageSize, current) => {
  return getListStudentService(pageSize, current);
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
