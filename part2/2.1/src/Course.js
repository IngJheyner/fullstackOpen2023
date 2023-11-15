import React from 'react'
import { Header } from './Header.js'
import { Content } from './Content.js'

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