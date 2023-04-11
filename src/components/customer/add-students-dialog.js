import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button, Checkbox, DialogContent, InputAdornment, SvgIcon, TextField } from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import classes from './styles.module.css';
import { Close } from '@mui/icons-material';
import { getListClassService } from '../../services/classes';
import ClassInfo from '../class/class-info';


function SimpleDialog(props) {
    const { setOpenDialog, open } = props;
    const [keySearch, setKeySearch] = React.useState('');
    const handleClose = () => {
        setOpenDialog(false)
    };
    const [listCLass, setListClass] = React.useState([]);

    React.useEffect(() => {
        getListClassService(5, 1)
            .then((data) => {
                setListClass(data.classes)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <Dialog onClose={handleClose} open={open} className={classes.dialogBox}>
            <Close className={classes.closeButton} onClick={handleClose} />
            <DialogTitle>Thêm lớp học</DialogTitle>
            <DialogContent >
                <Box sx={{ width: 500 }}>
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
                        variant="outlined"
                        value={keySearch}
                        onChange={(event) => setKeySearch(event.target.value)}
                        onKeyDown={(event) => {
                            // if (event.keyCode === 13) {
                            //     router.push({
                            //         query: keySearch ? {
                            //             name: keySearch
                            //         } : {}
                            //     })
                            // }
                        }}
                    />
                </Box>
                <div className={classes.listClassChoose}>
                    {listCLass.map(() =>
                        <div className={classes.classChoose}>
                            <div className={classes.classInfoBox} style={{ display: "flex" }}>
                                <ClassInfo />
                                <Checkbox style={{ marginLeft: '5px' }} />
                            </div>
                        </div>
                    )}
                </div>

            </DialogContent>

        </Dialog>
    );
}

export default SimpleDialog