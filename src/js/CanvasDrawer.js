class CanvasDrawer {
    constructor(window, container, width, height, type, stroke, fill) {
        this._context = window
        this._container = container
        this._WIDTH = width
        this._HEIGHT = height
        this._X = 0
        this._Y = 0
        this._TYPE = type
        this._FILL = fill
        this._STROKE = stroke
        this.canvas = null
        this.ctx = null
        this.drawFunction = this.setDrawFunction(type)
        this.createCanvas()
    }

    setDrawFunction(type) {
        switch (type) {
            case 'linear':
                this._X = 0
                this._Y = 0
                return this.drawLinear
            case 'circular':
                this._X = this._WIDTH / 2
                this._Y = this._HEIGHT / 2
                return this.drawCircular
            case 'polygon':
                return this.drawPolygon
        }
    }

    createCanvas() {
        this.canvas = this._context.document.createElement('canvas')
        this.canvas.width = this._WIDTH
        this.canvas.height = this._HEIGHT
        this.ctx = this.canvas.getContext('2d')
        this._container.appendChild(this.canvas)
    }

    draw(arr) {
        this.drawFunction(arr)
    }

    drawLinear(arr) {
        const length = arr.length
        let step = this._WIDTH / length || 1

        this.ctx.clearRect(0,0, this._WIDTH, this._HEIGHT) // clear canvas

        this.ctx.fillStyle = this._FILL || '#000000'
        this.ctx.strokeStyle = this._STROKE || '#000000'
        this.ctx.save()

        this.ctx.beginPath()
        this.ctx.moveTo(this._X, this._HEIGHT)

        for (let i = 0; i < length; i++) {
            if (arr[i]) {
                // step * ( i - 1 ) + step / 2 (to make /\ lines)
                this.ctx.lineTo(step * i , this._HEIGHT - arr[i])
            } else {
                this.ctx.lineTo(step * i, this._HEIGHT - 1)
            }
            // ctx.lineTo(step * i, height)
        }

        if (this._STROKE)
            this.ctx.stroke()

        if (this._FILL)
            this.ctx.fill()
    }

    drawCircular(arr) {
        const length = arr.length
        const deg = 360 / length
        const offset = 3

        this.ctx.clearRect(0,0,1000,300) // clear canvas

        this.ctx.fillStyle = this._FILL || '#000000'
        this.ctx.strokeStyle = this._STROKE || '#000000'
        this.ctx.save()

        this.ctx.beginPath()
        this.ctx.moveTo(this._X, this._Y)

        for (let i = 0; i < length; i++) {
            if (arr[i]) {
                let x1 = Math.sin(deg * i) * arr[i] / offset + this._X
                let y1 = Math.cos(deg * i) * arr[i] / offset + this._Y
                // str += `${x1},${y1} `
                this.ctx.lineTo(x1, y1)
                this.ctx.lineTo(this._X, this._Y)
            }
        }
        this.ctx.stroke()
    }

}

export default CanvasDrawer
