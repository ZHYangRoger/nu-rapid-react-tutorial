import "./TermPage.css";
import Course from "./Course.jsx";
import {useState} from "react";

const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({term, selection, setSelection}) => (
    <div>
        <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
        onChange={() => setSelection(term)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={term}>
        { term }
        </label>
  </div>
)

const TermSelector = ({selection, setSelection}) => (
    <div className="btn-group">
        { 
            Object.values(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
        }
  </div>
)

const Term = ({selection, courses}) => {
    const curCourse = Object.values(courses).filter((course) => selection == course.term);
    return(
        <div className="course-list" >
            { Object.entries(curCourse).map(([id, course]) => <Course key={id} course={course} />) }
        </div>
    )
};
  
  const TermPage = ({courses}) => {
    const [selection, setSelection] = useState(() => Object.values(terms)[0]);
    return (
      <div>
        <TermSelector selection={selection} setSelection={setSelection} />
        <Term selection={selection} courses={courses}/>
      </div>
    );
  }
  
  export default TermPage;