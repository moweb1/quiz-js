//Getting references to elements
const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const answerButtons = document.getElementsByClassName('answer-button')
const startInstruction = document.getElementById('start-instruction')
let questionText = document.getElementById('question-text')

//Defining main computational variables
let firstNumber = 0
let secondNumber = 0
const operations = ['add','subtract','multiply']
let operation = '';
let result = 0
let correctIndex = 0

//Setting up click listeners on the buttons
startButton.addEventListener('click',startQuiz)
nextButton.addEventListener('click',nextQuestion)
Array.prototype.forEach.call(answerButtons,button => {
    button.addEventListener('click',processAnswerButtonClick)
});

function startQuiz() {
    //Hide start button
    startButton.classList.add('hidden')
    //Load next question
    nextQuestion()
}

function nextQuestion() {
    //Choose a random operation from the operations array
    var opIndex = Math.round(Math.random()*(operations.length-1))
    operation = operations[opIndex]
    var opText
    //Choose the operand values randomly
    firstNumber = Math.round(Math.random()*13)
    secondNumber = Math.round(Math.random()*13)
    //Parse the operation and compute the result
    switch (operation) {
        case 'add':
            opText = "plus"
            result = firstNumber+secondNumber
            break
        case 'subtract':
            opText = "minus"
            result = firstNumber-secondNumber
            break
        case 'multiply':
            opText = "multiplied by"
            result = firstNumber*secondNumber
            break
        default:
            console.log("Error: operation '" + operation + "' is undefined")
            return
    }
    result = Math.round(result)
    //Choose random location for the correct answer
    correctIndex = Math.round(Math.random()*(answerButtons.length-1))
    //Hide control buttons and reset answer choices
    startButton.classList.add('hidden')
    nextButton.classList.add('hidden')
    resetAnswerButtons()
    //Hide instruction text
    startInstruction.classList.add('hidden')
    //Set question text and answer button labels
    questionText.innerText = "What is " + firstNumber + " " + opText + " " + secondNumber + "?"
    for (var i=0; i<answerButtons.length; i++) {
        if (i==correctIndex) {
            answerButtons[i].innerText = String(result)
        } else {
            //Populate other answer buttons with random non-repetitive numbers
            for (var j=0; j<1000; j++) {
                var end = true
                var number
                if (Math.abs(result)>=2) {
                    number = Math.round((Math.random()-0.5)*result*2)
                } else {
                    number = Math.round((Math.random()-0.5)*4)
                }
                if (number==result) {
                    end = false
                    continue
                }
                for (var k=0; k<i; k++) {
                    if (number==answerButtons[k].innerText) {
                        end = false
                        break
                    } 
                }
                if (end) {
                    answerButtons[i].innerText = number
                    break
                }
            }
        }
    }
}

function processAnswerButtonClick(clickEvent) {
    resetAnswerButtons()
    //Change clicked button's correct/wrong status classes
    const button = clickEvent.target
    if (button.innerText === String(result)) {
        button.classList.add('correct')
        startInstruction.innerText = "Correct!"
        startInstruction.classList.remove('hidden')
    } else {
        button.classList.add('wrong')
        answerButtons.item(correctIndex).classList.add('correct')
        startInstruction.innerText = "That's not quite right but that's okay!\nThe right answer's highlighted in green."
        startInstruction.classList.remove('hidden')
    }
    nextButton.classList.remove('hidden')
}

function resetAnswerButtons() {
    Array.prototype.forEach.call(answerButtons,button => {
        button.classList.remove('hidden')
        button.classList.remove('wrong')
        button.classList.remove('correct')
    });
}