"use client";
import React, { useState } from "react";
import { User } from "@/interfaces/UserInterface";
import { changeUserRole } from "@/service/admin/ChangeUserRoleService";
import { toast } from "react-toastify";

interface Props {
    users: User[];
}

export default function TableUser({ users }: Props) {
    const [userList, setUserList] = useState(users); // Estado local para actualizar la UI

    const handleRoleChange = async (userId: string, newRole: string) => {
        const response = await changeUserRole(userId, newRole);
        if (response.ok) {
            toast.success("Rol cambiado con éxito");
            // Actualizar la lista de usuarios con el nuevo rol
            setUserList((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, rol: newRole } : user
                )
            );
        } else {
            toast.error("Error al cambiar el rol");
        }
    };

    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
            <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Nombre
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Email
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Rol
                </th>
            </tr>
            </thead>
            <tbody>
            {userList.map((user) => (
                <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <select
                            value={user.rol}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                        </select>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
