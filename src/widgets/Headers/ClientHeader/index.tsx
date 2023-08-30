import Link from "next/link"
import React from "react"

const ClientHeader = () => {
  return (
    <div className="container my-[30px]">
      <div className="flex items-center">
        <Link
          className="mr-auto"
          href="/">
          Logo
        </Link>
        <button className="flex h-[44px] min-h-[44px] w-[44px] min-w-[44px] items-center justify-center rounded-full bg-gray-500">menu</button>
      </div>
    </div>
  )
}

export default ClientHeader
