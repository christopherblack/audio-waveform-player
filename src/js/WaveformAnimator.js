class WaveformAnimator {
    constructor (context, player, quality, animateFunction) {
        this.MIN_FFT_SIZE = 5
        this.MAX_FFT_SIZE = 15

        this.context = context
        this.player = player
        this.quality = quality
        this.dataArray = null
        this.animateFunction = animateFunction

        this.audioContext = new (context.AudioContext || context.webkitAudioContext)()
        this.analyser = this.audioContext.createAnalyser()
        this.media = this.audioContext.createMediaElementSource(player)
        this.media.connect(this.analyser)
        this.analyser.connect(this.audioContext.destination)
        this.analyser.fftSize = Math.pow(2, quality < this.MAX_FFT_SIZE ? (quality + 5 < this.MIN_FFT_SIZE ? this.MIN_FFT_SIZE : quality + 5) : this.MAX_FFT_SIZE)
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
    }

    updateContext() {
        this.audioContext.resume()
    }

    renderAnimation() {
        this.context.requestAnimationFrame(this.renderAnimation.bind(this))
        this.analyser.getByteFrequencyData(this.dataArray)
        this.animateFunction(this.dataArray)
    }
}

export default WaveformAnimator
