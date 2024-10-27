document.getElementById('copy').addEventListener('click', () => {
    const shortUrl = document.getElementById('shorturl');

    if (!shortUrl.value) {
        alert('ไม่มีลิงก์ให้คัดลอก');
        return;
    }

    shortUrl.select();
    shortUrl.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(shortUrl.value).then(() => {
        alert('คัดลอกลิงก์เรียบร้อยแล้ว');
    }).catch(err => {
        console.error('ไม่สามารถคัดลอกได้:', err);
        alert('เกิดข้อผิดพลาดในการคัดลอก');
    });
});
