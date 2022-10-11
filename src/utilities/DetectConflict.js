const DetectConflict = (curId, course, courses, selected) => (
    //console.log(courses[selected[0]]);
    //let selectedCourses = Object.entries(courses).filter((e, i) => selected.includes(e[0]));
    selected.reduce((prev, cur) => 
        prev || (checkTermConflict(courses[cur], course) && checkDateConflict(courses[cur], course) && checkTimeConflict(courses[cur], course)), false
    )
);

//Term
const checkTermConflict = (e, course) => {
    return (e.term === course.term);
}

//Date
const checkDateConflict = (e, course) => (
    ['M', 'Tu', 'W', 'Th', 'F'].some((day) => (
            (parseDateTime(e.meets).date.includes(day) && parseDateTime(course.meets).date.includes(day))
        )
    )
)

//Time
const checkTimeConflict = (e, course) => {
    
    //console.log(e.meets);
    //console.log('cur');
    //console.log(course.meets);
    let [s1, e1] = calculateTime(parseDateTime(e.meets).timeStart, parseDateTime(e.meets).timeEnd);
    let [s2, e2] = calculateTime(parseDateTime(course.meets).timeStart, parseDateTime(course.meets).timeEnd);
    //console.log(s1, e1, s2, e2)
    return ((s1 >= s2 && s1 <= e2) || (e1 >= s2 && e1 <= e2) || (s1 <= s2 && e1 >= e2));
}

//Parsing and Constructing
const parseDateTime = (meetTime) => (
    {
        date: meetTime.split(' ')[0],
        timeStart: meetTime.substring(meetTime.search(' ') + 1, meetTime.search('-')),
        timeEnd: meetTime.substring(meetTime.search('-') + 1, meetTime.length),
    }
)

const calculateTime = (TimeS, TimeE) => {
    let start = parseInt(TimeS.split(':')[0]) * 60 + parseInt(TimeS.split(':')[1]);
    let end = parseInt(TimeE.split(':')[0]) * 60 + parseInt(TimeE.split(':')[1]);
    return [start, end];
}

export default DetectConflict;