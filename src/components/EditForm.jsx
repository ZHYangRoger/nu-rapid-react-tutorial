import { useFormData } from '../utilities/useFormData';
import { useNavigate, useParams } from "react-router-dom";
import { useDbUpdate } from '../utilities/firebase';

const validateUserData = (key, val) => {
  switch (key) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : 'must be at least two characters';
    case 'meets':
      return /(M|Tu|W|Th|F) [0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9]/g.test(val) ? '' : 'must contain days and start-end, e.g., MWF 12:00-13:20';
    default: return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const EditForm = ({courses}) => {
  //const [update, result] = useDbUpdate(`/users/${user.id}`);
  const { id } = useParams();
  const [update, result] = useDbUpdate(`/edit/${courses[id].number}`);
  const [state, change] = useFormData(validateUserData, courses[id]);
  console.log(courses[id]);

  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
  };
  const setDisabled = (state.errors || (state.values.title === courses[id].title && state.values.meets === courses[id].meets));
  //console.log(setDisabled);

  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Course Meeting Time" state={state} change={change} />
      <ButtonBar message={result?.message} disabled={setDisabled}/>
    </form>
  )
}; 

export default EditForm;