let countdown;
const alarmSound = document.getElementById('alarmSound');

document.getElementById('generate').addEventListener('click', function() {
    const hourInput = document.getElementById('hourInput');
    const minuteInput = document.getElementById('minuteInput');
    const secondInput = document.getElementById('secondInput');

    const hour = parseInt(hourInput.value) || 0;
    const minute = parseInt(minuteInput.value) || 0;
    const second = parseInt(secondInput.value) || 0;

    if (this.innerText == "Start") {

        const totalMilliseconds = (hour * 3600 + minute * 60 + second) * 1000;
        if (totalMilliseconds <= 0) {
            alert("กรุณาใส่เวลา");
            return;
        }

        startCountdown(totalMilliseconds);
    } else if (this.innerText == "Clear") {
        clearCountdown();
    } else if (this.innerText == "Stop") {
        stopAlarm();
    }
});

function startCountdown(totalMilliseconds) {
    clearInterval(countdown);

    const endTime = Date.now() + totalMilliseconds;
    countdown = setInterval(() => {
        const remainingTime = endTime - Date.now();
        
        if (remainingTime <= 0) {
            clearInterval(countdown);
            playAlarm();
            document.getElementById('generate').innerText = "Stop";
            document.getElementById('countdownDisplay').innerText = "00:00:00:000";
            setInputsEnabled(false);
        } else {
            
            const secondsLeft = Math.floor(remainingTime / 1000);
            const millisecondsLeft = remainingTime % 1000;

            const hours = Math.floor(secondsLeft / 3600);
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;

            document.getElementById('countdownDisplay').innerText = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millisecondsLeft).padStart(3, '0')}`;
        }
    }, 100);
    
    document.getElementById('generate').innerText = "Clear";
    
    document.getElementById('hourInput').value = '';
    document.getElementById('minuteInput').value = '';
    document.getElementById('secondInput').value = '';

    setInputsEnabled(false);
}

function clearCountdown() {
    clearInterval(countdown);
    document.getElementById('countdownDisplay').innerText = "00:00:00:000";
    document.getElementById('generate').innerText = "Start";
    alarmSound.pause();
    alarmSound.currentTime = 0;
    setInputsEnabled(true);
}

function playAlarm() {
    alarmSound.loop = true;
    alarmSound.play();
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    clearCountdown();
    setInputsEnabled(true);
}

function setInputsEnabled(enabled) {
    document.getElementById('hourInput').disabled = !enabled;
    document.getElementById('minuteInput').disabled = !enabled;
    document.getElementById('secondInput').disabled = !enabled;
}
