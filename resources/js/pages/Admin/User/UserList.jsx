import React, { useEffect, useState } from 'react'
import service from '../../../config/axiosConfig';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UserList() {
  
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await service.get('/api/user');
    setUsers(response.data.data)  
  }

  useEffect(()=>{
    getUsers()
  },[])

  const handleDelete = async (userId) => {
      // Show confirmation dialog
      const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this user!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
      });
    
      if (result.isConfirmed) {
          // User confirmed deletion
          try {
              const response = await service.delete(`/api/user/${userId}`);
              if (response.status === 200) {
                  // Remove the deleted user from the local state
                  setUsers(users.filter(user => user.id !== userId));
                  // Show success message
                  Swal.fire('Deleted!', 'The user has been deleted.', 'success');
              }
          } catch (error) {
              console.error('Error deleting user:', error);
              // Show error message
              Swal.fire('Error!', 'Failed to delete the user.', 'error');
          }
      }
  };


    return (
    <>
    <section className="container mx-auto">
        <h1 className="font-bold text-3xl text-center mt-10 mb-10">User List</h1>
        <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell className="border p-4">#</TableHeadCell>
            <TableHeadCell className='border'>Name</TableHeadCell>
            <TableHeadCell className='border'>Email</TableHeadCell>
            <TableHeadCell className='border'>Role</TableHeadCell>
            <TableHeadCell className='border'>Phone</TableHeadCell>
            <TableHeadCell className='border'>Action</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
              {users.map(user => (
              <TableRow key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="border text-center p-4">{user.id}</TableCell>
                  <TableCell className="border text-center whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.first_name}  {user.last_name}</TableCell>
                  <TableCell className="border text-center">{user.email}</TableCell>
                  <TableCell className="border text-center">{user.role.title}</TableCell>
                  <TableCell className="border text-center">{user.phone}</TableCell>
                  <TableCell className="border text-center">
                    <Link to={`/user/edit/${user.id}`} className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline pr-3">Edit</Link>
                    <button onClick={() => handleDelete(user.id)} className="text-center font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                  </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        </div>
      </section>
    </>
  )
}

