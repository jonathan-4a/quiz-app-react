export const calculateQuizScore = (questionNumber, numberOfIncorrect, numberOfQuestions) => {
  const numberOfQuestionsAnswered = questionNumber + 1
  const numberOfUnansweredQuestions = numberOfQuestions - numberOfQuestionsAnswered
  const numberOfCorrectAnswers = numberOfQuestionsAnswered - numberOfIncorrect

  const currentScorePercentage = (numberOfCorrectAnswers / numberOfQuestionsAnswered) * 100
  const maximumPotentialScorePercentage = ((numberOfCorrectAnswers + numberOfUnansweredQuestions) / numberOfQuestions) * 100
  const minimumPotentialScorePercentage = (numberOfCorrectAnswers / numberOfQuestions) * 100

  return {
    currentScore: Math.floor(currentScorePercentage),
    maximumPotentialScore: Math.floor(maximumPotentialScorePercentage),
    minimumPotentialScore: Math.floor(minimumPotentialScorePercentage)
  }
}

export const shuffleChoices = (choices, indexOfCorrectAnswer) => {
  const answer = choices[indexOfCorrectAnswer]

  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = choices[i]
    choices[i] = choices[j]
    choices[j] = temp
  }

  const indexOfCurrentCorrectAnswer = choices.indexOf(answer)

  return { choices, indexOfCurrentCorrectAnswer }
}

export const isQuestionOver = (questionNumber, numberOfQuestions) =>
  questionNumber === numberOfQuestions - 1

export const getDifficultyLevel = difficulty => {
  switch (difficulty) {
    case 'easy':
      return 1
    case 'medium':
      return 2
    case 'hard':
      return 3
    default:
      return 1
  }
}
