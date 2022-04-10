import { questions } from '../../src/questions.json'
import { calculateQuizScore } from '../../src/utils/quizHelpers'

describe('Quiz Flow', () => {
  it('should be able to go through the entire quiz flow', () => {
    cy.visit('/quiz')
    let questionsAnswered, remainingQuestions, correctAnswersSoFar
    const numberOfQuestions = questions.length
    let numberOfIncorrect = 0
    cy.wrap(questions).each((question, questionNumber) => {
      cy.log('**Assert question title**')
      cy.get('h1').should('contain', `Question ${questionNumber + 1} of ${numberOfQuestions}`)

      cy.log('**Assert progress bar**')
      cy.get('#root').then(($el) => {
        const width = $el.width()
        cy.wrap(width).as('totalWidth')
      })
      cy.get('[data-testid="progress"]').then(($el) => {
        const width = $el.width()
        cy.get('@totalWidth').then((totalWidth) => {
          const widthRatio = Math.round((width / totalWidth) * 100)
          const percentProgress = Math.round((questionNumber + 1) / numberOfQuestions * 100)
          // allow for 3% margin of error
          expect(Math.abs(percentProgress - widthRatio)).to.be.lessThan(3)
        })
      })

      cy.log('**Assert category**')
      cy.get('[data-testid="category"]').should('contain', decodeURIComponent(question.category))

      cy.log('**Assert difficulty rating**')
      const rating = {
        easy: 1,
        medium: 2,
        hard: 3,
      }[question.difficulty]
      cy.get('[data-testid="bold-star"]').should('have.length', rating)

      cy.log('**Assert question text**')
      cy.get('[data-testid="question"]').should('contain', decodeURIComponent(question.question))

      cy.log('**Assert number of choices**')
      const numChoices = question.type === 'multiple' ? 4 : 2
      cy.get('[data-testid^="choice"]').should('have.length', numChoices)
      const choices = [...question.incorrect_answers, question.correct_answer].map((choice) => decodeURIComponent(choice))

      cy.log('**Assert all choices are shown**')
      const displayedChoices = []
      cy.get('[data-testid^="choice"]').each(($el) => {
        displayedChoices.push($el.text())
      }).then(() => {
        expect(displayedChoices).to.have.members(choices)
      })

      cy.log('**Assert all choices have grey background, black text, and black border**')
      cy.get('[data-testid^="choice"]')
        .should('have.css', 'background-color', 'rgb(204, 204, 204)')
        .and('have.css', 'color', 'rgb(0, 0, 0)')
        .and('have.css', 'border-color', 'rgb(0, 0, 0)')

      cy.log('**Assert next button is nonexistent**')
      cy.get('[data-testid="next"]').should('not.exist')

      cy.log('**click on random choice**')
      const randomIndex = Math.floor(Math.random() * numChoices) + 1
      cy.get(`[data-testid="choice-${randomIndex}"]`)
        .click()
        .then($el => {
          const choiceText = $el.text()
          const correctAnswer = decodeURIComponent(question.correct_answer)
          cy.wrap(choiceText === correctAnswer).as('isCorrect')
          if (choiceText !== correctAnswer) {
            numberOfIncorrect += 1
          }
          const { currentScore, maximumPotentialScore, minimumPotentialScore } = calculateQuizScore(questionNumber, numberOfIncorrect, numberOfQuestions)
          questionsAnswered = questionNumber + 1
          remainingQuestions = numberOfQuestions - questionsAnswered
          correctAnswersSoFar = questionsAnswered - numberOfIncorrect
          cy.wrap(currentScore).as('currentScore')
          cy.wrap(maximumPotentialScore).as('maximumPotentialScore')
          cy.wrap(minimumPotentialScore).as('minimumPotentialScore')
        })

      cy.log('**Assert feedback text**')
      cy.get('@isCorrect').then((isCorrect) => {
        cy.get('[data-testid="feedback"]').should('contain', isCorrect ? 'Correct!' : 'Sorry!')
      })

      cy.log('**Assert next button is visible**')
      cy.get('[data-testid="next"]')
        .should('be.visible')
        .and('contain', 'Next Question')

      cy.log('**Assert choice has black background and white text**')
      cy.get(`[data-testid="choice-${randomIndex}"]`)
        .should('have.css', 'background-color', 'rgb(0, 0, 0)')
        .and('have.css', 'color', 'rgb(255, 255, 255)')

      cy.log('**Assert all other choices have grey background**')
      Array(numChoices).fill().forEach((_, index) => {
        if (index + 1 !== randomIndex) {
          const selector = `[data-testid="choice-${index + 1}"]`
          let isCorrectAnswer = false
          cy.get(selector).then(($el) => {
            const text = $el.text()
            const correctAnswer = decodeURIComponent(question.correct_answer)
            if (text === correctAnswer) {
              isCorrectAnswer = true
            }
          }).then(() => {
            cy.log('**Correct answer if not selected should have white background**')
            cy.log('**Incorrect answer if not selected should have grey background**')
            cy.get(selector)
              .should('have.css', 'background-color', isCorrectAnswer ? 'rgb(255, 255, 255)' : 'rgb(204, 204, 204)')
          })
        }
      })

      cy.log('**Assert score widths**')
      cy.get('[data-testid="min-score"]').then(($el) => {
        const minScoreWidth = $el.width()
        cy.get('[data-testid="current-score"]').then(($el) => {
          const currentScoreWidth = $el.width()
          cy.get('[data-testid="max-score"]').then(($el) => {
            const maxScoreWidth = $el.width()
            cy.get('[data-testid="full-score"]').then(($el) => {
              const fullScoreWidth = $el.width()
              const worstScoreRatio = parseInt(minScoreWidth / fullScoreWidth * 100)
              const currentScoreRatio = parseInt(currentScoreWidth  / fullScoreWidth * 100)
              const bestScoreRatio = parseInt(maxScoreWidth  / fullScoreWidth * 100)
              cy.get('@minimumPotentialScore').then((minimumPotentialScore) => {
                // allow for 3% margin of error
                expect(Math.abs(worstScoreRatio - minimumPotentialScore)).to.be.lessThan(3)
              })
              cy.get('@currentScore').then((currentScore) => {
                // allow for 3% margin of error
                expect(Math.abs(currentScoreRatio - currentScore)).to.be.lessThan(3)
              })
              cy.get('@maximumPotentialScore').then((maximumPotentialScore) => {
                // allow for 3% margin of error
                expect(Math.abs(bestScoreRatio - maximumPotentialScore)).to.be.lessThan(3)
              })
            })
          })
        })
      })

      cy.log('**Assert score texts**')
      cy.get('@currentScore').then((currentScore) => {
        cy.get('[data-testid="current-score-val"]').should('contain', `Score: ${currentScore}%`)
      })
      cy.get('@maximumPotentialScore').then((maximumPotentialScore) => {
        cy.get('[data-testid="max-score-val"]').should('contain', `Max Score: ${maximumPotentialScore}%`)
      })

      cy.log('**Got to next question**')
      cy.get('[data-testid="next"]').click()
    })
  })
})