const questions=[
    {
        question: "You listed old bicycle for 3000rupees. A buyer calls, saying he works in the military, and sends a QR code on WhatsApp. He says: Scan this QR code and enter your UPI PIN to accept the 3000rupees Payment.",
        answers:[
            { text:"A) Scan the QR code and enter the UPI PIN immediately.",correct:false},
            { text:"B) Refuse to enter the PIN ",correct:true},
            { text:"C) Share your OTP with him over the phone instead.",correct:false},
        ]
    },
    {
        question: "You receive an SMS:Dear customer  , your electricity connection will be disconnected tonight at 9:30 PM due to an updated bill. Call officier immediately at 98xxxxxxx or click link to pay.",
        answers:[
            { text:"A) Click the link in the message and enter your credit/debit card details.",correct:false},
            { text:"B) Call the unknown mobile number immediately out of panic. ",correct:false},
            { text:"C) Ignore the SMS and check your bill on the official state electricity website",correct:true},
        ]
    },
    {
        question: "You ordered a parcel online, but it is delayed. You search Google for customer   support, find a number, and call it. The executive says: To track your parcel, download 'AnyDesk' app on your phone so i can assist you.",
        answers:[
            { text:"A) Download the app and share the 9-digit code with the caller.",correct:false},
            { text:"B) Hang up immediately- customer care never asks to download screen-sharing apps.  ",correct:true},
            { text:"C) Give them your netbanking password over the call instead.",correct:false},
        ]
    },
    {
        question: "An Unknown person reach you on WhatsApp offers you part-time job with no any interview. He say click on apply get big package.",
        answers:[
            { text:"A) Apply on Click.",correct:false},
            { text:"B) Send him resume.",correct:false},
            { text:"C) Block this unknowkn person from your WhatsApp chat.",correct:true},
        ]
    },{
        question:"Join in Unauthorized local investement funds. They say Join our investment fund, get high return on your mortage. for Regisitration they demand several money.",
        answers:[
            { text:"A) Join Unauthorized investemnet fund without reading terms and condition.",correct:false},
            { text:"B) Read terms and conditions and don't join investment fund.",correct:true},
            { text:"C) Give them money they demand for registration in unauthorized investment fund.",correct:false},
        ]

    }
];

const answerButtons = document.getElementById("answer-buttons"); 
const questionElement = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const cyberFact= document.getElementById("Fact");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState(); 
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect= selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    const storedUserName= localStorage.getItem('quizUserName') || "User";
   
    questionElement.innerHTML= `${storedUserName} scored ${score} out of ${questions.length}!`;
    cyberFact.innerHTML="Cyber Fact:- National cyber crime helpline number: 1930";
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }


}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();


    }else{
        startQuiz();
    }
});
startQuiz();

