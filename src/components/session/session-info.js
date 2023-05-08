import classes from './styles.module.css';
import CloseIcon from '@mui/icons-material/Close';
const formatDate = (date) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
}

function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
}

const time_convert = (num) => {
    var hours = Math.floor(num);
    var minutes = (num * 60) % 60;
    return pad(hours) + ":" + pad(minutes);
};

const SessionInfo = ({ sessionInfo }) => {
    console.log(sessionInfo);
    return sessionInfo && <div className={classes.sessionInfoBox}>
        {/* <div className={classes.deleteIconBox}><CloseIcon className={classes.deleteIcon} /></div> */}
        <div className={classes.sessionInfo}>
            <div className={classes.classKey}><b>Ngày học:</b> {formatDate(sessionInfo.date)}</div>
        </div>
        <div className={classes.sessionInfo}>
            <div className={classes.classKey}><b>Thời gian:</b> {time_convert(sessionInfo.start_time)} - {time_convert(sessionInfo.start_time + sessionInfo.total_time)}</div>
        </div>
    </div>
}
export default SessionInfo