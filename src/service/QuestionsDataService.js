import axios from 'axios'
const BASE_URL = 'http://localhost:9090'

class QuestionsDataService {
    retrieveAllQuestions() {
        return axios.get(`${BASE_URL}/getAllQuestions`);
    }
    retrieveUnansweredQuestions(username) {
        return axios.get(`${BASE_URL}/getUnAnsweredQuestionsByUser/${username}`);
    }
    removeQuestion(questionId){
        return axios.delete(`${BASE_URL}/deleteQuestion/${questionId}`);
    }
    addQuestion(question){
        return axios.post(`${BASE_URL}/createQuestion`,question);
    }
    login(user){
        return axios.post(`${BASE_URL}/login`,user).catch(function(error){
            return "fail"
        });
    }
    answer(answer){
        return axios.post(`${BASE_URL}/answerQuestion`,answer);
    }
}
export default new QuestionsDataService()