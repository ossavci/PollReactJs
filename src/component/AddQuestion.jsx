import React, { Component } from "react";
import { Formik,Form,Field } from "formik";
import QuestionsDataService from "../service/QuestionsDataService";
import AddMulti from "./AddMulti";
import Navbar from "./navbar";

class AddQuestion extends Component {

    onSubmit(values) {
        console.log(values);
        var question = { questionText : values.question}
       
        console.log(values);
        console.log(this.state.optionList);
        // this.addQuestionClicked(quest);
    };

    render() {
        
        let { question, optionList } = this.state

      return (
        <div>
            <Navbar/>
            <h3>Questions</h3>
            <div className="container">
                <Formik  initialValues= {question = '',optionList={}}  onSubmit={this.onSubmit}>
                    {
                        (props) => (
                            <Form>
                                <AddMulti name= "optionList" functionCallFromParent={this.onSubmit.bind(this)}/>
                              
                            </Form>
                        )
                    }
                </Formik>
                
                <div>
            </div>
            </div>
        </div>
      );
    }

    constructor(props) {
        super(props)
        this.state = {
            question: "",
            optionList: {}
        }
        this.addQuestionClicked = this.addQuestionClicked.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    addQuestionClicked(question) {
        QuestionsDataService.addQuestion(question).then((response) => {
          console.log(response);
        });
      };

  }


  

  
export default AddQuestion;
