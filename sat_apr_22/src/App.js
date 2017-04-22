import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

const questionUrl = 'https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json';

class App extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            answers: [],
            showAnswers: false
        };
        this.renderQuestion = this.renderQuestion.bind(this);
        this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
    }

    componentWillMount() {
        axios.get(questionUrl).then(response => this.setState(
            {questions: response.data}
        ));
    }

    handleQuestionAnswered(question_index, option_index) {
        let answers = this.state.answers;
        answers[question_index] = option_index;
        this.setState({
            answers: answers
        });
    }

    renderQuestion(question, question_index) {
        return (
            <div key={question_index}
                 className="question-container">
                <h3>{question.text}</h3>
                <ul>
                    {question.options.map((option, option_index) => (
                            <li key={option_index}>
                                <input type="radio"
                                       name={question_index}
                                       onClick={() => this.handleQuestionAnswered(question_index, option_index)}
                                />
                                {option}
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    }

    renderAnswer(answered_question_index) {
        const answered_option = this.state.answers[answered_question_index];
        var answered_question = this.state.questions[answered_question_index];
        if (answered_question_index == 'length') {
            return null;
        }

        return (
            <li key={answered_question_index}>
                <div>
                    Q: {answered_question.text}
                </div>
                <div>
                    A: {answered_question.options[answered_option]}
                </div>
            </li>
        );
    }

    renderQuestions() {
        if (!this.state.questions) {
            return null;
        }

        if (this.state.showAnswers) {
            const answered_question_indices = Object.getOwnPropertyNames(this.state.answers);
            return answered_question_indices.map(
                answered_question_index => (
                    <ul>
                        {this.renderAnswer(answered_question_index)}
                    </ul>
                )
            );
        }

        return this.state.questions.map(this.renderQuestion);
    }

    render() {
        return (
            <div className="App">
                <h2>Welcome to today's quiz!</h2>
                <div className="quiz-container">
                    {this.renderQuestions()}
                </div>
                <a href="#" onClick={() => this.setState({showAnswers: true})}>
                    Show Answers
                </a>
            </div>
        );
    }
}

export default App;
