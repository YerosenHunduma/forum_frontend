import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import "./QuestionDetial.css";
import PostAnswer from "../../components/postAnswer/PostAnswer";
import Answer from "../../components/Answer/Answer";
import { UserContext } from "../../Context/Context";

function QuestionDetail() {
  let params = useParams();
  const [userData, setuserData] = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");

  const retrieveQuestionById = async () => {
    try {
      console.log("question id:", params.id);
      const { data } = await axios.get(`/questions/${params.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestion(data.question);
      console.log(question);
      console.log(question.questionid);
    } catch (error) {
      console.log("Error fetching question:", error);
    }
  };

  useEffect(() => {
    try {
      if (!userData.user) {
        navigate("/login");
        return;
      }

      retrieveQuestionById();
    } catch (error) {
      console.log(error);
    }
  }, [userData, params.id, token]);

  useEffect(() => {
    if (question.questionid) {
      answersByQuestionId();
    }
  }, [question]);

  const answersByQuestionId = async () => {
    try {
      console.log(question.questionid);
      const { data } = await axios.get(`/answers/${question.questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setAnswers(data.answers.reverse());
      console.log(answers);
    } catch (error) {
      console.log("Error fetching answers:", error);
    }
  };

  return (
    <div className="container my-5">
      <div>
        <h3>Question</h3>
        <h5>{question.title}</h5>
        <p>{question.description}</p>
      </div>
      <hr />
      <div>{answers.length > 0 && <h3>Answers From The Community</h3>}</div>
      {answers.map((answer) => (
        <div key={answer.answerid}>
          <Answer answer={answer.answer} username={answer.username} />
        </div>
      ))}
      <PostAnswer questionId={question.questionid} />
    </div>
  );
}

export default QuestionDetail;
