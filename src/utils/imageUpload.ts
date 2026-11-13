export interface ProcessedUploadResult {
  dataUrl: string;
  width: number;
  height: number;
}

export function processUploadedImageFile(
  file: File,
  maxDim: number = 1500
): Promise<ProcessedUploadResult> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      let targetW = img.naturalWidth || 800;
      let targetH = img.naturalHeight || 600;

      if (targetW > maxDim || targetH > maxDim) {
        const ratio = Math.min(maxDim / targetW, maxDim / targetH);
        targetW = Math.round(targetW * ratio);
        targetH = Math.round(targetH * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      let dataUrl = '';

      if (ctx) {
        ctx.drawImage(img, 0, 0, targetW, targetH);
        const keepAlpha = file.type === 'image/png' || file.type === 'image/webp';
        dataUrl = keepAlpha
          ? canvas.toDataURL('image/webp', 0.9)
          : canvas.toDataURL('image/jpeg', 0.88);
      }

      URL.revokeObjectURL(objectUrl);

      if (dataUrl) {
        resolve({ dataUrl, width: targetW, height: targetH });
      } else {
        reject(new Error('Imeshindwa kusoma picha'));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          resolve({ dataUrl: result, width: 400, height: 400 });
        } else {
          reject(new Error('Imeshindwa kupakia picha'));
        }
      };
      reader.onerror = () => reject(new Error('Imeshindwa kupakia picha'));
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}
