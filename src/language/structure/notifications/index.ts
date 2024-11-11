export interface NotificationItem {
    title: string
    body: string
}
export interface LinkNotificationItem extends NotificationItem {
    linkText: string
}

export interface Notifications {
    timing: {
        seconds: {
            singular: string,
            plural: string
        }
        minutes: {
            singular: string,
            plural: string
        }
        hours: {
            singular: string,
            plural: string
        }
        days: {
            singular: string,
            plural: string
        }
        ago: string
    }
}
