const app = document.getElementById('app')
const apbgp = document.getElementById('app_bg')
const path = document.getElementById('path')
const polygon = document.getElementById('polygon')
const circular = document.getElementById('circular')
const width = 1000
const fftSize = 13
const minfftSize = 5
const maxfftSize = 15
const cutoff = .80

let player = document.createElement('audio')
let context
let analyser
let url = '/static/The National Anthem.mp3'
let inited = false
let dataArray

player.controls = true
player.preload = true
player.id = 'player'
player.src = url


document.body.appendChild(player)

window.player = player



// renderAnimation()

window.generatePath = generatePath

function init() {
    context = new (window.AudioContext || window.webkitAudioContext)()
    analyser = context.createAnalyser()

    const media = context.createMediaElementSource(player)
    media.connect(analyser)
    analyser.connect(context.destination)
    analyser.fftSize = Math.pow(2, fftSize < 15 ? (fftSize < 5 ? minfftSize : fftSize) : maxfftSize)
    // analyser.minDecibels = -150

    let bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength)
    return true
}

function renderAnimation() {
    requestAnimationFrame(renderAnimation);
    analyser.getByteFrequencyData(dataArray)

    // to Generate linear waveform
    generatePath(path, width, dataArray)

    // to generate polygon waveform
    generatePolygon(polygon, 450, 150, dataArray, 0)

    // to generate polygon waveform
    generateCircular(circular, 150, 150, dataArray, 0)
}

function generatePolygon(polygon, x, y, arr) {
    const length = arr.length * cutoff
    const deg = 360 / length
    const offset = 3
    let str = ''
    for (let i = 0; i < length; i++) {
        if (arr[i]) {
            let x1 = Math.sin(deg * i) * arr[i] / offset + x
            let y1 = Math.cos(deg * i) * arr[i] / offset + y
            str += `${x1},${y1} `
        }
        // else {
        //     str += `L ${ step * (i - offset)} 1 `
        // }
    }


    polygon.setAttribute('points', str)
}

function generateCircular(path, x, y, arr) {
    const length = arr.length
    const deg = 360 / length
    const offset = 3
    let str = `M${x} ${y} `
    for (let i = 1; i < length; i++) {
        if (arr[i]) {
            let x1 = Math.sin(deg * i) * arr[i] / offset + x
            let y1 = Math.cos(deg * i) * arr[i] / offset + y
            // str += `${x1},${y1} `
            str += `L ${x1} ${y1} L ${x} ${y} `
        }
        // else {
        //     str += `L ${ step * (i - offset)} 1 `
        // }
    }

    path.setAttribute('d', str)
}

function generatePath(path, pathLength, arr) {
    // let arr = generateRandomArr(length)
    const length = arr.length
    let step = pathLength / length || 1

    let str = `M0 0 `

    for (let i = 0; i < length; i++) {
        if (arr[i]) {
            str += `L ${ step * i} ${arr[i]} `
        } else {
            str += `L ${ step * i} 1 `
        }
    }
    str += `L ${step * (length + 1)} 0`
    path.setAttribute('d', str)
}

function generateRandomArr(length, min = 0, max = 255) {
    let arr = []
    for (let i = 0; i < length; i++) {
        arr[i] = getRandomInt(min, max)
    }
    return arr
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.addEventListener('click', () => {player.paused ? (inited ? player.play() : inited = init(), player.play()) : player.pause(), renderAnimation()})