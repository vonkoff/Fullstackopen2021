import React from 'react'

const Header = (props) => {
    console.log(props)
    console.log(props.course.parts[0])
    console.log(props.course.parts[0].name)
    return(
            <h1>
                {props.course.name}
            </h1>
    )
}

const Part = (props) =>{
    console.log(props)
    return(
            <p>
                {props.part} {props.exercise}
            </p>
    )
}

const Content = (props) =>{
    console.log(props)
    console.log(props.course.parts[0].name)
    return(
      <>
        <Part part={props.course.parts[0].name} exercise={props.course.parts[0].exercises} />
        <Part part={props.course.parts[1].name} exercise={props.course.parts[1].exercises} />
        <Part part={props.course.parts[2].name} exercise={props.course.parts[2].exercises} />
      </>
    )
}

const Total = (props) =>{
  console.log(props.course.parts)
  console.log(props.course.parts[0])
  const total = props.course.parts.reduce((previousValue, currentValue) => 
  previousValue + currentValue.exercises, 0);
  return(
    <>
      Number of exercises {total}
    </>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


export default App