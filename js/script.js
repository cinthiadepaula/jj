let img, imgX = 0, imgY = 0, dragging = false;

document.getElementById('imageInput').addEventListener('change', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const file = this.files[0];
    const reader = new FileReader();
    const watermark = new Image();

    watermark.src = 'assets/marca_dagua3.png';

    reader.onload = function(e) {
        img = new Image();
        img.src = e.target.result;
        
        img.onload = function() {
            imgX = (canvas.width - img.width) / 2;
            imgY = (canvas.height - img.height) / 2;
            drawCanvas(ctx, canvas, img, watermark, imgX, imgY);
        };
    };

    reader.readAsDataURL(file);

    canvas.onmousedown = startDragging;
    canvas.onmousemove = dragImage;
    canvas.onmouseup = stopDragging;
    canvas.onmouseleave = stopDragging;
});

function drawCanvas(ctx, canvas, img, watermark, imgX, imgY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, imgX, imgY);
    const watermarkWidth = 1080;
    const watermarkHeight = watermark.height * (watermarkWidth / watermark.width);
    const posX = 0;
    const posY = canvas.height - watermarkHeight;
    ctx.globalAlpha = 1.0;
    ctx.drawImage(watermark, posX, posY, watermarkWidth, watermarkHeight);
}

function startDragging(e) {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseX >= imgX && mouseX <= imgX + img.width &&
        mouseY >= imgY && mouseY <= imgY + img.height) {
        dragging = true;
    }
}

function dragImage(e) {
    if (dragging) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        imgX = e.clientX - rect.left - img.width / 2;
        imgY = e.clientY - rect.top - img.height / 2;
        const watermark = new Image();
        watermark.src = 'assets/marca_dagua3.png';
        drawCanvas(ctx, canvas, img, watermark, imgX, imgY);
    }
}

function stopDragging() {
    dragging = false;
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'imagem-com-marca-dagua.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
