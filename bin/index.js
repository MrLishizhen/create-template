#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { readFile } from 'fs/promises';
import degit from 'degit';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 添加清理函数
let currentTempDir = null;
let currentTargetPath = null;

async function cleanup() {
    if (currentTempDir) {
        await fs.remove(currentTempDir).catch(() => {});
    }
    if (currentTargetPath) {
        await fs.remove(currentTargetPath).catch(() => {});
    }
}

// 添加退出处理
process.on('SIGINT', async () => {
    console.log('\n\n👋 正在取消创建...');
    await cleanup();
    console.log('✨ 已取消创建，再见！');
    process.exit(0);
});

// 修改 package.json 读取方式
const getPackageJson = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pkgPath = path.join(__dirname, '../package.json');
    return JSON.parse(await readFile(pkgPath, 'utf8'));
}

const list = {
    "template-react-ts": "git@github.com:MrLishizhen/create-template.git",
    "template-vue-ts": "git@github.com:MrLishizhen/create-template.git"
};

async function downloadTemplate(template, targetPath) {
    const emitter = degit(list[template], {
        cache: false,
        force: true,
        verbose: true,
        timeout: 30000  // 增加超时时间到 30 秒
    });

    // 添加调试事件监听
    emitter.on('info', info => {
        console.log(info.message);
    });

    emitter.on('warn', warning => {
        console.warn(warning.message);
    });

    const tempDir = path.join(process.cwd(), '.temp-' + Date.now());
    currentTempDir = tempDir;  // 保存当前临时目录路径
    currentTargetPath = targetPath;  // 保存当前目标路径
    
    try {
        console.log('开始下载模板:', list[template]);
        await emitter.clone(tempDir);
        console.log('模板下载完成');
        
        // 移动对应的模板目录到目标路径
        const templateDir = template === 'template-react-ts' 
            ? path.join(tempDir, 'template-react/template-react-ts')
            : path.join(tempDir, 'template-vue/template-vue-ts');

        // 确保目标目录存在
        await fs.ensureDir(path.dirname(targetPath));
        
        // 移动模板文件到目标目录
        await fs.move(templateDir, targetPath);

        console.log('当前工作目录:', process.cwd());
        console.log('目标路径:', targetPath);
        console.log('临时目录:', tempDir);
    } catch (error) {
        console.error('下载失败:', error);
        throw error;
    } finally {
        currentTempDir = null;  // 清理完成后重置路径
        await fs.remove(tempDir).catch(() => {});
    }
}

try {
    const packageJson = await getPackageJson();
    console.log(packageJson.name, packageJson.version);
    
    program
        .name(`${packageJson.name}`)
        .description('一个用于创建模板的脚手架工具')
        .version(`v${packageJson.version}`, '-v, --version')
        .argument('[projectName]', '项目名称')
        .action(async (projectName) => {
            try {
                if (!projectName) {
                    const result = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'projectName',
                            message: '请输入项目名称：',
                            validate: (input) => {
                                if (!input) return '项目名不能为空';
                                if (fs.existsSync(input)) return '项目已存在';
                                return true;
                            },
                        },
                    ]);
                    projectName = result.projectName;
                }

                console.log('\n👉 按 Ctrl+C 可随时取消创建\n');

                const { template } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'template',
                        message: '请选择一个模板：',
                        choices: Object.keys(list),
                    },
                ]);

                const spinner = ora('正在下载模板...').start();
                const targetPath = path.join(process.cwd(), projectName);
                currentTargetPath = targetPath;  // 保存目标路径

                try {
                    await downloadTemplate(template, targetPath);
                    
                    // 修改 package.json 中的项目名
                    const pkgPath = path.join(targetPath, 'package.json');
                    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
                    pkg.name = projectName;
                    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

                    currentTargetPath = null;  // 创建成功后重置路径
                    spinner.succeed(`项目 ${projectName} 创建成功！`);
                    console.log('\n运行以下命令启动项目：');
                    console.log(`\n  cd ${projectName}`);
                    console.log('  pnpm install');
                    console.log('  pnpm dev\n');
                } catch (error) {
                    spinner.fail('项目创建失败');
                    console.error(error);
                    await cleanup();
                }
            } catch (error) {
                console.error('操作被取消');
                await cleanup();
                process.exit(1);
            }
        });

    program.parse(process.argv);
} catch (error) {
    console.error('发生错误:', error);
    await cleanup();
    process.exit(1);
}