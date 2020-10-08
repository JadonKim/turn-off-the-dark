namespace SpriteKind {
    export const Monster = SpriteKind.create()
    export const FakeMonsters = SpriteKind.create()
    export const NormalThing = SpriteKind.create()
}
// tiles change back to dark & monsters come back
function turnOnTheDark () {
    setTilemap()
    for (let dualityMonster of sprites.allOfKind(SpriteKind.NormalThing)) {
        dualityMonster.setImage(sprites.readDataSprite(dualityMonster, "night").image)
        dualityMonster.follow(vivian, 15)
        dualityMonster.setKind(SpriteKind.Monster)
    }
    darkIsOff = false
}
// create all monsters
function createAllMonsters () {
    for (let index = 0; index <= 4; index++) {
        // we start at 0, increase until
        for (let index2 = 0; index2 < 3; index2++) {
            makeDualityMonster(nightMonsterImgs[index], dayItemImgs[index])
        }
    }
}
// Set the tile map to show a dark room
function setTilemap () {
    tiles.loadMap(tiles.createMap(tilemap`level`))
    tiles.setTilemap(tilemap`level_0`)
}
// flashlight on
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    vivian.setImage(vivianLightImg)
    turnOffTheDark()
})
// To redraw the tiles in different colors
function redoTile (tileImage: Image) {
    copiedTile = tileImage.clone()
    copiedTile.replace(12, 13)
    copiedTile.replace(11, 1)
    copiedTile.replace(14, 4)
    tiles.coverAllTiles(tileImage, copiedTile)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Monster, function (sprite, otherSprite) {
    game.reset()
})
// flashlight off
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    vivian.setImage(vivianDarkImg)
    turnOnTheDark()
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile7, function (sprite, location) {
    game.over(true)
})
// Turn Off the dark
function turnOffTheDark () {
    for (let monster of sprites.allOfKind(SpriteKind.Monster)) {
        monster.setImage(sprites.readDataSprite(monster, "day").image)
        monster.follow(null)
        monster.setKind(SpriteKind.NormalThing)
    }
    redoTile(myTiles.tile1)
    redoTile(myTiles.tile2)
    redoTile(myTiles.tile3)
    redoTile(myTiles.tile4)
    redoTile(myTiles.tile5)
    redoTile(myTiles.tile6)
    redoTile(myTiles.tile7)
    darkIsOff = true
}
function makeDualityMonster (night: Image, day: Image) {
    monster2 = sprites.create(night, SpriteKind.Monster)
    dayTimeMonster = sprites.create(day, SpriteKind.FakeMonsters)
    // daytimeMonster = sprites.create(day, SpriteKind.FakeMonsters)
    nighttimeMonster = sprites.create(night, SpriteKind.FakeMonsters)
    // daytimeMonster.setFlag(SpriteFlag.Invisible, true)
    // daytimeMonster.setFlag(SpriteFlag.Ghost, true)
    nighttimeMonster.setFlag(SpriteFlag.Invisible, true)
    // daytimeMonster.setFlag(SpriteFlag.Invisible, true)
    // daytimeMonster.setFlag(SpriteFlag.Ghost, true)
    dayTimeMonster.setFlag(SpriteFlag.Invisible, true)
    nighttimeMonster.setFlag(SpriteFlag.Ghost, true)
    dayTimeMonster.setFlag(SpriteFlag.Ghost, true)
    // sprites.setDataSprite(monster2, "day", daytimeMonster)
    sprites.setDataSprite(monster2, "night", nighttimeMonster)
    // sprites.setDataSprite(monster2, "day", daytimeMonster)
    sprites.setDataSprite(monster2, "day", dayTimeMonster)
    monster2.setPosition(randint(50, 1000), randint(0, 100))
    monster2.follow(vivian, 15)
}
let nighttimeMonster: Sprite = null
let dayTimeMonster: Sprite = null
let monster2: Sprite = null
let copiedTile: Image = null
let darkIsOff = false
let vivian: Sprite = null
let vivianLightImg: Image = null
let vivianDarkImg: Image = null
let dayItemImgs: Image[] = []
let nightMonsterImgs: Image[] = []
nightMonsterImgs = [img`
    . . . . . . . . . . . . . . . . 
    . . . 8 8 8 8 8 8 8 . . . . . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 . . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 8 f f 8 8 8 8 f f 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . . 8 8 8 8 8 8 8 8 8 8 8 8 c . 
    . . . 8 8 8 8 8 8 8 8 8 8 c c c 
    . . . . . 8 8 8 8 8 8 8 c c c c 
    . . . . . . . c c c c c c c c c 
    . . . . . . . . . c c c c c c c 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . e e e e e . . . . . 
    . . . . . e b b 6 6 b e . . . . 
    . . e e e b c c 6 6 6 c e . . . 
    . e b b c c c c c 6 6 6 c e . . 
    . e b c c c c c c c 6 6 c c e . 
    . e b c c c c c c c c c c c e . 
    . e c c c c e c c c c c c c e . 
    . e b c c e . e e c 6 c c c e . 
    . e b c c e . . . e 6 e 6 e . . 
    . e c c c c e . . . 6 . 6 . . . 
    . e b c c c e e . 6 . . 6 . . . 
    . . e c c c c b e e . 6 . . . . 
    . . e c c c c c c b e e . . . . 
    . e c c c c c c c c c b e e e . 
    e b c c c c c c c c c c c c b e 
    . e e e e e e e e e e e e e e . 
    `, img`
    e e . . . . . . . . . . . . . . 
    e e e e e e e e . . . . . . . . 
    . e e b b b b b b b b . . . . . 
    . e b b b b b b b b b b b . . . 
    . e b b b b b b b b b b b b . . 
    . e b b b b b b b b b b b b b . 
    e b b b f f b b b b b b b b b . 
    e b b f c c f b b b b b b . f . 
    e b b f c c f b b b . f . . . . 
    e b b b f f b b b . . . . . . . 
    e b b b b b b b b . . . . . . . 
    . e b b b b b b b . . . . . . . 
    . . e b b b b b b . f . . f . . 
    . . . e e b b b b b b b b b b . 
    . . . . . e e e b b b e e e e . 
    . . . . . . . . e e e e . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . f f f f . . . 
    . . . . . . . . f 6 6 6 6 f . . 
    . . . . . . . f c c 6 6 6 f . . 
    . . . . . . f c c c 6 6 f . . . 
    . . . . . . f c c c 6 6 f . . . 
    . . . . . . f c c 6 6 6 f . . . 
    . . . . . . f 6 6 6 c c f . . . 
    . . . . . . f 6 6 c c c f . . . 
    . . . . . . f 6 6 c c c f . . . 
    . . . . . . f 6 6 6 c c f . . . 
    . . . . . . f 6 6 6 6 6 f . . . 
    . . . . . f f f 6 6 6 6 f . . . 
    . . . . f 6 6 6 6 6 6 6 f . . . 
    . . . f b b 6 6 6 6 6 6 f . . . 
    . . f f f f f f f f f f f . . . 
    `, img`
    . . . . . . f f f . . . . . . . 
    . . . . f f f f f f . . . . . . 
    . . . . f f f f f f f . . . . . 
    . . . f f f f f f 6 f . . . . . 
    . . . f f 6 f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f . f . f . . . . 
    . . . f . f f f . . f . . . . . 
    . . . . . f . f . f f . . . . . 
    . . . . . f . f . f . . . . . . 
    . . . . . f . . . . . . . . . . 
    `]
