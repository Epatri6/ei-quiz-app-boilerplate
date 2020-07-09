'use strict';

/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Which HTML container is semantic?',
      answers: [
        'div',
        'img',
        'span',
        'footer'
      ],
      correctAnswer: 'footer'
    },
    {
      question: 'Which flexbox property spaces elements to opposite sides of the page?',
      answers: [
        'justify-content: space-evenly',
        'justify-content: space-between',
        'justify-content: center',
        'justify-content: flex-start'
      ],
      correctAnswer: 'justify-content: space-between'
    },
    {
      question: 'What is the correct for loop structure to loop through all elements of an array?',
      answers: [
        'for(let i = 0; i <= array.length; i++)',
        'for(let i = 1; i < array.length; i++)',
        'for(let i = 0; i < array.length; i++)',
        'for(let i; i <= array.length; i++)'
      ],
      correctAnswer: 'for(let i = 0; i < array.length; i++)'
    },
    {
      question: 'What is a high order function?',
      answers: [
        'A function that returns a variable',
        'A function that takes in a callback as an argument',
        'An anonymous function',
        'A function that returns an object'
      ],
      correctAnswer: 'A function that takes in a callback as an argument'
    },
    {
      question: 'What is the correct jQuery selector to retrieve a main HTML tag',
      answers: [
        '$(\'main\')',
        '$(main)',
        '${\'main\'}',
        '($\'main\')'
      ],
      correctAnswer: '$(\'main\')'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};
// renderfunction called with every button clicked buy adding html string 
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

//Generates the start screen
function generateStartView() {
  return `
  <div id="start-page">
    <p>The quiz tests your knowledge of the first few weeks of class.</p>
    <button class="start">START</button>
  </div>`;
}

//Generates the question screen
function generateQuestionView() {
  let answers = store.questions[store.questionNumber].answers;
  return `
    <div id="question-page">
    <div id="question-count">Question ${store.questionNumber + 1} of ${store.questions.length}</div>
    <h2 id="question">${store.questions[store.questionNumber].question}</h2>
    <form>
      <ul id="answers">
        <li><input type="radio" name="answer" id="" value="${answers[0]}" checked= "checked"/>${answers[0]}</li>
        <li><input type="radio" name="answer" id="" value="${answers[1]}" checked= "checked"/>${answers[1]}</li>
        <li><input type="radio" name="answer" id="" value="${answers[2]}" checked= "checked"/>${answers[2]}</li>
        <li><input type="radio" name="answer" id="" value="${answers[3]}" checked= "checked"/>${answers[3]}</li>
      </ul>
      <div>
      <p id="count">Score: ${store.score} out of ${store.questions.length}</p>
      <button type="submit" id="submit">submit</button>
      </div>
    </form>
    </div>`;
}

//Generates question review screen
function generateQuestionReviewView(selectedAnswer) {
  let question = store.questions[store.questionNumber];
  let html = `
  <div id="question-page">
  <div id="question-count">Question ${store.questionNumber + 1} of ${store.questions.length}</div>
  <h2 id="question">${question.question}</h2>
  <h3> You got the question ${(question.answer === selectedAnswer) ? 'correct!' : 'wrong!'}</h3>
    <ul id="answers-results">`;
    //For each answer, check if it's right or wrong and highlight it appriorately
  question.answers.forEach(answer => {
    //answer right
    if(answer === question.correctAnswer) {
      html += `<li class="correct-answer">${answer}</li>`;
    }
    //answer wrong and user selected
    else if(answer !== question.correctAnswer && answer === selectedAnswer) {
      html += `<li class="wrong-answer">${answer}</li>`;
    }
    //answer wrong
    else {
      html += `<li>${answer}</li>`;
    }
  });
  html += `

            </ul>
            <div>
            <p id="count">Score: ${store.score} out of ${store.questions.length}</p>
            <button id="next">NEXT QUESTION</button>
            </div>
            </div>`;
  return html;
}

//Generates end screen
function generateEndView() {
  return `  
    <div id="end-quiz">
      <h2>You scored a ${store.score} out of ${store.questions.length}</h2>
      <button class="start">RESTART</button>
    </div>`;
}

/********** RENDER FUNCTION(S) **********/

//Renders the start screen
function renderStartView() {
  $('main').html(generateStartView);
}

//Renders the end screen
function renderEndView() {
  $('main').html(generateEndView);
}

//Renders the question view
function renderQuestionView() {
  $('main').html(generateQuestionView());
}

//Renders the question review view
function renderQuestionReviewView(selectedAnswer) {
  $('main').html(generateQuestionReviewView(selectedAnswer));
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//Switchs to question view for a fresh quiz
function startQuiz() {
  store.questionNumber = 0;
  store.score = 0;
  renderQuestionView();
}

//Submits answer to question, moving to answer review screen
function submitAnswer(event) {
  event.preventDefault();
  //Prevent empty answers
  validateAnswer();
  //Retrieve value of selected radio button
  let answer = findAnswer();
  //Score the answer against the correct answer
  scoreAnswer(answer);
  //Render results
  renderQuestionReviewView('footer');
}

//Switches view to the next question
function nextQuestion() {}

//Set up quiz app
function initialize() {
  $('main').on('click','input', toggleAnswer); 
  $('header h1').text('Course Review Quiz');
  //Starting quiz event
  $('main').on('click', '.start', startQuiz);
  //Submitting answer event
  $('main').on('submit', 'form', submitAnswer);
  //Next question event
  $('main').on('click', '#next', nextQuestion);

  //Render default screen
  renderQuestionView();
}

/********** EVENT HELPER FUNCTIONS **********/
// toggle function
function toggleAnswer(){
  let inputArr = $('input');
  for(let i = 0; i < inputArr.length; i++){
    console.log(inputArr[i].attr('checked', 'false'));
  }
}
//Prevent empty answer submissions
function validateAnswer() {}

//Returns the answer of the selected radio button
function findAnswer() {
  
}

//Checks the answer against the correct answer and updates score
function scoreAnswer(answer) {
  if (answer === store.questions[store.questionNumber].correctAnswer) {
    store.score++;
  }
}

//Initilize quiz when page is loaded
$(initialize);