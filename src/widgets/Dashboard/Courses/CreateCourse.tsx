import { useAutoAnimate } from "@formkit/auto-animate/react"
import clsx from "clsx"
import React, { useState } from "react"

interface Lesson {
  id: string
  title: string
}

interface Week {
  id: string
  title: string
  lessons: Lesson[]
}

export const CreateCourse: React.FC = () => {
  const [weeks, setWeeks] = useState<Week[]>([])
  const [animationParent] = useAutoAnimate()

  // Function to create a new week
  const createWeek = () => {
    const lastNumberOfWeek = weeks.length + 1
    const newWeek: Week = {
      id: generateUUID(),
      title: `Неделя ${lastNumberOfWeek}`,
      lessons: [],
    }

    setWeeks([...weeks, newWeek])
  }

  // Function to delete a week
  const deleteWeek = (weekId: string) => {
    const updatedWeeks = weeks.filter((week) => week.id !== weekId)
    setWeeks(updatedWeeks)
  }

  // Function to update the title of a week
  const updateWeekTitle = (weekId: string, newTitle: string) => {
    const updatedWeeks = weeks.map((week) => (week.id === weekId ? { ...week, title: newTitle } : week))
    setWeeks(updatedWeeks)
  }

  // Function to create a new lesson within a week
  const createLesson = (week: Week) => {
    const lastNumberLesson = week.lessons.length + 1
    const newLesson: Lesson = {
      id: generateUUID(),
      title: `Новый урок ${lastNumberLesson}`,
    }

    const updatedWeeks = weeks.map((w) => (w.id === week.id ? { ...w, lessons: [...w.lessons, newLesson] } : w))
    setWeeks(updatedWeeks)
  }

  // Function to delete a lesson within a week
  const deleteLesson = (weekId: string, lessonId: string) => {
    const updatedWeeks = weeks.map((week) => (week.id === weekId ? { ...week, lessons: week.lessons.filter((lesson) => lesson.id !== lessonId) } : week))
    setWeeks(updatedWeeks)
  }

  // Function to update the title of a lesson within a week
  const updateLessonTitle = (weekId: string, lessonId: string, newTitle: string) => {
    const updatedWeeks = weeks.map((week) =>
      week.id === weekId
        ? {
            ...week,
            lessons: week.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, title: newTitle } : lesson)),
          }
        : week,
    )
    setWeeks(updatedWeeks)
  }

  // Helper function to generate UUIDs
  const generateUUID = () => {
    // Implement your UUID generation logic here
    // You can use libraries like uuid or generate your own
    return `${Date.now()}`
  }

  return (
    <div
      ref={animationParent}
      className="bg-gray-100 p-4">
      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={createWeek}>
        Добавить неделю
      </button>
      {weeks.map((week) => (
        <div
          key={week.id}
          className="mb-4 rounded border border-gray-300 p-4">
          <input
            type="text"
            value={week.title}
            onChange={(e) => updateWeekTitle(week.id, e.target.value)}
            className="mb-2 rounded border border-gray-300 p-2"
          />
          <div className="flex space-x-2">
            <button
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              onClick={() => deleteWeek(week.id)}>
              Удалить неделю
            </button>
            <button
              className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
              onClick={() => createLesson(week)}>
              Добавить урок
            </button>
          </div>
          <div
            className={clsx("space-y-2  border-gray-300", {
              "mt-2 rounded border p-2": week.lessons.length > 0,
            })}>
            {week.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-2">
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLessonTitle(week.id, lesson.id, e.target.value)}
                  className="mb-2 rounded border border-gray-300 p-2"
                />
                <button
                  className="ml-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  onClick={() => deleteLesson(week.id, lesson.id)}>
                  Удалить урок
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
