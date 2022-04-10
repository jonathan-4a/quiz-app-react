export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const NEXT_QUESTION = 'NEXT_QUESTION'
export const INITIALIZE_QUESTION = 'INITIALIZE_QUESTION'
export const FETCH_QUESTIONS_START = 'FETCH_QUESTIONS_START'
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS'
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE'

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ANSWER_QUESTION:
      return {
        ...state,
        isCorrect: payload.isCorrect,
        numberOfIncorrect: payload.numberOfIncorrect,
        currentScore: payload.currentScore,
        maximumPotentialScore: payload.maximumPotentialScore,
        minimumPotentialScore: payload.minimumPotentialScore,
        isAnswered: payload.isAnswered,
        clearSelection: false
      }
    case NEXT_QUESTION:
      return {
        ...state,
        choices: payload.choices,
        currentQuestion: payload.currentQuestion,
        indexOfCorrectAnswer: payload.indexOfCorrectAnswer,
        difficultyLevel: payload.difficultyLevel,
        category: payload.category,
        questionNumber: state.questionNumber + 1,
        isAnswered: false,
        clearSelection: true
      }
    case INITIALIZE_QUESTION:
      return {
        ...state,
        choices: payload.choices,
        currentQuestion: payload.currentQuestion,
        indexOfCorrectAnswer: payload.indexOfCorrectAnswer,
        difficultyLevel: payload.difficultyLevel,
        category: payload.category,
        isAnswered: false
      }
    case FETCH_QUESTIONS_START:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: payload.questions
      }
    case FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload.error
      }

    default:
      return state
  }
}
