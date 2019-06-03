import CanvasDrawer from './CanvasDrawer'
import AudioCreator from './AudioCreator'
import WaveformAnimator from './WaveformAnimator'

class WaveformAudioPlayer {
    constructor({window, container, audio, width, height, type, stroke, fill, background, quality}) {
        this._context = window
        this._container = container
        this._audio = audio
        this._WIDTH = width
        this._HEIGHT = height
        this._TYPE = type // ['linear', 'circular', 'polygon']
        this._FILL = fill
        this._STROKE = stroke
        this._BACKGROUND = background


        this.wrapper = window.document.createElement('div')
        this.wrapper.className = 'waplayer'
        container.appendChild(this.wrapper)

        this.canvas = new CanvasDrawer(window, this.wrapper, width, height, type, stroke, fill)
        this.player = new AudioCreator(window, this.wrapper, audio, width, height)
        this.wfAnimator = new WaveformAnimator(window, this.player.createPlayer(), quality, this.canvas.draw.bind(this.canvas))
        this.player.connect(() => {
            this.wfAnimator.updateContext.call(this.wfAnimator)
            this.wfAnimator.renderAnimation.call(this.wfAnimator)
        })
    }
}

export default WaveformAudioPlayer
