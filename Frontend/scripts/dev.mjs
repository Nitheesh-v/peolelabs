import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const frontendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const backendDir = path.resolve(frontendDir, '..', 'Backend')
const children = []
let stopping = false

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

start(process.execPath, ['server.js'], backendDir)
start(process.execPath, [path.join(frontendDir, 'node_modules', 'vite', 'bin', 'vite.js')], frontendDir)
