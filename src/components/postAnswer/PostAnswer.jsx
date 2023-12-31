import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../axios";
import "./postAnswer.css";
import { FaHandPointRight } from "react-icons/fa";

function PostAnswer({ questionId }) {
  const params = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `/answers/${params.id}`,
        {
          questionid: questionId,
          answer: form.answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload(false);
      navigate(`/questions/${params.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container my-5">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-5 answer_form justify-content-between"
      >
        <h3>Answer The Top Question</h3>
        <Link to="/" className="text-decoration-none text-reset cursor-pointer">
          <FaHandPointRight /> Go to back Home page
        </Link>
        <textarea
          onChange={handleChange}
          className="answer_input"
          placeholder="Your Answer..."
          name="answer"
          id=""
        ></textarea>
        <button className="answer_post_btn" type="submit">
          Post Your Answer
        </button>
      </form>
    </div>
  );
}

export default PostAnswer;
