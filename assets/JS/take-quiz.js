let currentQuestionIndex = 0;
let quizData = [];
let userAnswers = [];

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function showQuestion(index) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    if (index >= 0 && index < quizData.length) {
        const question = quizData[index];

        const questionElement = document.createElement('div');
        questionElement.classList.add('question-item');
        questionElement.innerHTML = `
            <h3>Question ${index + 1}</h3>
            <h4>${question.questionText}</h4>
            ${question.answerOptions.map((option, i) => `
                <label>
                    <input type="button" id="answerOption${i}" name="question${index}" value="${option}" required>
                </label>
            `).join('')}
        `;

        quizContainer.appendChild(questionElement);
        // if (userAnswers[index] !== undefined) {
        //     document.querySelector(`input[name="question${index}"][value="${userAnswers[index]}"]`).checked = true;
        // }
        question.answerOptions.forEach((option, i) => {
            const button = document.getElementById(`answerOption${i}`);
            button.addEventListener('click', () => {
                userAnswers[index] = option;
                // Visually indicate the selected button
                document.querySelectorAll(`input[name="question${index}"]`).forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
            });
        });

        // Highlight the previously selected answer if it exists
        if (userAnswers[index] !== undefined) {
            const selectedButton = Array.from(document.querySelectorAll(`input[name="question${index}"]`))
                .find(btn => btn.value === userAnswers[index]);
            if (selectedButton) {
                selectedButton.classList.add('selected');
            }
        }
    }
    document.getElementById('prev-question').disabled = index === 0;
    document.getElementById('next-question').style.display = index === quizData.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-quiz').style.display = index === quizData.length - 1 ? 'inline-block' : 'none';
}


document.addEventListener('DOMContentLoaded', function() {
    const quizId = getQueryParam('id');
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    quizData = quizzes[quizId] || [];

    if (quizData.length > 0) {
        userAnswers = Array(quizData.length).fill(undefined);
        showQuestion(currentQuestionIndex);
    } else {
        document.getElementById('quiz-container').innerHTML = '<p>Quiz not found!</p>';
    }

    document.getElementById('prev-question').addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    document.getElementById('next-question').addEventListener('click', function() {
        if (userAnswers[currentQuestionIndex] !== undefined) {
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            }
        } else {
            alert('Please select an answer before proceeding.');
        }
    });

    document.getElementById('submit-quiz').addEventListener('click', function() {
        if (userAnswers[currentQuestionIndex] !== undefined) {
            let score = 0;
            quizData.forEach((question, index) => {
                if (userAnswers[index] === question.correctAnswer) {
                    score++;
                }
            });

            alert(`You scored ${score} out of ${quizData.length}`);

            const scores = JSON.parse(localStorage.getItem('scores')) || {};
            if (!scores[quizId]) {
                scores[quizId] = [];
            }

            const participantName = prompt("Enter your name:");
            scores[quizId].push({ name: participantName, score: score });
            localStorage.setItem('scores', JSON.stringify(scores));

            window.location.href = 'thank-you.html'; 
        } else {
            alert('Please select an answer before submitting.');
        }
    });
});
