import React from 'react'

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  )
}

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />

      <p>
        <b>
          total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
        </b>
      </p>
    </div>
  )
}