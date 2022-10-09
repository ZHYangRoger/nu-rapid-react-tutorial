import './Cart.css';

const Cart = ({courses, selected}) => (
  <div className="cart">
    <h3>My Schedule</h3><br></br>
    {
      selected.length === 0
      ? <h2>You have not yet selected any courses. Click a course card to select it.</h2>
      : Object.entries(selected).map(([id, course]) => {
        //console.log(course);
        return(
          <div key={id} className="course-cart">
            <h4>{courses[course].term} CS {courses[course].number}</h4>
            <p>{courses[course].title} @ {courses[course].meets}</p>
          </div>
        );
      })
      }
  </div>
);

export default Cart;

