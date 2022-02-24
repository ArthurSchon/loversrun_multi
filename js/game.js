const WIDTH = document.body.getBoundingClientRect().width
const HEIGHT = document.body.getBoundingClientRect().height

class Button{
    constructor(app, x, y, text) {
        this.sprite = PIXI.Texture.WHITE
        this.sprite.tint = "#B6B6B6"
        this.button = new PIXI.Sprite(this.sprite)
        this.text = new PIXI.Text(text)
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
        app.stage.addChild(this.button)
        app.stage.addChild(this.text)
    }
}

function initTitle(app) {
    const starTexture = PIXI.Texture.from('../images/heart3.png');

    const starAmount = 1000;
    let cameraZ = 0;
    const fov = 20;
    const baseSpeed = 0.025;
    let speed = 0;
    let warpSpeed = 0;
    const starStretch = 5;
    const starBaseSize = 0.05;


// Create the stars
    const stars = [];
    for (let i = 0; i < starAmount; i++) {
        const star = {
            sprite: new PIXI.Sprite(starTexture),
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

        // Calculate star positions with radial random coordinate so no star hits the camera.
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;
        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }

// Change flight speed every 5 seconds
    setInterval(() => {
        warpSpeed = warpSpeed > 0 ? 0 : 1;
    }, 5000);

// Listen for animate update
    app.ticker.add((delta) => {
        // Simple easing. This should be changed to proper easing function when used for real.
        speed += (warpSpeed - speed) / 20;
        cameraZ += delta * 10 * (speed + baseSpeed);
        for (let i = 0; i < starAmount; i++) {
            const star = stars[i];
            if (star.z < cameraZ) randomizeStar(star);

            // Map star 3d position to 2d with really simple projection
            const z = star.z - cameraZ;
            star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
            star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

            // Calculate star scale & rotation.
            const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
            const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
            const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
            const distanceScale = Math.max(0, (2000 - z) / 2000);
            star.sprite.scale.x = distanceScale * starBaseSize;
            // Star is looking towards center so that y axis is towards center.
            // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
            star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
    });


    const style = new PIXI.TextStyle({
        fill: "white",
        fontSize: 50,
        fontStyle: "italic",
        fontWeight: "bold",
        align: "center",
        stroke: "#b80000",
        strokeThickness: 2,
    });
    const title = new PIXI.Text('Lovers Run', style);
    title.x = 800;
    title.y = 50;
    app.stage.addChild(title)
}

function menu(app) {
    initTitle(app)
    new Button(app,WIDTH / 2, HEIGHT / 4, "Start")
    new Button(app,WIDTH / 2, HEIGHT / 2.5, "Loading Game")
    new Button(app,WIDTH / 2, HEIGHT / 1.8, "Options")
    new Button(app,WIDTH / 2, HEIGHT / 1.4, "Credits")
}

function initApp() {
    return new PIXI.Application({ width: WIDTH, height: HEIGHT });
}

function run() {
    let app = initApp()
    document.body.appendChild(app.view);
    menu(app)
}

run()
