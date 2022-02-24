const WIDTH = document.body.getBoundingClientRect().width
const HEIGHT = document.body.getBoundingClientRect().height

function initTitle(app) {
    const style = new PIXI.TextStyle({
        fill: "white",
        fontSize: 30,
        fontStyle: "italic",
        fontWeight: "bold",
        align: "right"
    });
    const style1 = new PIXI.TextStyle({
        fill: "white",
        fontSize: 30,
        fontStyle: "italic",
        fontWeight: "bold",
        align: "center",
        letterSpacing: 20
    });
    const title = new PIXI.Text('I want to back it up with you OHOHOH', style);
    const title1 = new PIXI.Text('I want to back it up with you yolo', style1);
    app.stage.addChild(title)
    app.stage.addChild(title1)
}

function initApp() {
    return new PIXI.Application({ width: WIDTH, height: HEIGHT });
}

function run() {
    let app = initApp()
    document.body.appendChild(app.view);
    initTitle(app)
}

run()
