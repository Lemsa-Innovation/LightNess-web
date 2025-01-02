import {SidebarItems} from "./language/structure/commons";

function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}
const ROOTS_AUTH = '/auth';

export const AUTH_ROUTES = {
    auth: ROOTS_AUTH,
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
}
export const PUBLIC_ROUTES = {
    root: "/",
    page404: '/404',
    page500: '/500',
    notSetUpPath: "/not-set-up"
}

export const AUTH_PATHS = Object.values(AUTH_ROUTES)
export const PUBLIC_PATHS = Object.values(PUBLIC_ROUTES)

export const MERGED_PUBLIC_PATHS = AUTH_PATHS.concat(PUBLIC_PATHS)


//********************************************* */
export const PROTECTED_ROUTES = {
    profile: '/profile',
}
export const SIDEBAR_ROUTES: Record<keyof SidebarItems, {
    path: string
    children?: string[]
}> = {
    // dashboard: {
    //     path: '/app'
    // },
    // manage: {
    //     path: '/manage',
    //     children: [

    //     ]
    // },
    users: {
        path: '/users'
    },
    funeralServices: {
        path: '/funeralServices'
    },
    // testaments: {
    //     path: "/testaments"
    // },
    washers: {
        path: "/washers"
    },
    cemeteries: {
        path: "/cemeteries"
    },
    deathDeclarations: {
        path: "/deathDeclarations"
    },
    // settings: {
    //     path: "/settings"
    // }
}
//******************************************* */
export const PROTECTED_PATHS: string[] = [
    ...Object.values(PROTECTED_ROUTES),
    ...(Object.values(SIDEBAR_ROUTES).map(({path}) => path))
]