"use server";

import {signOut} from "@/config/authConfig";

export default async function authLogout() {
    await signOut();
}