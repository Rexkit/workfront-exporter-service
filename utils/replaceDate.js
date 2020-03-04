module.exports = (date) => {
    let newDate;
    if (date !== null) {
        newDate = date.replace('T', ' ');
        return newDate;
    } else {
        return date;
    }
};