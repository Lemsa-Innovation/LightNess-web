import {Timestamp} from "@firebase/firestore";
import {format} from "date-fns";

export function formatDate(timestamp: Timestamp): string {
    return format(timestamp.toDate(), 'dd-MM-yyyy');
}
export function formatTime(timestamp: Timestamp) {
    return format(timestamp.toDate().getTime(), 'dd-MM-yyyy HH:mm:ss'); // Format as 'year-month-day hours:minutes:seconds'
}
export function getTimeFromMinutes(time: number | undefined) {
    if (time !== undefined) {
        const hours = Math.floor(time / 60)
        const minutes = time % 60;

        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes}`;
    }
    return '-- : --'
}

export function isNew({createdAt, days}: {
    createdAt: Timestamp | number
    days?: number
}) {
    const getCreation = () => {
        if (typeof createdAt === 'number') {
            return createdAt
        }
        else {
            return createdAt.toMillis()
        }
    }

    if (createdAt) {
        const now = new Date(); // Current date and time
        // Calculate the difference in milliseconds between `now` and `createdAt`
        const diffInMilliseconds = now.getTime() - getCreation();

        // Calculate the difference in days
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

        // Check if the difference is less than or equal to 7 days
        return diffInDays <= (days ?? 7);
    }

}