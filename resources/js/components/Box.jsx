import React from 'react'
import { Card } from "flowbite-react";
function Box({title,total}) {
  return (
    <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {total}
      </p>
    </Card>
  )
}

export default Box
