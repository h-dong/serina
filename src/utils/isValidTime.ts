function isValidTime(hour, minute) {
    return hour < 0 || hour > 23 || minute < 0 || minute > 59 ? false : true;
}

export default isValidTime;
