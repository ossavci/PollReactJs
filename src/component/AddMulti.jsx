import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Formik,Form,Field } from "formik";
import {InputGroup,FormControl} from 'react-bootstrap'
import QuestionsDataService from "../service/QuestionsDataService";

class AddMulti extends Component {
    constructor(props) {
      super(props);
      this.state = {
          question: {questionText : ""},
          optionList: [{optionText: ""}]
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addQuestionClicked = this.addQuestionClicked.bind(this);
    }
    
    addClick(){
      this.setState(prevState => ({ 
          optionList: [...prevState.optionList, { optionText: "" }]
      }))
    }

    
    createUI(){
       return this.state.optionList.map((el, i) => (
           
           <div className = "ui action input" key={i}>
           
              {/* <input placeholder="" name="optionText" value={el.optionText ||''} onChange={this.handleChange.bind(this, i)} /> */}
              {/* <Field className="form-control" type="text" name="optionText" value={el.optionText ||''} onChange={this.handleChange.bind(this, i)}/> */}
              {/* <Button variant="danger" onClick={this.removeClick.bind(this, i)}>X</Button> */}

              <InputGroup className="mb-3">
                <FormControl
                    placeholder="Option "
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    type="text" name="optionText" value={el.optionText ||''} onChange={this.handleChange.bind(this, i)}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={this.removeClick.bind(this, i)}>X</Button>
                </InputGroup.Append>
            </InputGroup>
              
         </div>       

       ))
    }
    
    handleChange(i, e) {
         const { name, value } = e.target;
       let optionList = [...this.state.optionList];
       optionList[i] = {...optionList[i], [name]: value};
       this.setState({ optionList });

    }

    handleChangeQuestion(e) {
        const { name, value } = e.target;
      let question = this.state.questionText;
      question = {question, [name]: value};
      this.setState({ question });

   }
    
    removeClick(i){
       let optionList = [...this.state.optionList];
       optionList.splice(i, 1);
       this.setState({ optionList });
    }
    
    handleSubmit(event) {
      console.log(event.question);
      event.preventDefault();
      this.addQuestionClicked(this.state);
    
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>

        <fieldset className="form-group">
                                    <label>Question :</label>
                                    <Field className="form-control" type="text"  name="questionText"  onChange={this.handleChangeQuestion.bind(this)} />
                                </fieldset>
                                <label>Options :</label>
            {this.createUI()}        
            <Button variant="warning" onClick={this.addClick.bind(this)} >Add Option</Button>{' '}
            <button className="btn btn-success" type="submit">Save</button>
        </form>
      );
    }

    addQuestionClicked(question) {
        QuestionsDataService.addQuestion(question).then((response) => {
          console.log(response);
        });
      };
  }
  
  
  export default AddMulti;
