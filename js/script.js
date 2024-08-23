document.getElementById('imageInput').addEventListener('change', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const file = this.files[0];
    const reader = new FileReader();
    const watermark = new Image();
    
    watermark.src = 'https://cinthiadepaula.github.io/jj/assets/marca_dagua.png';  // Caminho para a sua marca d'água fixa

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
                const watermarkWidth = img.width;  // Ajusta o tamanho da marca d'água para cobrir toda a imagem
                const watermarkHeight = img.height;
                
                ctx.globalAlpha = 1.0;  // Ajuste de opacidade da marca d'água (pode variar entre 0 e 1)
                ctx.drawImage(watermark, 0, 0, watermarkWidth, watermarkHeight);
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
