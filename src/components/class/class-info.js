import classes from './styles.module.css';
import CloseIcon from '@mui/icons-material/Close';
const ClassInfo = ({ classInfo }) => {
    console.log(classInfo);
    return <div className={classes.classInfoBox}>
        {/* <div className={classes.deleteIconBox}><CloseIcon className={classes.deleteIcon} /></div> */}
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Tên lớp học:</div>
            <div className={classes.classValue}>{classInfo?.subject?.name}</div>
        </div>
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Trạng thái:</div>
            <div className={classes.classValue}>{classInfo?.status}</div>
        </div>
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Số lượng sinh viên tối đa:</div>
            <div className={classes.classValue}>{classInfo?.max_student}</div>
        </div>
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Số lượng sinh viên hiện tại:</div>
            <div className={classes.classValue}>{classInfo?.total_student}</div>
        </div>


    </div>
}
export default ClassInfo