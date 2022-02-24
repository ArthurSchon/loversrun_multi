const WIDTH = 920
const HEIGHT = 600

function initTitle(text, app, x, y) {
    let title = new PIXI.Text(text)
    title.x = x
    title.y = y
    title.style.fill = '#FFF'
    app.stage.addChild(title)
}

function initApp() {
    return new PIXI.Application({ width: WIDTH, height: HEIGHT });
}

function run() {
    let app = initApp()
    document.body.appendChild(app.view);
    initTitle('Lovers Run', app, 400, 0)
}

run()