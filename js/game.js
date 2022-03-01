const WIDTH = document.body.getBoundingClientRect().width
const HEIGHT = document.body.getBoundingClientRect().height
const STYLE = new PIXI.TextStyle({
    fill: "white",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    align: "center",
    stroke: "#b80000",
    strokeThickness: 2,
    fontFamily: ['PublicPixel']
});

class Button{
    constructor(app, x, y, text) {
        this.texture = PIXI.Texture.from("../images/button.png")
        this.button = new PIXI.Sprite(this.texture)
        this.text = new PIXI.Text(text, {fontFamily: ['Public Pixel', 'sans-serif'], fontSize: 20, fill: "#FFF"})
        this.text.x = x
        this.text.y = y
        this.text.anchor.set(0.5)
        this.button.x = x
        this.button.y = y
        this.button.anchor.set(0.5)
        this.button.width = 300
        this.button.height = 75
        this.button.interactive = true
        this.button.buttonMode = true
        this.app = app
        this.app.stage.addChild(this.button)
        this.app.stage.addChild(this.text)
    }
}

class BackGroundTitle {
    constructor(app,x,y){
        this.rect = new PIXI.Graphics();

        this.rect.lineStyle(2, 0xFF0000, 1);
        this.rect.beginFill(0x2980B9, 0);
        this.rect.drawRoundedRect(x, y, 500, 100, 16);
        this.rect.endFill();
        this.rect.pivot.set(x/2.7, y/2);
        this.rect.zIndex = 0;
        app.stage.addChild(this.rect);

    }
}

class Text {
    constructor(app, x, y, text) {
        this.text = new PIXI.Text(text, STYLE);
        this.text.x = x;
        this.text.y = y;
        this.text.zIndex = 2;
        this.text.anchor.set(0.5);
        this.app = app;
        this.app.stage.addChild(this.text);
    }
}

class Sprite extends PIXI.Sprite{
    constructor(source) {
        super();
        this.source = source
        this.texture = PIXI.Texture.from(this.source);
        this.sprite = new PIXI.Sprite(this.texture)
    }
}

function background(app) {
    const starAmount = 1000;
    let cameraZ = 0;
    const fov = 20;
    const baseSpeed = 0.025;
    let speed = 0;
    let warpSpeed = 0;
    const starStretch = 5;
    const starBaseSize = 0.05;
    const stars = [];

    for (let i = 0; i < starAmount; i++) {
        const star = {
            sprite: new Sprite('../images/heart.png'),
            z: 0,
            x: 0,
            y: 0,
        };
        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = 0.7;
        randomizeStar(star, true);
        app.stage.addChild(star.sprite);
        stars.push(star);
    }

    function randomizeStar(star, initial) {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;
        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }

    setInterval(() => {
        warpSpeed = warpSpeed > 0 ? 0 : 1;
    }, 5000);

    app.ticker.add((delta) => {
        speed += (warpSpeed - speed) / 20;
        cameraZ += delta * 10 * (speed + baseSpeed);
        for (let i = 0; i < starAmount; i++) {
            const star = stars[i];
            if (star.z < cameraZ) randomizeStar(star);
            const z = star.z - cameraZ;
            star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
            star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;
            const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
            const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
            const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
            const distanceScale = Math.max(0, (2000 - z) / 2000);
            star.sprite.scale.x = distanceScale * starBaseSize;
            star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
    });
}

function menu(app) {
    background(app)
    new Text(app, WIDTH / 2, 100, "Lovers Run")
    new BackGroundTitle(app,WIDTH / 2,100);
    new Button(app,WIDTH / 2, HEIGHT / 4, "Start")
    new Button(app,WIDTH / 2, HEIGHT / 2.5, "Loading Game")
    new Button(app,WIDTH / 2, HEIGHT / 1.8, "Options")
    new Button(app,WIDTH / 2, HEIGHT / 1.4, "Credits")
}

function initApp() {
    return new PIXI.Application({ width: WIDTH, height: HEIGHT, backgroundColor: 0x2980b9 });
}

function run() {
    let app = initApp()
    document.body.appendChild(app.view);
    menu(app)
}

document.addEventListener("DOMContentLoaded", function() {
    run()
});
