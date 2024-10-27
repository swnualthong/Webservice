document.getElementById('save').addEventListener('click', () => {
    const qrCodeDiv = document.getElementById('qrcode').querySelector('img');

    if (!qrCodeDiv) {
        alert('ยังไม่มี QR Code ที่จะบันทึก');
        return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        link.click();
    };

    img.src = qrCodeDiv.src;
});
