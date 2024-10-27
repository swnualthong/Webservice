document.getElementById('shorten').addEventListener('click', () => {
    let longUrl = document.getElementById('longurl').value;

    if (!longUrl) {
        alert('กรุณากรอก URL ที่ต้องการย่อก่อน');
        return;
    }

    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
        longUrl = 'https://' + longUrl;
    }

    const encodedUrl = encodeURIComponent(longUrl);

    fetch('https://api.rebrandly.com/v1/links', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': '9179b75294d44933a4c5e52074f7a36c'
        },
        body: JSON.stringify({
            destination: decodeURIComponent(encodedUrl),
            domain: { fullName: "rebrand.ly" }
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.shortUrl) {
            document.getElementById('shorturl').value = "https://" + data.shortUrl;
        } else {
            alert('ไม่สามารถย่อลิงก์ได้');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการย่อลิงก์');
    });
});
