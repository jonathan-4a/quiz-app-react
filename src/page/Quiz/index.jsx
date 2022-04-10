import React, { useEffect, useCallback } from 'react'

import Choices from 'components/Choices'
import Page from 'components/Page'
import ProgressBar from 'components/ProgressBar'
import QuestionInfo from 'components/QuestionInfo'
import Question from 'components/Question'
import ScoreBar from 'components/ScoreBar'
import { ERROR_QUESTION_FETCH } from 'utils/constants'
import {
  getDifficultyLevel,
  shuffleChoices,
  calculateQuizScore
} from 'utils/quizHelpers'
import { ResponseStyle, ResultStyle, NextButonStyle, Container, Header } from './style'
import useQuiz from 'hooks/useQuiz'
import Spinner from 'components/Spinner'
import SnackBar from 'components/SnackBar'

function Quiz () {
  const {
    quizState,
    answerQuestion,
    initializeQuestion,
    nextQuestion,
    fetchQuestion,
    fetchQuestionsSuccess,
    fetchQuestionsFailure
  } = useQuiz()

  const {
    questions,
    isLoading,
    error,
    category,
    choices,
    indexOfCorrectAnswer,
    questionNumber,
    numberOfIncorrect,
    isCorrect,
    isAnswered,
    difficultyLevel,
    currentScore,
    maximumPotentialScore,
    minimumPotentialScore,
    clearSelection
  } = quizState

  useEffect(() => {
    if (questions.length === 0) {
      fetchQuestion()
      window.fetch('http://localhost:3000/questions')
        .then(res => res.json())
        .then(data => {
          fetchQuestionsSuccess(data)
        }).catch(err => {
          fetchQuestionsFailure(err)
        })
    } else {
      loadQuestion(questions[0])
    }

    // eslint-disable-next-line
  }, [questions.length])

  const handleAnswerSelection = useCallback(answerIndex => {
    const isCurrentAnswerCorrect = answerIndex === indexOfCorrectAnswer
    const numberOfCurrentIncorrectAnswers = isCurrentAnswerCorrect ? numberOfIncorrect : numberOfIncorrect + 1
    const { currentScore, maximumPotentialScore, minimumPotentialScore } =
     calculateQuizScore(questionNumber, numberOfCurrentIncorrectAnswers, questions.length)
    answerQuestion({
      isCorrect: isCurrentAnswerCorrect,
      numberOfIncorrect: numberOfCurrentIncorrectAnswers,
      currentScore,
      maximumPotentialScore,
      minimumPotentialScore,
      isAnswered: true
    })
  }, [
    questions.length,
    numberOfIncorrect,
    indexOfCorrectAnswer,
    questionNumber,
    answerQuestion
  ])

  const loadQuestion = useCallback(questionData => {
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
      category
    } = questionData
    const { choices, indexOfCurrentCorrectAnswer } = shuffleChoices([...incorrectAnswers, correctAnswer], incorrectAnswers.length)

    initializeQuestion({
      choices,
      currentQuestion: questionData.question,
      indexOfCorrectAnswer: indexOfCurrentCorrectAnswer,
      difficultyLevel: getDifficultyLevel(questionData.difficulty.trim()),
      category: decodeURIComponent(category)
    })
  }, [ initializeQuestion ])

  const handleNextQuestion = useCallback(() => {
    if (questionNumber === questions.length - 1) {
      return
    }

    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
      category,
      difficulty,
      question
    } = questions[questionNumber + 1]

    const { choices, indexOfCurrentCorrectAnswer } = shuffleChoices([...incorrectAnswers, correctAnswer], incorrectAnswers.length)

    nextQuestion({
      choices,
      currentQuestion: question,
      indexOfCorrectAnswer: indexOfCurrentCorrectAnswer,
      difficultyLevel: getDifficultyLevel(difficulty.trim()),
      category: decodeURIComponent(category)
    })
  }, [ questions, questionNumber, nextQuestion ])

  const getProgressPercent = useCallback(() => {
    return ((questionNumber + 1) / questions.length) * 100
  }, [questions.length, questionNumber])

  return (
    <Page title='Quiz'>
      <Container flexDirection='column' justifyContent='space-between'>
        {error
          ? <SnackBar open={!!error}>{ERROR_QUESTION_FETCH}</SnackBar>
          : isLoading
            ? <Spinner />
            : questions.length > 0 &&
        <>
          <div>
            <Header>
              <ProgressBar data-testid='progress' percent={getProgressPercent()} backgroundColor='var(--grey-main)' height={15} left={0} />
              <QuestionInfo
                difficultyLevel={difficultyLevel}
                questionCategory={decodeURIComponent(category)}
                questionNumber={questionNumber + 1}
                questionsTotal={questions.length}
              />
            </Header>
            <Question>{decodeURIComponent(questions[questionNumber].question)}</Question>
            <Choices
              choices={choices}
              onAnswerSelection={handleAnswerSelection}
              isAnswered={isAnswered}
              clearSelection={clearSelection}
              indexOfCorrectAnswer={indexOfCorrectAnswer}
            />
            {isAnswered &&
              <ResponseStyle flexDirection='column' alignItems='center' >
                <ResultStyle data-testid='feedback' >{isCorrect ? 'Correct!' : 'Sorry!'}</ResultStyle>
                <NextButonStyle data-testid='next' onClick={handleNextQuestion}>Next Question</NextButonStyle>
              </ResponseStyle>
            }
          </div>
          <div>
            <ScoreBar
              currentScore={currentScore}
              maximumPotentialScore={maximumPotentialScore}
              minimumPotentialScore={minimumPotentialScore}
            />
          </div>
        </>
        }
      </Container>
    </Page>
  )
}

export default Quiz
