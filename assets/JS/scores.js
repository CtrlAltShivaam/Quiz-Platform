document.addEventListener('DOMContentLoaded', function() {
    const scores = JSON.parse(localStorage.getItem('scores')) || {};
    const quizId = prompt("Enter the Quiz ID:");

    if (scores[quizId] && scores[quizId].length > 0) {
        const tbody = document.querySelector('#scores-table tbody');
        scores[quizId].forEach(scoreEntry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${scoreEntry.name}</td>
                <td>${scoreEntry.score}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        alert('No scores found for this quiz!');
    }
});
  