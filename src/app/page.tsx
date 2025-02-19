import React from 'react'
import {redirect} from "next/navigation";

export default function Page() {
    redirect('/shop')
    return (
        <div>Page</div>
    )
}
