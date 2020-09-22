import React, { Component } from "react";
import QuestionsDataService from "../service/QuestionsDataService";
import { Accordion, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "./navbar";

class QuestionsListComponent extends Component {
  render() {
    return (
      <div className="container">
        <div className="container">
        <Navbar/>
          <table className="table">
            <thead>
              <tr>
                <th>Questions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.courses.map((course) => (
                <Accordion defaultActiveKey="0" key={course.id}>
                  <Card>
                    <Accordion.Toggle as={course.question.questionId}eventKey="0" variant="link" >
                      {course.question.questionText}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {course.optionList.map((option) => (
                          <div>
                            <input
                              type="radio"
                              name={option.questionId}
                              value={option.id}
                            ></input>
                            <label>{option.optionText} ({option.count})</label>
                          </div>
                        ))}
                        <div align="right">
                          <Button variant="danger" onClick={() => this.deleteQuestionClicked(course.question.id) } > Delete </Button>
                          <Button variant="primary" onClick={() => this.updateQuestionClicked(course.question.id) } > Update </Button>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
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
    this.deleteQuestionClicked = this.deleteQuestionClicked.bind(this);
    this.updateQuestionClicked = this.updateQuestionClicked.bind(this);
  }
  componentDidMount() {
    this.refreshCourses();
  }
  refreshCourses() {
    QuestionsDataService.retrieveAllQuestions() //HARDCODED
      .then((response) => {
        console.log(response);
        this.setState({ courses: response.data });
      });
  }

  deleteQuestionClicked(id) {
    QuestionsDataService.removeQuestion(id).then((response) => {
      console.log(response);
      this.refreshCourses();
    });
  }
  updateQuestionClicked(question){
   
  }

}
export default QuestionsListComponent;
