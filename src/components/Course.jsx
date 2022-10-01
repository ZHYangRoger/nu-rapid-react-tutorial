import "./Course.css";

const Course = ({course}) => (
    <div className="course-card">
        <h2>{course.term} CS {course.number}</h2>
        <p className="class-title">{course.title}</p>
        <p className="meeting-time">{course.meets}</p>
    </div>
);

export default Course;