import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export const CustomerListToolbar = (props) => {
  const [keySearch, setKeySearch] = useState('');
  const router = useRouter();
  const { name = '' } = router.query;
  useEffect(() => {
    setKeySearch(name);
  }, [name])
  return <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Danh sách sinh viên
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            router.push('/add-student')
          }}
        >
          Thêm sinh viên
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Tên sinh viên"
              variant="outlined"
              value={keySearch}
              onChange={(event) => setKeySearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  router.push({
                    query: keySearch ? {
                      name: keySearch
                    } : {}
                  })
                }
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
}
