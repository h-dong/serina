function isValidTime(hour, minute) {
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return false;

    return true;
}

export default isValidTime;
