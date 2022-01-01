
const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum =  (prevValue, currValue) => prevValue + currValue
  const exercises = course.parts.map(el => el.exercises);
  // Work the arrow function below current one in return
  // const val = 0
  // const summ = 0

  return(
    <p>
    <strong>Total of  
    {" " +  exercises.reduce(sum) + " Exercises"}
    </strong>
    {/* Would also work */}
    {/* {" " + exercises.reduce((val, summ) =>
      val + summ
    )} */}
    </p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      {course.map(courses =>
        <div>
        <Header key={courses.id} course={courses} />
        <Content key={courses.id} course={courses} />
        <Total key={courses.id} course={courses} />
        </div>
      )}
    </div>
  )
}

export default Course;