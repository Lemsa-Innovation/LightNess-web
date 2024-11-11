import {Day} from "@/language/structure/commons";
import {FieldValue, GeoPoint, Timestamp} from "@firebase/firestore";

export type Validation = {
    status: "pending"
} | {
    status: "validated" | "rejected"
    updatedAt: Timestamp
} | {
    status: "invited"
    inviteCode: string
}
export type ValidationRecord = {
    validation: Validation;
    createdAt: FieldValue; // Date à laquelle le bénéficiaire a été ajouté
}

export type EnvSource = "server" | "client";
export type LatLng = {lat: number, lng: number}
export type MapLocation = {
    geoPoint: GeoPoint
    placeId?: string
    formattedAddress?: string
    name?: string
    floor?: number
    manualAddress?: string
}

export const allDays: Day[] = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];