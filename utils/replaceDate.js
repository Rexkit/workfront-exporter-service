module.exports = (date) => {
    let newDate;
    if (date !== null) {
        console.log('original: ', date);
        newDate = date.replace('T', ' ');
        console.log('new date: ', newDate);
        return newDate;
    } else {
        return date;
    }
};