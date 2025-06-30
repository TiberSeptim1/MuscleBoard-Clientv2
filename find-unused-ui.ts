import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uiDir = path.join(__dirname, 'src', 'components', 'ui');
const projectDir = path.join(__dirname, 'src');


const getAllFiles = (dir: string, ext = '.tsx'): string[] => {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(ext))
    .map((file) => path.join(dir, file));
};

const searchFileUsage = (filePath: string, content: string): boolean => {
    const files = getAllFiles(projectDir, '.tsx').concat(getAllFiles(projectDir, '.ts'));
  
    const relativePathFromSrc = path.relative(projectDir, filePath).replace(/\\/g, '/');
    const aliasPath = '@/'+relativePathFromSrc.replace(/\.tsx$/, '');
  
    return files.some((file) => {
      const fileContent = fs.readFileSync(file, 'utf-8');
      return (
        fileContent.includes(content) ||
        fileContent.includes(relativePathFromSrc) ||
        fileContent.includes(aliasPath)
      );
    });
  };
  

const main = () => {
  const files = getAllFiles(uiDir);
  const unused: string[] = [];

  for (const file of files) {
    const baseName = path.basename(file, '.tsx');
    const importName = baseName.charAt(0).toUpperCase() + baseName.slice(1); // Guess export name

    const isUsed = searchFileUsage(file, importName);
    if (!isUsed) unused.push(file);
  }

  console.log(`\n🔍 Unused UI Components:\n`);
  unused.forEach((file) => console.log(`❌ ${file.replace(__dirname, '')}`));
  console.log(`\n✅ You can safely delete these (${unused.length} files).`);
};

main();
