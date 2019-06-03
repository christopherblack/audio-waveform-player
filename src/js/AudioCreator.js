class AudioCreator {
    constructor(window, container, audio, width, height) {
        this.context = window
        this.container = container
        this.audio = audio
        this.width = width
        this.height = height
        this.player = null
        this.createPlayButton()
        this.connector = () => {}
    }

    createPlayer() {
        this.player = this.context.document.createElement('audio')
        this.player.controls = false
        this.player.preload = true
        this.player.src = this.audio
        return this.player
    }

    createPlayButton() {
        let playButton = this.context.document.createElement('div')
        playButton.className = 'player-button'
        playButton.style.setProperty('width', this.width / 4 + 'px')
        playButton.style.setProperty('height', this.height / 4 + 'px')
        playButton.style.setProperty('top', this.height / 2 - this.height / 8 + 'px')
        playButton.style.setProperty('left', this.width / 2 - this.width / 8 + 'px')

        this.container.classList.add('paused')
        playButton.addEventListener('click', (e) => {
            if (this.player.paused) {
                this.connector()
                this.play()
            } else {
                this.pause()
            }
        })
        this.container.appendChild(playButton)
    }

    play() {
        this.container.classList.remove('paused')
        this.container.classList.add('playing')
        return this.player.play()
    }

    pause() {
        this.container.classList.remove('playing')
        this.container.classList.add('paused')
        return this.player.pause()
    }

    stop() {}

    connect(func) {
        this.connector = func
    }
}

export default AudioCreator
