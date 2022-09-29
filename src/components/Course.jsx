const Course = ({course}) => (
    <div>
        {course.term} CS {course.number}: {course.title}
    </div>
);

export default Course;