import "./Course.css";
import DetectConflict from '../utilities/DetectConflict';
import { NavLink } from 'react-router-dom';
import { useAuthState } from '../utilities/firebase';
import { useProfile } from '../utilities/profile';

const Course = ({ id, identification, course, courses, selected, toggleSelected }) => {
    //const [user] = useAuthState();
    const [profile, profileLoading, profileError] = useProfile();
    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
    if (profileLoading) return <h1>Loading user profile</h1>;
    if (!profile) return <h1>No profile data</h1>;

    const courseId = course.term[0] + course.number;
    //console.log("course");
    return (
        <div className={`course-card ${selected.includes(identification) ? 'selected' : DetectConflict(identification, course, courses, selected) ? 'conflict' : ''} `}
            onClick={() => !selected.includes(identification) && DetectConflict(identification, course, courses, selected) ? '' : toggleSelected(identification)} data-cy="course">
            <h2>{course.term} CS {course.number}</h2>
            <p className="class-title">{course.title}</p>
            <p className="meeting-time">{course.meets}</p>
            {profile?.isAdmin && <p><NavLink to={`/edit/${courseId}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg></NavLink></p>}
        </div>
    );
};
export default Course; 