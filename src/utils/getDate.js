const getDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let hour = (hours === 0) ? 12 : hours;

    return `${month}-${day}-${year}T${(hours === 0 ? 12 : hours)}:${minutes}:${seconds} ${(hour >= 12) ? "AM" : "PM"}`
};

export default getDate;