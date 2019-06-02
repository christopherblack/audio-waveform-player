class WaveformAudioPlayer {
    constructor({document}, {container}, {audio}, {width}, {height}, {type}, {stroke}, {fill}, {background}) {
        this._context = document
        this._container = container
        this._audio = audio
        this._WIDTH = width
        this._HEIGHT = height
        this._TYPE = type // ['linear', 'circular', 'polygon']
        this._FILL = fill
        this._STROKE = stroke
        this._BACKGROUND = background

        this.player = new AudioCreator(document, container, audio, width, height)
    }
}
