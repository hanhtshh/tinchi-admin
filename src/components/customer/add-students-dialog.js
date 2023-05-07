import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Alert, AlertTitle, Box, Button, Checkbox, DialogContent, InputAdornment, SvgIcon, TextField } from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import classes from './styles.module.css';
import { Close } from '@mui/icons-material';
import { checkScheduleService, getListClassService } from '../../services/classes';
import ClassInfo from '../class/class-info';


function SimpleDialog(props) {
    const { setOpen, open, listIdChecked = [], setListIdChecked } = props;
    const [keySearch, setKeySearch] = React.useState('');
    const [displayError, setDisplayError] = React.useState(false);
    const [displaySuccess, setDisplaySuccess] = React.useState(false);

    const handleCheckboxChange = async (class_info) => {
        const checkId = listIdChecked.find((classInfo) => classInfo.id === class_info.id);
        if (checkId) {
            setListIdChecked((listIdChecked) =>
                listIdChecked.filter((classInfo) => classInfo.id !== class_info.id)
            );
        } else {
            const checkScheduleResult = await checkScheduleService(
                listIdChecked.map(classInfo => classInfo.id).concat([class_info.id])
            );
            if (checkScheduleResult) {
                setListIdChecked((listIdChecked) => listIdChecked.concat([class_info]));
            } else {
                setDisplayError(true);
            }
        }
    };
    const handleClose = () => {
        setOpen(false)
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
        <div>{displayError && (
            <div
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    top: "0px",
                    left: "0px",
                    zIndex: 10000,
                    background: "#0000004d",
                }}
            >
                <Alert
                    severity="error"
                    style={{
                        position: "fixed",
                        top: "30vh",
                        left: "50vw",

                        width: "30vw",
                        transform: "translate(-50%)",
                    }}
                    onClose={() => {
                        setDisplayError(false);
                    }}
                >
                    <AlertTitle>Có lỗi xảy ra</AlertTitle>
                    <strong>
                        Thời khóa biểu bị trùng, vui lòng chọn môn học khác!
                    </strong>
                </Alert>
            </div>
        )}
            {displaySuccess && (
                <div
                    style={{
                        position: "fixed",
                        width: "100vw",
                        height: "100vh",
                        top: "0px",
                        left: "0px",
                        background: "#0000004d",
                        zIndex: '1000',
                    }}
                >
                    <Alert
                        severity="success"
                        style={{
                            position: "fixed",
                            top: "30vh",
                            left: "50vw",

                            width: "30vw",
                            transform: "translate(-50%)",
                        }}
                        onClose={() => {
                            setDisplaySuccess(false);
                        }}
                    >
                        <AlertTitle>Đăng kí môn học thành công</AlertTitle>
                        <strong>Vui lòng kiểm tra thời khóa biểu</strong>
                    </Alert>
                </div>
            )}
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
                        {listCLass.map((classInfo) =>
                            <div className={classes.classChoose}>
                                <div className={classes.classInfoBox} style={{ display: "flex" }}>
                                    <ClassInfo classInfo={classInfo} />
                                    <input
                                        style={{
                                            width: "20px",
                                            marginLeft: "8px"
                                        }}
                                        type="checkbox"
                                        checked={
                                            listIdChecked.find((class_info) => class_info.id === classInfo.id) ? true : false
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