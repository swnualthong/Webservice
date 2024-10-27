document.getElementById('generate').addEventListener('click', () => {
    const inputText = document.getElementById('textinput').value;

    if (!inputText) {
        alert('กรุณากรอกข้อความหรือลิงก์');
        return;
    }

    const qrCodeDiv = document.getElementById('qrcode');
    qrCodeDiv.innerHTML = "";

    const containerWidth = qrCodeDiv.parentElement.offsetWidth;

    new QRCode(qrCodeDiv, {
        text: inputText,
        width: containerWidth,
        height: containerWidth
    });
});