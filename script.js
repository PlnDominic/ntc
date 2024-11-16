document.getElementById('generateQR').addEventListener('click', () => {
    const fileInput = document.getElementById('pdfUpload');
    const file = fileInput.files[0];
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';
    const downloadLink = document.getElementById('downloadLink');
    const generateButton = document.getElementById('generateQR');

    if (file) {
        if (file.type !== 'application/pdf') {
            errorMessage.textContent = 'Please upload a valid PDF file.';
            return;
        }

        generateButton.disabled = true;
        const url = URL.createObjectURL(file);
        const displayPageUrl = `displayPdf.html?file=${encodeURIComponent(url)}`;
        const qr = qrcode(10, 'L');
        qr.addData(displayPageUrl);
        qr.make();
        const qrImage = qr.createImgTag();
        document.getElementById('qrCode').innerHTML = qrImage;

        const imgElement = document.querySelector('#qrCode img');
        downloadLink.href = imgElement.src;
        downloadLink.download = 'qrcode.png';
        downloadLink.style.display = 'block';

        generateButton.disabled = false;
    } else {
        errorMessage.textContent = 'Please upload a PDF file to generate a QR code.';
    }
});