import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>
        Dashboard
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
        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
// import Head from 'next/head';
// import { Box, Container, Skeleton } from '@mui/material';
// import { CustomerListResults } from '../components/customer/customer-list-results';
// import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
// import { DashboardLayout } from '../components/dashboard-layout';
// import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/router';
// import { getListStudentService } from '../services/students';
// import { Sales } from '../components/dashboard/sales';
// import { LatestOrders } from '../components/dashboard/latest-orders';

// const Page = () => {
//   const router = useRouter();
//   const { pageSize = 10, current = 1, name = '' } = router.query;

//   const { data: listStudent, isLoading } = useQuery(
//     ['getListStudent', pageSize, current, name],
//     () => getListStudent(pageSize, current, name),
//     { refetchOnWindowFocus: false }
//   );
//   console.log(listStudent)
//   return (
//     <>
//       <Head>
//         <title>
//           Admin | Danh sách sinh viên
//         </title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8
//         }}
//       >
//         <Container maxWidth={false}>
//           <Box sx={{ mt: 3 }}>
//             <LatestOrders />
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// }

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// const getListStudent = async (pageSize, current, name) => {
//   return getListStudentService(pageSize, current, name);
// }

// // export const getServerSideProps = async ({ query }) => {
// //   const queryClient = new QueryClient();
// //   const pageSize = query?.pageSize || '';
// //   const current = query?.current || '';
// //   await queryClient.prefetchQuery(
// //     ['getListStudent', pageSize, current],
// //     () => getListStudent(pageSize, current)
// //   );

// //   return {
// //     props: {
// //       dehydratedState: dehydrate(queryClient),
// //     },
// //   };
// // };

// export default Page;
