class CanvasDrawer {
    constructor({document}, {container}, {width}, {height}, {type}, {stroke}, {fill}) {
        this._context = document
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
                return this.drawLinear
            case 'circular':
                return this.drawCircular
            case 'polygon':
                return this.drawPolygon
        }
    }

    createCanvas() {
        this.canvas = this._context.createElement('canvas')
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

        this.ctx.clearRect(0,0,width,height) // clear canvas

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

}
