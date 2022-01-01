function 歯みがき () {
    while (歯磨き時間ミリ秒 >= control.millis() - 計測開始時間ミリ秒) {
        if (点灯 == 1) {
            if (control.millis() - 計測開始時間ミリ秒 > 135000) {
                basic.showLeds(`
                    # # . . .
                    # # . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
                切り替えお知らせ(2)
            } else if (control.millis() - 計測開始時間ミリ秒 > 90000) {
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . . . .
                    # # . . .
                    # # . . .
                    `)
                切り替えお知らせ(1)
            } else if (control.millis() - 計測開始時間ミリ秒 > 45000) {
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . # #
                    . . . # #
                    `)
                切り替えお知らせ(0)
            } else {
                basic.showLeds(`
                    . . . # #
                    . . . # #
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            }
        } else {
            basic.clearScreen()
        }
        信号制御()
        basic.pause(1000)
        点灯 = 点灯 * -1
    }
    music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
    basic.showLeds(`
        . # . . .
        . . # . .
        . . . # .
        . . . . #
        . . . # .
        `)
    while (true) {
        basic.pause(1000)
        信号制御()
    }
}
function 信号制御 () {
    if (control.millis() - 計測開始時間ミリ秒 > 180000) {
        pins.digitalWritePin(DigitalPin.P2, 信号ON)
        pins.digitalWritePin(DigitalPin.P1, 信号ON)
        pins.digitalWritePin(DigitalPin.P0, 信号ON)
    } else if (control.millis() - 計測開始時間ミリ秒 > 120000) {
        pins.digitalWritePin(DigitalPin.P2, 信号ON)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else if (control.millis() - 計測開始時間ミリ秒 > 60000) {
        pins.digitalWritePin(DigitalPin.P1, 信号ON)
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 信号ON)
    }
    if (信号ON == 0) {
        信号ON = 1
    } else {
        信号ON = 0
    }
}
input.onSound(DetectedSound.Loud, function () {
    if (計測開始時間ミリ秒 == 0) {
        basic.showIcon(IconNames.SmallHeart)
        計測開始時間ミリ秒 = control.millis()
        basic.pause(3000)
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        basic.clearScreen()
        歯みがき()
    }
})
function 切り替えお知らせ (数値: number) {
    if (切り替え音[数値] == 0) {
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        切り替え音[数値] = 1
    }
}
let 切り替え音: number[] = []
let 歯磨き時間ミリ秒 = 0
let 点灯 = 0
let 信号ON = 0
let 計測開始時間ミリ秒 = 0
計測開始時間ミリ秒 = 0
信号ON = 0
点灯 = -1
歯磨き時間ミリ秒 = 180000
music.setVolume(255)
切り替え音 = [0, 0, 0]
