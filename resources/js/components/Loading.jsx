import React from 'react'
import { Spinner } from "flowbite-react";
import SidebarMain from './SidebarMain';
function Loading() {
  return (
    <>
        <SidebarMain />
        <div className="flex justify-center items-center h-screen text-center m-auto">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
    </>
  )
}

export default Loading
