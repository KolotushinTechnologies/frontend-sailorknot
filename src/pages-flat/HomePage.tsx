import React, { FC } from "react"
import HomeCourses from "../widgets/HomeCourses"
import ClientHeader from "../widgets/Headers/ClientHeader"

interface ComponentProps {}

const HomePage: FC<ComponentProps> = () => {
  return (
    <>
      <ClientHeader />
      <HomeCourses />
    </>
  )
}

export default HomePage
