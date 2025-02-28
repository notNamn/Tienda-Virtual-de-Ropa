import React from 'react'
import Title from "@/components/ui/Title";
import TableUser from "@/components/admin/users/TableUser";
import {getAllUsers} from "@/service/admin/UserAdminService";
import Pagination from "@/components/ui/Pagination";

export default async function PageUserAdmin() {
    const {users} =await getAllUsers();
    return (
        <>
            <Title title={'Usuarios'} subtitle={'Todos los usuarios registrados'}/>

            <div className="mb-10">
                <TableUser users={users}/>
            </div>
            <Pagination totalPages={3} currentPage={1}/>

        </>
    )
}
