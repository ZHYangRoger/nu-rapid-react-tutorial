import "./Course.css";

const Course = ({id, identification, course, selected, toggleSelected}) => (
    <div className={`course-card ${selected.includes(identification) ? 'selected' : ''}`} onClick={() => toggleSelected(identification)}>
        <h2>{course.term} CS {course.number}</h2>
        <p className="class-title">{course.title}</p>
        <p className="meeting-time">{course.meets}</p>
    </div>
);

export default Course;