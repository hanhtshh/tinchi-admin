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
  const { pageSize = 10, current = 1, name = '' } = router.query;

  const { data: listStudent, isLoading } = useQuery(
    ['getListStudent', pageSize, current, name],
    () => getListStudent(pageSize, current, name),
    { refetchOnWindowFocus: false }
  );
  console.log(listStudent)
  return (
    <>
      <Head>
        <title>
          Admin | Danh sách sinh viên
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
            {
              listStudent && <CustomerListResults listStudent={listStudent.listStudent} isLoading={isLoading} pageSize={pageSize} current={current} />
            }
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

const getListStudent = async (pageSize, current, name) => {
  return getListStudentService(pageSize, current, name);
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
