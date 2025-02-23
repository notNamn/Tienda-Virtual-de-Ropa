import React from 'react'
import {auth} from "@/config/authConfig";

export default  async function PageProfile() {
    const session = await auth();
    return (
        <div>
            <h1> Profile </h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}
