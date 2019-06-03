import WaveformAudioPlayer from './WaveformAudioPlayer'
import '../scss/player.scss'

new WaveformAudioPlayer({
    window: window,
    container: document.getElementById('player'),
    audio: '/static/The National Anthem.mp3',
    width: 300,
    height: 300,
    type: 'circular', // ['linear', 'circular', 'polygon']
    stroke: '#9c1441',
    fill: '#1abccc',
    background: '#ccc',
    quality: 5
})