dayItemImgs = [img`
    . . . f f f f f f f f f f . . . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . f 9 9 1 1 1 1 1 1 1 1 9 9 f . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . . f 9 1 1 1 1 1 1 1 1 9 f . . 
    . . f 9 1 1 1 1 1 1 1 1 9 f . . 
    . . f 9 1 1 1 1 1 1 1 1 9 f . . 
    . . f 9 9 9 9 1 1 1 1 1 9 f . . 
    . . f 9 9 9 9 9 1 1 1 1 9 f . . 
    . . f 9 9 9 9 9 9 1 1 1 9 f . . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . . . f 9 9 9 9 9 9 9 9 f . . . 
    . . . f 9 9 9 9 9 9 9 9 f . . . 
    . . . . f f f f f f f f . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 3 3 3 3 3 3 . . . . . . . 
    . . 3 . 3 . 3 3 6 3 . . . . . . 
    . 3 . 3 . 3 3 6 6 3 . . . . . . 
    . . 3 . 3 . 3 6 6 3 . . . . . . 
    . 3 . 3 . 3 3 6 3 3 9 . . . . . 
    . . . 3 3 3 3 3 3 9 9 9 9 . . . 
    . . . . . . . . 9 9 9 9 9 9 . . 
    . . . . . . . . . . 9 9 9 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    e . . . . . . . . . . . . . . . 
    c e . . . . . . . . . . . . . . 
    . c e . . . . . . . . . . . . . 
    . . c e . . . . . . . . . . . . 
    . . . c e . . . . . . . . . . . 
    . . . . c e . . . . . . . . . . 
    . . . . . c e . . . . . . . . . 
    . . . . . . c e . . . . . . . . 
    . . . . . . . c e . . . . . . . 
    . . . . . . . . c 5 5 5 . . . . 
    . . . . . . . . 4 5 5 5 e . . . 
    . . . . . . . . 4 5 5 e 5 5 . . 
    . . . . . . . . 4 e e 5 5 5 5 . 
    . . . . . . . . e 4 5 5 4 5 . . 
    . . . . . . . . . 4 5 5 5 . . . 
    . . . . . . . . . . 4 4 . . . . 
    `, img`
    . . . . . . . . . . . . b b . . 
    . . . . . . . . . . . b . . . . 
    . . . . . . . . . 2 2 b . . . . 
    . . . . . . . . 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . . 2 2 2 b . . . . 
    . . . . . b b b b d d b . . . . 
    . . . . 1 1 b b b b b f . . . . 
    . . . . f f f f f f f f . . . . 
    `, img`
    . . . . . . f f f . . . . . . . 
    . . . . f f 8 8 8 f . . . . . . 
    . . . . f 6 f 8 8 f f . . . . . 
    . . . f 6 6 6 f f 6 6 . . . . . 
    . . . f 1 1 1 6 6 1 1 f . . . . 
    . . . f 6 6 f 1 1 6 6 f . . . . 
    . . . f 1 1 f 6 6 f 1 f . . . . 
    . . . f 6 6 f 1 1 f 6 f . . . . 
    . . . f 1 1 f 6 6 f 1 f . . . . 
    . . . f 6 6 f 1 1 f 6 f . . . . 
    . . . f 1 1 f 6 6 f 1 f . . . . 
    . . . f 6 6 f f f f 6 f . . . . 
    . . . f 1 1 f . . f 1 f . . . . 
    . . . f 6 6 f . . f 6 f . . . . 
    . . . . f f . . . . f . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
vivianDarkImg = img`
    . f f f f f f f f f f f f . . . 
    f f f . f f f f f b b f f f . . 
    f f . f f f f f b b b b f f . . 
    f f . f f f f b b b b b b b f . 
    . . . f f f b b b f b b b f f . 
    . . . f f b b b b b b b b b f . 
    . . . . f b b b b b b b b b f . 
    . . . . f c c c c c c c c c f . 
    . . . . f c c c c c c c c c f . 
    . . . . f c b b c c c c c c f . 
    . . . . f c b b c c c c c c f . 
    . . . . f c c b 8 8 c c c c f . 
    . . . . . f 8 b 8 8 c c c c f . 
    . . . . . f f f 8 8 f f f f f . 
    . . . . . 6 f f f f f f f . . . 
    . . . . . . f b b b f f b b b . 
    `
vivianLightImg = img`
    . f f f f f f f f f f f f . . . 
    f f f . f f f f f d d f f f . . 
    f f . f f f f f d d d d f f . . 
    f f . f f f f d d d d d d d f . 
    . . . f f f d d d f d d d f f 5 
    . . . f f d d d d d d d d d 5 . 
    . . . . f d d d d d d d d 5 f . 
    . . . . f 2 2 2 2 2 2 2 5 2 f . 
    . . . . f 2 2 2 2 2 2 2 5 2 f . 
    . . . . f 2 d d 2 2 2 5 2 2 f . 
    . . . . f 2 d d 2 2 5 2 2 2 f . 
    . . . . f 2 2 d 8 4 2 2 2 2 f . 
    . . . . . f 8 d 8 4 5 5 5 5 5 5 
    . . . . . f f f 8 4 f f f f f . 
    . . . . . . f f f f 5 5 f . . . 
    . . . . . . f d d d f f 5 5 d . 
    `
setTilemap()
// jadons code
vivian = sprites.create(vivianDarkImg, SpriteKind.Player)
controller.moveSprite(vivian)
tiles.placeOnTile(vivian, tiles.getTileLocation(3, 5))
scene.cameraFollowSprite(vivian)
createAllMonsters()
let battery = statusbars.create(20, 4, StatusBarKind.Health)
battery.attachToSprite(vivian)
game.onUpdateInterval(50, function () {
    if (darkIsOff) {
        battery.value -= 1
    }
})
