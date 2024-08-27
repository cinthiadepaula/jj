document.getElementById('imageInput').addEventListener('change', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const file = this.files[0];
    const reader = new FileReader();
    const watermark = new Image();
    
    watermark.src = 'assets/marca_dagua3.png';  // Caminho para a sua marca d'água fixa

    watermark.onload = function() {
        console.log('Marca d\'água carregada');
    };

    watermark.onerror = function() {
        console.error('Erro ao carregar a marca d\'água');
    };

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;

            // Desenha a imagem do usuário no canvas
            ctx.drawImage(img, 0, 0);

            // Aguarde até a marca d'água carregar completamente
            watermark.onload = function() {
                // Proporção da marca d'água em relação à imagem original
                const watermarkRatio = 1.0;  // Ajuste essa proporção conforme necessário
                const watermarkWidth = img.width * watermarkRatio;
                const watermarkHeight = watermark.height * (watermarkWidth / watermark.width);
                
                // Posicionamento da marca d'água no centro da imagem
                const posX = (img.width - watermarkWidth) / 2;
                const posY = (img.height - watermarkHeight) / 1.0;
                
                ctx.globalAlpha = 1.0;  // Ajuste de opacidade da marca d'água (pode variar entre 0 e 1)
                ctx.drawImage(watermark, posX, posY, watermarkWidth, watermarkHeight);
                ctx.globalAlpha = 1.0;
                
                 // Exibir o botão de download após o upload e renderização
                 document.getElementById('downloadBtn').style.display = 'inline-flex';
            };

            // Força o carregamento da marca d'água, caso ainda não tenha carregado
            if (watermark.complete) {
                watermark.onload();
            }
        };
    };

    reader.readAsDataURL(file);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'imagem-com-marca-dagua.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
