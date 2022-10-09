import "./Course.css";
import DetectConflict from '../utilities/DetectConflict';

const Course = ({id, identification, course, courses, selected, toggleSelected}) => {
    //console.log(course);
    return(
    <div className={`course-card ${selected.includes(identification) ? 'selected' : DetectConflict(identification, course, courses, selected) ? 'conflict' : ''} `} 
    onClick={() => !selected.includes(identification) && DetectConflict(identification, course, courses, selected) ? '' : toggleSelected(identification)}>
        <h2>{course.term} CS {course.number}</h2>
        <p className="class-title">{course.title}</p>
        <p className="meeting-time">{course.meets}</p>
    </div>
    );
};

export default Course;