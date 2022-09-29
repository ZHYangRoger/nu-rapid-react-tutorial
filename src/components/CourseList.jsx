import Course from "./Course.jsx";

const CourseList = ({courses}) => (
    <div>
        {Object.entries(courses).map(([id, course]) => <Course key={id} course={course} />)}
    </div>
);

export default CourseList;