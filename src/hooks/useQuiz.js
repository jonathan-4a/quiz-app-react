import { useReducer } from 'react'

import {
  ANSWER_QUESTION,
  NEXT_QUESTION,
  INITIALIZE_QUESTION,
  FETCH_QUESTIONS_START,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  reducer
} from '../reducers/quizReducer'

const useQuiz = () => {
  const [quizState, dispatch] = useReducer(reducer, {
    questions: [],
    currentQuestion: {quesition: '', difficultyLevel: 0, choices:[], correctAnswerIndex:-1, category:''}, 
    maximumPotentialScore: 100,
    questionNumber: 0, // question number
    minimumPotentialScore: 0,
    currentScore: 0,
    numberOfIncorrect: 0,
    clearSelection: false,
    isLoading: false,
    isCorrect: false,
    isAnswered: false,
    error: null
  })

  const answerQuestion = ({
    isCorrect,
    numberOfIncorrect,
    currentScore,
    maximumPotentialScore,
    minimumPotentialScore,
    isAnswered
  }) => {
    dispatch({
      type: ANSWER_QUESTION,
      payload: {
        isCorrect,
        numberOfIncorrect,
        currentScore,
        maximumPotentialScore,
        minimumPotentialScore,
        isAnswered
      }
    })
  }

  const initializeQuestion = ({
    choices,
    currentQuestion,
    indexOfCorrectAnswer,
    difficultyLevel,
    category
  }) => {
    dispatch({
      type: INITIALIZE_QUESTION,
      payload: {
        choices,
        currentQuestion,
        indexOfCorrectAnswer,
        difficultyLevel,
        category
      }
    })
  }

  const nextQuestion = ({
    choices,
    currentQuestion,
    indexOfCorrectAnswer,
    difficultyLevel,
    category
  }) => {
    dispatch({
      type: NEXT_QUESTION,
      payload: {
        choices,
        currentQuestion,
        indexOfCorrectAnswer,
        difficultyLevel,
        category
      }
    })
  }

  const fetchQuestion = () => dispatch({ type: FETCH_QUESTIONS_START })

  const fetchQuestionsSuccess = questions =>
    dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: { questions } })

  const fetchQuestionsFailure = error =>
    dispatch({ type: FETCH_QUESTIONS_FAILURE, payload: { error } })

  return {
    quizState,
    answerQuestion,
    initializeQuestion,
    nextQuestion,
    fetchQuestion,
    fetchQuestionsSuccess,
    fetchQuestionsFailure
  }
}

export default useQuiz
