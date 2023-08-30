import CourseItem from "@/src/shared/ui/CourseItem"
import React, { FC } from "react"

interface ComponentProps {
  courses?: any
}

const HomeCourses: FC<ComponentProps> = ({ courses }) => {
  return (
    <div className="container flex flex-col lg:items-center">
      {/* 1 */}
      <div className="inline-flex max-w-[380px] flex-col items-start justify-start gap-4 lg:max-w-[580px] lg:items-center lg:text-center">
        <div className="text-[15px] font-semibold uppercase text-black text-opacity-70">почему стоит пройти курс?</div>
        <div className="text-[32px] font-bold text-black sm:text-[40px]">Учитесь и развивайтесь на нашей платформе</div>
        <div className="= text-[17px] font-normal text-black">Чем больше Вы вкладываете в свое развитие, тем лучше Вы становитесь. Меняйте себя и окружение вместе с нами.</div>
        <div className="relative h-[44px] w-full overflow-hidden rounded-[10px] sm:max-w-[200px]">
          <input
            className="h-full w-full border-none bg-gradient-to-b from-slate-500 to-slate-300 pl-[50px] text-left text-[15px] font-normal text-white placeholder-white outline-none"
            placeholder="Поиск"
          />
        </div>
      </div>
      {/* 1 */}

      {/* 2 */}
      <div className="my-[30px] flex max-w-[800px] flex-wrap justify-center gap-[20px]">
        {Array.from({ length: 10 }).map((item) => {
          return (
            <div className="inline-flex h-[42px] w-[121px] items-center justify-start gap-2 rounded-[20px] border border-black border-opacity-20 bg-white bg-opacity-20 p-[5px] text-center text-[15px] font-normal leading-tight text-black">
              <span className="max-h-[32px] min-h-[32px] min-w-[32px] max-w-[32px] rounded-full bg-black/50"></span>
              <span>Здоровье</span>
            </div>
          )
        })}
      </div>
      {/* 2 */}

      {/* 3 */}
      <div className="grid grid-cols-4 gap-[30px]">
        {Array.from({ length: 3 }).map((item, indx) => {
          return <CourseItem key={indx} />
        })}
      </div>
      {/* 3 */}
    </div>
  )
}

export default HomeCourses
