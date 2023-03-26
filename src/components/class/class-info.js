import classes from './styles.module.css';
import CloseIcon from '@mui/icons-material/Close';
const ClassInfo = (props) => {
    return <div className={classes.classInfoBox}>
        <div className={classes.deleteIconBox}><CloseIcon className={classes.deleteIcon} /></div>
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Tên lớp học:</div>
            <div className={classes.classValue}>Các hệ thống dựa trên tri thức </div>
        </div>
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Trạng thái:</div>
            <div className={classes.classValue}>OPEN</div>
        </div>
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Số lượng sinh viên tối đa:</div>
            <div className={classes.classValue}>60</div>
        </div>
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Số lượng sinh viên hiện tại:</div>
            <div className={classes.classValue}>0</div>
        </div>
        <div className={classes.classInfo}>
            <div className={classes.classKey}>Số lượng sinh viên tối đa:</div>
            <div className={classes.classValue}>4</div>
        </div>


    </div>
}
export default ClassInfo