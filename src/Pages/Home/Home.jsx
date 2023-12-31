import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import Question from "../../components/Question/Question";
import "./Home.css";
import axios from "../../axios";

function Home() {
  const [userData, setuserData] = useContext(UserContext);

  const [allQuestions, setAllQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  console.log(userData);

  const Questions = async () => {
    try {
      const { data } = await axios.get("/questions/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setAllQuestions(data.questions);
    } catch (error) {
      console.log("problem", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData.user) {
          navigate("/login");
          return;
        }

        await Questions();
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData, navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/questions/ask");
  };

  useEffect(() => {
    const filtered = allQuestions.filter((question) =>
      question.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [allQuestions, search]);

  return (
    <>
      <div className="home container my-5 home-container">
        <div className="head mb-5 justify-content-between">
          <button className="ask_button" onClick={handleClick}>
            Ask Question
          </button>
          <h2 className="wellcome d-flex ">
            Welcome :<span className="username">{userData.user?.username}</span>
          </h2>
        </div>
        <h3>Questions</h3>
        <div className="inputField d-flex align-items-center justify-space-between">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search question...."
          />
        </div>
        <div>
          {filteredQuestions.map((question) => (
            <div key={question.id}>
              <hr />
              <Link
                to={`questions/${question.questionid}`}
                className="text-decoration-none text-reset"
              >
                <Question
                  question={question.title}
                  username={question.username}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
