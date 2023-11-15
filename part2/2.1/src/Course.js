import React from 'react'
import { Header } from './Header.js'
import { Content } from './Content.js'

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}