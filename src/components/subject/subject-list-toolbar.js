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
import { useState } from 'react';

export const SubjectListToolbar = (props) => {
  const { keySearch, setKeySearch } = props
  const [input, setInput] = useState(keySearch);
  const router = useRouter();
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
        Danh sách môn học
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            router.push('/add-subject')
          }}
        >
          Thêm môn học
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
              placeholder="Tên lớp học"
              value={input}
              onChange={event => {
                setInput(event.target.value)
              }}
              onKeyDown={event => {
                if (event.keyCode === 13) {
                  setKeySearch(input)
                }
              }}
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
}
