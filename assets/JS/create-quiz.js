let questionCount = 1;

document.getElementById('add-question').addEventListener('click', function() {
    questionCount++;
    
    const questionContainer = document.getElementById('question-container');
    const questionItem = document.createElement('div');
    questionItem.classList.add('question-item');
    
    questionItem.innerHTML = `
        <label>Question ${questionCount}</label>
        <input type="text" class="question-text" placeholder="Enter your question" required>
        
        <label>Answer Options</label>
        <input type="text" class="answer-option" placeholder="Option 1" required>
        <input type="text" class="answer-option" placeholder="Option 2" required>
        <input type="text" class="answer-option" placeholder="Option 3" required>
        <input type="text" class="answer-option" placeholder="Option 4" required>
        
        <label>Correct Answer</label>
        <input type="number" class="correct-answer" placeholder="Correct option number (1-4)" required>
        <hr>
    `;
    
    questionContainer.appendChild(questionItem);
});

document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const questions = [];
    
    document.querySelectorAll('.question-item').forEach(function(item) {
        const questionText = item.querySelector('.question-text').value;
        const answerOptions = Array.from(item.querySelectorAll('.answer-option')).map(input => input.value);
        const correctAnswer = parseInt(item.querySelector('.correct-answer').value);
        
        questions.push({ questionText, answerOptions, correctAnswer });
    });
    
    const quizId = `quiz_${Date.now()}`;
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    quizzes[quizId] = questions;
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    const shareableLink = `${window.location.origin}/take-quiz.html?id=${quizId}`;
    alert('Quiz saved successfully! click okay to play or copy this text to another window : '+ shareableLink);
    window.location=`${shareableLink}`;
});
