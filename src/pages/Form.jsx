import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ initialTodo, handleSubmit, buttonLabel }) => {
  const navigate = useNavigate();
  const [formData, setFormDate] = useState(initialTodo);
  //handle change to update the form
  const handleChange = (event) => {
    setFormDate({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmission}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.subject}
        name="subject"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.details}
        name="details"
      />

      <input type="submit" value={buttonLabel} />
    </form>
  );
};
export default Form;
