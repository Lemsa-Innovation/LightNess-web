import {Announcement as AnnouncementShared } from "@shared/collections"
import { DefaultFirestoreTypes } from "../../modules/types"
type Announcement = AnnouncementShared<DefaultFirestoreTypes>

export type {Announcement}