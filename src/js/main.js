const app = document.getElementById('app')
const apbgp = document.getElementById('app_bg')
const path = document.getElementById('path')
const width = 1000
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
    analyser.fftSize = 2048

    let bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength)
    return true
}

function renderAnimation() {
    requestAnimationFrame(renderAnimation);
    analyser.getByteFrequencyData(dataArray)

    generatePath(path, width, dataArray, 800)

    // let avg = dataArray.reduce((a, b) => a + b)/dataArray.length
    // // app.style.borderWidth = avg + 'px'
    // // app.style.boxShadow = `red 0 0 ${avg}px ${avg/4}px`
    // avg = avg === 0 ? 1 : avg
    // apbgp.style.transform = `scale(${1 + avg/800})`


}

function generatePath(path, pathLength, arr, lengthOverride = null) {
    // let arr = generateRandomArr(length)
    const length = lengthOverride || arr.length
    let step = pathLength / length || 1
    // //
    // let realLength = 0
    //
    // for (let i = 0; i < length; i++) {
    //     if (arr[i]) {
    //         realLength++
    //     }
    // }

    // step = Number.parseInt(pathLength / length)

    let str = `M0 0 L 0 ${arr[0]}, ${step} ${arr[1]} `
    let offset = 0
    for (let i = 2; i < length; i++) {
        if (arr[i]) {
            str += `L ${ step * (i - offset)} ${arr[i]} `
        } else {
            str += `L ${ step * (i - offset)} 1 `
        }
    }
    str += `L ${step * (length + 1 - offset)} 0`
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

// function loadSound(url, onload) {
//     const request = new XMLHttpRequest();
//     request.open('GET', url, true);
//     request.responseType = 'arraybuffer';
//
//     request.onload = () => onload(request.response)
//     request.send();
// }
//
// function playSound(buffer) {
//     let source = context.createBufferSource(); // creates a sound source
//     source.buffer = buffer;                    // tell the source which sound to play
//     source.connect(context.destination);       // connect the source to the context's destination (the speakers)
//     source.start(0);                           // play the source now
//     // note: on older systems, may have to use deprecated noteOn(time);
// }