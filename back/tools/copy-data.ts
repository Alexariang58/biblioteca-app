import {
  readdirSync,
  copyFileSync,
  mkdirSync,
  existsSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

// ✅ Usa process.cwd() para resolver desde la raíz del proyecto
const srcDir = join(process.cwd(), 'src', 'data');
const destDir = join(process.cwd(), 'dist', 'data');

// Solo para verificar que el script se ejecutó
writeFileSync(
  'copy-data-executed.log',
  '✅ Script ejecutado: ' + new Date().toISOString(),
);

console.log('🔄 copy-data se está ejecutando...');
try {
  if (!existsSync(srcDir)) {
    throw new Error(`❌ Directorio fuente no encontrado: ${srcDir}`);
  }

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
    console.log(`📂 Directorio creado: ${destDir}`);
  }

  const files = readdirSync(srcDir);

  if (files.length === 0) {
    console.log('ℹ️ No hay archivos para copiar en src/data');
  }

  files.forEach((file) => {
    const srcFile = join(srcDir, file);
    const destFile = join(destDir, file);
    copyFileSync(srcFile, destFile);
    console.log(`✅ Copiado: ${file}`);
  });

} catch (error) {
  console.error('🚨 Error en copy-data:');
  console.error(error);
  process.exit(1);
}
