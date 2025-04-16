namespace SpriteKind {
    export const Square = SpriteKind.create()
    export const Circle = SpriteKind.create()
}
sprites.onDestroyed(SpriteKind.Square, function (sprite) {
    game.reset()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game.showLongText("Pi: " + 4 * circleDots / squareDots + " using " + circleDots + " dots", DialogLayout.Bottom)
})
info.onLifeZero(function () {
    info.setScore(circleDots)
    game.showLongText("Pi: " + 4 * circleDots / squareDots, DialogLayout.Bottom)
    mCircle.say("Bye..")
    mCircle.vx = 1000
    mSquare.say("..we have Pi")
    mSquare.ax = 50
})
function drawCircle () {
    for (let index = 0; index < dots; index++) {
        xx = randint(0, 2 * r) - r
        yy = randint(0, 2 * r) - r
        if (xx * xx + yy * yy >= r ** 2 && xx * xx + yy * yy < (r + 1) ** 2) {
            cirImage.setPixel(xx + r, yy + r, 1)
        }
    }
}
let delay = 0
let simulate = false
let j = 0
let yy = 0
let xx = 0
let squareDots = 0
let circleDots = 0
let mCircle: Sprite = null
let mSquare: Sprite = null
let cirImage: Image = null
let dots = 0
let r = 0
r = scene.screenHeight() / 4
let l = r * 2 + 1
dots = 1000000
let r2 = 5000
let scale = (r + 1) / r2
let sqImage = image.create(l, l)
sqImage.fill(0)
sqImage.drawRect(0, 0, l, l, 1)
cirImage = image.create(l, l)
cirImage.fill(0)
game.splash("Approximate Pi", "Leoncio Method")
mSquare = sprites.create(sqImage, SpriteKind.Square)
mSquare.setFlag(SpriteFlag.AutoDestroy, true)
drawCircle()
mCircle = sprites.create(cirImage, SpriteKind.Circle)
forever(function () {
    while (j < dots && simulate) {
        xx = randint(0, 2 * r2) - r2
        yy = randint(0, 2 * r2) - r2
        sqImage.setPixel(xx * scale + r, yy * scale + r, 7)
        squareDots += 1
        if (xx * xx + yy * yy <= r2 ** 2) {
            circleDots += 1
            xx = xx * scale
            yy = yy * scale
            if (xx < 0) {
                xx += 1
            }
            if (yy < 0) {
                yy += 1
            }
            cirImage.setPixel(xx + r, yy + r, 2)
        }
        if (squareDots < dots / 50 && squareDots % 100 == 0) {
            info.setScore(circleDots)
            pause(100)
        }
        j += 1
        if (j >= dots) {
            info.setScore(circleDots)
            info.setLife(0)
        }
    }
})
game.onUpdateInterval(100, function () {
    if (delay > 10) {
        // start simulation
        simulate = true
    }
    if (delay > 20) {
        if (mCircle.x < scene.screenWidth() - 3 * r / 2) {
            mSquare.x += -1
            mCircle.x += 1
        }
    }
    delay += 1
})
