import { readdirSync, copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const srcDir = join(__dirname, '..', 'src', 'data');
const destDir = join(__dirname, '..', 'dist', 'data');

// Crear carpeta de destino si no existe
if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

// Copiar todos los archivos
readdirSync(srcDir).forEach(file => {
  const srcFile = join(srcDir, file);
  const destFile = join(destDir, file);
  copyFileSync(srcFile, destFile);
  console.log(`✅ Copiado: ${file}`);
});