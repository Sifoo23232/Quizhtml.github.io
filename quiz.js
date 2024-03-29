document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submit');

    // Charger les questions depuis le fichier JSON
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            // Afficher les questions et options de réponse
            data.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
                question.options.forEach(option => {
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = `question${index}`;
                    radioInput.value = option;
                    const optionLabel = document.createElement('label');
                    optionLabel.textContent = option;
                    questionDiv.appendChild(radioInput);
                    questionDiv.appendChild(optionLabel);
                });
                quizContainer.appendChild(questionDiv);
            });
        });

    // Fonction pour vérifier les réponses
    function checkAnswers() {
        const userAnswers = [];
        document.querySelectorAll('.question').forEach((question, index) => {
            const selectedOption = question.querySelector('input:checked');
            if (selectedOption) {
                userAnswers.push(selectedOption.value);
            } else {
                userAnswers.push(null); // Si aucune réponse n'est sélectionnée
            }
        });

        // Comparer les réponses de l'utilisateur avec les bonnes réponses
        fetch('questions.json')
            .then(response => response.json())
            .then(data => {
                let score = 0;
                data.forEach((question, index) => {
                    if (question.answer === userAnswers[index]) {
                        score++;
                    }
                });
                // Afficher le score
                resultContainer.textContent = `Votre score est de ${score}/${data.length}`;
            });
    }

    submitButton.addEventListener('click', checkAnswers);
});
