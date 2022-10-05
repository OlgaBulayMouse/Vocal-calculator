const circleButton = document.querySelector('.circle-button');

const list = document.querySelector('.list');

circleButton.addEventListener('click', runSpeechRecognition);

function runSpeechRecognition() {
    const recognition = new webkitSpeechRecognition();

    recognition.onstart = function () {
        circleButton.innerHTML = '<p>Listening...</p>';
        circleButton.classList.add('listening');
        recognition.stop();
    };

    recognition.onspeechend = function () {
        circleButton.innerHTML = '<p>Tap to speak</p>';
        circleButton.classList.remove('listening');
        recognition.stop();
    };

    recognition.onresult = function (event) {
        console.log(event);
        const transcript = event.results[0][0].transcript;

        try {
            let result = eval(transcript)
            list.innerHTML = `<li>${transcript} = ${result}</li>` + list.innerHTML;
        } catch (error) {
            console.log(error);
            alert(`the expression: '${transcript}' could not be evaluted. Perhabs is not the mathematical expression`);
        };
    };

    recognition.start();
};