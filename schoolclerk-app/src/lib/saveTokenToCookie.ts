'use server'

import { cookies } from "next/headers"

export async function saveTokenToCookie (token: string) {
    cookies().set('currentUser', token, {secure: true, httpOnly: true, expires: new Date(Date.now() + 7 * 86400 * 1000), path: '/'})
}
