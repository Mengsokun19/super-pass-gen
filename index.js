#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbols = ['@', '#', '$', '%']

// get all characters
const characterCodes = Array.from(Array(26)).map((_, i) => i + 97)

const lowercaseLetters = characterCodes.map((code) => String.fromCharCode(code))
const upppercaseLetters = lowercaseLetters.map((letter) => letter.toUpperCase())

async function welcome() {
  const glitchTitle = chalkAnimation.glitch('Wanna Generate your secret password? \n')

  await sleep()
  glitchTitle.stop()

  console.log(
    gradient.instagram(figlet.textSync('Password Generator', { horizontalLayout: 'full' }))
  )
}

await welcome()
await optionsPassword()
await generatePassword()

// take user input
async function optionsPassword() {
  const { passwordLength } = await inquirer.prompt([
    {
      type: 'number',
      name: 'passwordLength',
      message: 'How long do you want your password to be?',
      default() {
        return 16
      },
    },
  ])
  const { hasSymbols } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'hasSymbols',
      message: 'Do you want your password to include sysmbols?',
      default: true,
    },
  ])
  const { hasNumbers } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'hasNumber',
      message: 'Do you want your password to include numbes?',
      default: true,
    },
  ])
  const { hasLowercase } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'hasLowercase',
      message: 'Do you want your password to include lowercase?',
      default: true,
    },
  ])
  const { hasUppercase } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'hasUppercase',
      message: 'Do you want your password to include UPPERCASE?',
      default: true,
    },
  ])

  const spinner = createSpinner('Generating your secret password...').start()
  await sleep()
  const password = await generatePassword(
    passwordLength,
    hasSymbols,
    hasNumbers,
    hasLowercase,
    hasUppercase
  )
  if (password) {
    spinner.success({
      text: `Here is your SUPER secret password 🥳: ${gradient.rainbow(
        password
      )}. Copy and Paste somewhere to use later 😁😁! Lmao`,
    })
  }
}

// generate password
async function generatePassword(length, hasSymbols, hasNumbers, hasLowercase, hasUppercase) {
  let availableCharacters = [
    ...(hasSymbols ? symbols : []),
    ...(hasNumbers ? numbers : []),
    ...(hasUppercase ? upppercaseLetters : []),
    ...(hasLowercase ? lowercaseLetters : []),
  ]

  let password = ''

  if (availableCharacters.length === 0) return ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length)
    password += availableCharacters[randomIndex]
  }

  return password
}
