function isValidTime(hour: number, minute: number) {
    return hour < 0 || hour > 23 || minute < 0 || minute > 59 ? false : true;
}

export default isValidTime;
