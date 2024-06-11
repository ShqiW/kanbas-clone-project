export function formatDate(isoDateString) {

    const dueDate = new Date(isoDateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[dueDate.getMonth()];
    if (!month) {
        return isoDateString
    }
    const day = dueDate.getDate();
    let hours = dueDate.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = dueDate.getMinutes();

    const formattedDate = `${month} ${day} at ${hours}:${minutes < 10 ? '0' : ''}${minutes}${ampm}`;


    return formattedDate;
}



