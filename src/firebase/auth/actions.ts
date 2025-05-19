"use server"
import {CreateRequest} from "firebase-admin/auth"
import { CustomClaims } from "./types"
import { adminAuth } from "../admin/config"


export async function createAuthUser(properties: CreateRequest) {
    return adminAuth.createUser(properties)
}

export async function setCustomUserClaims({uid, customClaims}: {
    uid: string
    customClaims: CustomClaims
}) {
    await adminAuth.setCustomUserClaims(uid, customClaims)
}
