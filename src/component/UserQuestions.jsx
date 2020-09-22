import React, { Component } from "react";
import QuestionsDataService from "../service/QuestionsDataService";
import { Accordion, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class UserQuestions extends Component {
  render() {
    return (
      <div className="container">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>USER PAGE</th>
              </tr>
            </thead>
            <tbody>
              
              {this.state.courses.map((course) => (
                <Card className="p-3">
                  <Card.Title>{course.question.questionText}</Card.Title>
                  <Card.Body>
                    {course.optionList.map((option) => (
                      <div onChange={this.onChangeValue}>
                        <input
                          type="radio"
                          name={option.questionId}
                          value={option.id}
                        ></input>
                        <label>
                          {option.optionText} 
                        </label>
                      </div>
                    ))}
                    <div align="right">
                      <Button
                        variant="success"
                        onClick={() =>
                          this.answerQuestionClicked(
                            course.question.id,
                            this.state.selectedOption
                          )
                        }
                      >
                        {" "}
                        Answer{" "}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      message: null,
    };
    this.refreshCourses = this.refreshCourses.bind(this);
    this.answerQuestionClicked = this.answerQuestionClicked.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  componentDidMount() {
    this.refreshCourses();
  }
  refreshCourses() {
    if (window.user == null) {
      this.props.history.push("/Login");
      return;
    }
    QuestionsDataService.retrieveUnansweredQuestions(window.user.userId).then(
      (response) => {
        console.log(response);
        this.setState({ courses: response.data });
      }
    );
  }

  answerQuestionClicked(questionId, optionId) {
    var answer = {
      optionId: optionId,
      questionId: questionId,
      userId: window.user.userId,
    };
    QuestionsDataService.answer(answer).then((response) => {
      console.log(response);
      this.refreshCourses();
    });
  }

  onChangeValue(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }
}
export default UserQuestions;
