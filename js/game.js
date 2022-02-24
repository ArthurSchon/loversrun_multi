const db = require('mongoose')

main().catch(err => console.log(err));

async function main() {
    await db.connect('mongodb://localhost:27017/test');
}

let app = new PIXI.Application({width: 840, height: 640})

document.body.appendChild(app.view)