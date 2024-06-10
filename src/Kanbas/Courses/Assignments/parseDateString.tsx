export function parseDateString(formattedDateString) {
    if (!formattedDateString) {
        return '';
    }


    const parts = formattedDateString.split(" ");

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    if (parts.length !== 4) {

        return formattedDateString;
    }


    const month = parts[0];
    const day = parts[1];
    const time = parts[3];
    const ampm = time.slice(-2);
    const [hours, minutes] = time.slice(0, -2).split(":");


    let hours24 = parseInt(hours, 10);
    if (ampm === 'pm' && hours24 !== 12) {
        hours24 += 12;
    } else if (ampm === 'am' && hours24 === 12) {
        hours24 = 0;
    }


    const currentYear = new Date().getFullYear();
    const monthIndex = monthNames.indexOf(month) + 1;
    const paddedMonth = monthIndex < 10 ? '0' + monthIndex : monthIndex;
    const paddedDay = parseInt(day, 10) < 10 ? '0' + day : day;
    const paddedHours = hours24 < 10 ? '0' + hours24 : hours24;
    const isoDateString = `${currentYear}-${paddedMonth}-${paddedDay}T${paddedHours}:${minutes.padStart(2, '0')}`;

    return isoDateString;
}
