import React from "react"

export const CourseCard = () => {
  return (
    <div className="container grid grid-cols-2 gap-3">
      {Array.from({ length: 10 }).map((_item, indx) => (
        <div key={indx} className="inline-flex flex-col items-center justify-start gap-4 rounded-[30px] border border-white bg-gradient-to-b from-amber-100 to-sky-700 px-4 pb-2.5 pt-[55px] shadow backdrop-blur-[60px]">
          <img
            className="h-[123px] w-[123px]"
            src="https://via.placeholder.com/123x123"
          />
          <div className="absolute right-[18px] top-[22px] flex flex-col items-end justify-start gap-2.5 rounded-[30px]">
            <img
              className="h-[42px] w-[42px] rounded-full shadow"
              src="https://via.placeholder.com/42x42"
            />
            <img
              className="h-[42px] w-[42px] rounded-full shadow"
              src="https://via.placeholder.com/42x42"
            />
          </div>
          <div className="flex shrink grow basis-0 flex-col items-start justify-start gap-2 self-stretch">
            <div className="self-stretch text-2xl font-medium leading-[31.20px] text-white">Основы продакт - менеджера </div>
            <div className="self-stretch text-[15px] font-semibold uppercase leading-tight text-white text-opacity-70">1 Месяц - 14 Лекций</div>
            <div className="self-stretch text-[13px] font-normal leading-[16.90px] text-white text-opacity-70">20 видео - 15 дней курс</div>
          </div>
        </div>
      ))}
    </div>
  )
}
