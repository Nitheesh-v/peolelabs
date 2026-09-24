import { spawn, spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const frontendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const backendDir = path.resolve(frontendDir, '..', 'Backend')
const isWindows = process.platform === 'win32'
const children = []
let stopping = false

function missingDependencies(projectDir) {
  const manifest = JSON.parse(readFileSync(path.join(projectDir, 'package.json'), 'utf8'))
  const names = Object.keys({ ...manifest.dependencies, ...manifest.devDependencies })
  return names.filter((name) => !existsSync(path.join(projectDir, 'node_modules', ...name.split('/'), 'package.json')))
}

// Install packages when node_modules is absent or incomplete, e.g. after a fresh clone or pull.
function ensureDependencies(projectDir) {
  const missing = missingDependencies(projectDir)
  if (missing.length === 0) return

  const label = path.basename(projectDir)
  console.log(`\n${label}: installing missing packages (${missing.join(', ')})...\n`)
  const result = spawnSync('npm', ['install'], { cwd: projectDir, stdio: 'inherit', shell: isWindows })

  if (result.status !== 0 || missingDependencies(projectDir).length > 0) {
    console.error(`\n${label}: dependency installation failed. Run "npm install" in ${projectDir} and try again.`)
    process.exit(1)
  }
}

function start(command, args, cwd) {
  const child = spawn(command, args, { cwd, stdio: 'inherit', env: process.env })
  children.push(child)
  child.on('error', (error) => {
    console.error(`Could not start ${command}:`, error.message)
    process.exitCode = 1
    stopAll()
  })
  child.on('exit', (code) => {
    if (!stopping && code !== 0) {
      console.error(`${path.basename(cwd)} stopped unexpectedly.`)
      process.exitCode = code ?? 1
      stopAll()
    }
  })
  return child
}

function stopAll(signal = 'SIGTERM') {
  if (stopping) return
  stopping = true
  for (const child of children) {
    if (!child.killed) child.kill(signal)
  }
}

process.on('SIGINT', () => stopAll('SIGINT'))
process.on('SIGTERM', () => stopAll('SIGTERM'))

ensureDependencies(backendDir)
ensureDependencies(frontendDir)

start(process.execPath, ['server.js'], backendDir)
start(process.execPath, [path.join(frontendDir, 'node_modules', 'vite', 'bin', 'vite.js')], frontendDir)
