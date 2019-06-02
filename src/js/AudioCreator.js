class AudioCreator {
    constructor(document, container, audio, width, height) {
        this.context = document
        this.container = container
        this.audio = audio
        this.width = width
        this.height = height
        this.player = this.createPlayer()
    }

    createPlayer() {
        let player = this.context.createElement('audio')
        player.controls = false
        player.preload = true
        player.src = this.audio
        return player
    }

    play() {
        return this.play()
    }

    pause() {
        return this.pause()
    }

    stop() {}
}
