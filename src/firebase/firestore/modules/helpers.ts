import {firestoreDb} from "@/firebase/config/firebase";
import {DocumentReference, GeoPoint, collection, doc} from "@firebase/firestore";

export function generateDocumentRef(path: string, ...pathSegments: string[]) {
    return doc(collection(firestoreDb, path, ...pathSegments));
}
export function getDocumentRef(path: string, ...pathSegments: string[]) {
    return (doc(firestoreDb, path, ...pathSegments))
}

export function getCollectionRef(path: string, ...pathSegments: string[]) {
    return (collection(firestoreDb, path, ...pathSegments))
}
export const getRefId = (ref: DocumentReference | undefined | null, repertory: string) => {
    if (!ref) {
        throw new Error(`Missing reference for ${repertory}`);
    }
    return ref.id;
};

export const getParentDocOfDoc = (ref: DocumentReference | undefined | null) => {
    if (ref && ref.parent.parent) {
        return ref.parent.parent;
    }
    throw new Error(`Missing reference `);
};


export function checkArrayValues({updatedValue, defaultValue}: {
    updatedValue: string[], defaultValue?: string[]
}) {
    return {
        removedItemd: defaultValue?.filter((value) => !updatedValue.includes(value)),
        addedItems: updatedValue.filter((value) => !defaultValue?.includes(value)),
    }
}

// export function getGeoPoint(latLng: google.maps.LatLngLiteral): GeoPoint {
//     return new GeoPoint(latLng.lat, latLng.lng)
// }

// export function getLatLng(geoPoint: GeoPoint): google.maps.LatLngLiteral {
//     return {
//         lat: geoPoint.latitude,
//         lng: geoPoint.longitude
//     }
// }

