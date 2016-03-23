
'use strict';

var
    Vec     = require('./modules/Vec'),
    M       = require('./modules/Math'),
    Utils   = require('./modules/Utils'),
    gfx     = require('./modules/Graphics'),

    PIXI    = require('pixi'),
    $       = require('jquery');

window.M = M;
(function(win, doc, c) {

    var stage,
        renderer,
        w = win.innerWidth,
        h = win.innerHeight,

        // These are all used for the main rendering loop
        now,
        then = Date.now(),
        interval = 1000/60,
        delta,

        lad = new PIXI.Graphics();

    function render() {
        window.requestAnimationFrame(render);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
            renderer.render(stage);
        }
    }

    function gen() {
        var mag = 64,
            poly = new Vec(M.rand(mag*2, w-(mag*2)), M.rand(mag, h-(mag*2))),
            rot = M.rand(-Math.PI, Math.PI),
            norm = new Vec(1, 1).rotate(rot, true),

            A = poly.plusNew(norm.clone().rotate(90, false).multiplyNew(mag)),
            B = poly.plusNew(norm.clone().rotate(180, false).multiplyNew(mag)),
            C = poly.plusNew(norm.clone().rotate(270, false).multiplyNew(mag)),
            D = poly.plusNew(norm.clone().rotate(360, false).multiplyNew(mag)),

            width = M.rand(3, 10),
            height = M.rand(3, 10);

        lad.beginFill(0xFFFFFF, 1);
        lad.drawCircle(A.x, A.y, 3);
        lad.drawCircle(B.x, B.y, 3);
        lad.drawCircle(C.x, C.y, 3);
        lad.drawCircle(D.x, D.y, 3);

        console.log(A, B, C, D);
    }

    function init() {

        stage = new PIXI.Container();
        renderer = new PIXI.WebGLRenderer(w, h, {
            view: c,
            backgroundColor: 0x38092F,
            antialias: true
        });

        stage.addChild(lad);

        gen();

        // Start the rendering loop wahey oh yeah
        window.requestAnimationFrame(render);
    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
