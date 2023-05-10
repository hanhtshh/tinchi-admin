import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Alert, AlertTitle, Box, Button, Checkbox, DialogContent, InputAdornment, SvgIcon, TextField } from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import classes from './styles.module.css';
import { Close } from '@mui/icons-material';
import { checkScheduleService, getListClassService } from '../../services/classes';
import ClassInfo from '../class/class-info';
import { getListSessionService } from '../../services/sessions';
import SessionInfo from '../session/session-info';


function SimpleDialog(props) {
    const { setOpen, open, listIdChecked = [], setListIdChecked, handleCheckboxChange } = props;
    const [keySearch, setKeySearch] = React.useState('');



    const handleClose = () => {
        setOpen(false)
    };
    const [listCLass, setListClass] = React.useState([]);


    const handleSearch = async () => {
        try {
            let response;
            if (keySearch) {
                const dateParts = keySearch.split("/");
                // month is 0-based, that's why we need dataParts[1] - 1
                const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                response = await getListSessionService(8, 1, dateObject);
            }
            else {
                response = await getListSessionService(8, 1);

            }
            setListClass(response?.sessions);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={open} className={classes.dialogBox} style={{ zIndex: '1' }}>

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
                            placeholder="Tìm kiếm theo ngày"
                            variant="outlined"
                            value={keySearch}
                            onChange={(event) => setKeySearch(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.keyCode === 13) {
                                    handleSearch();
                                }
                            }}
                        />
                    </Box>
                    <div className={classes.listClassChoose}>
                        {listCLass.map((classInfo, index) =>
                            <div key={index} className={classes.classChoose}>
                                <div className={classes.classInfoBoxB} style={{ display: "flex" }}>
                                    <SessionInfo sessionInfo={classInfo} />
                                    <input
                                        style={{
                                            width: "20px",
                                            marginLeft: "8px"
                                        }}
                                        type="checkbox"
                                        checked={
                                            listIdChecked?.find((class_info) => class_info.id === classInfo.id) ? true : false
                                        }
                                        onChange={(event) => handleCheckboxChange(classInfo)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </DialogContent>

            </Dialog>
        </div>

    );
}

export default SimpleDialog