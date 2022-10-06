const circleButton = document.querySelector('.circle-button');

const list = document.querySelector('.list');

circleButton.addEventListener('click', runSpeechRecognition);

function runSpeechRecognition() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ru-RU';

    recognition.onstart = function () {
        circleButton.innerHTML = '<p>Слушаю...</p>';
        circleButton.classList.add('listening');
        recognition.stop();
    };

    recognition.onspeechend = function () {
        circleButton.innerHTML = '<p>Нажми меня, я буду слушать</p>';
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
            alert(`Выражение: '${transcript}' не является математическим выражением. Можно использовать только числовые выражения`);
        };
    };

    recognition.start();
};