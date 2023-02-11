export function generateRandomColor() {
    const maxVal = 0xffffff // 16777215
    let randomNumber = Math.random() * maxVal
    let randomStringNumber = ''
    randomNumber = Math.floor(randomNumber)
    randomStringNumber = randomNumber.toString(16)
    const randColor = randomStringNumber.padStart(6, '0')

    return `#${randColor.toUpperCase()}`
}
