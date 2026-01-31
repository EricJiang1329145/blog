import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildScript = path.join(__dirname, 'build-posts.ts');

// 使用 tsc 编译并运行构建脚本
const tscProcess = spawn('npx', ['tsc', '--esModuleInterop', '--module', 'commonjs', '--target', 'es2017', '--outDir', path.join(__dirname, 'dist'), buildScript, '--skipLibCheck'], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..')
});

// 监听编译完成事件
 tscProcess.on('close', (code) => {
  if (code === 0) {
    console.log('TypeScript compilation successful, running build script...');
    
    // 运行编译后的 JavaScript 文件
    const nodeProcess = spawn('node', [path.join(__dirname, 'dist', 'build-posts.js')], {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    // 监听构建脚本完成事件
    nodeProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Build script completed successfully');
      } else {
        console.error(`Build script failed with exit code ${code}`);
        process.exit(code);
      }
    });
  } else {
    console.error(`TypeScript compilation failed with exit code ${code}`);
    process.exit(code);
  }
});
