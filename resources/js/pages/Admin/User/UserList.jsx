import React, { useEffect, useState } from 'react'
import service from '../../../config/axiosConfig';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
export default function UserList() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await service.get('/api/user');
    setUsers(response.data.data)
}
  useEffect(()=>{
    getUsers()
  },[])
    return (
    <>
<div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell className="p-4">
            <Checkbox />
          </TableHeadCell>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
          <TableHeadCell>Phone</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
            {users.map(user => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="p-4">
                <Checkbox />
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role.title}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                </a>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
    </>
  )
}

