/*
 * @name: app.js
 * @description: 
 * @author: wondger@gmail.com
 * @date: 2013-07-23
 * @param: 
 * @todo: 
 * @changelog: 
 */
KISSY.ready(function(S){
    var c = S.one("#J_Canvas"),
        ctx = c && c[0].getContext('2d');

    var coords = [
        {x: 740, y: 330}
        ,{x: 680, y: 120}
        ,{x: 750, y: 120}
        ,{x: 815, y: 123}
        ,{x: 675, y: 190}
        ,{x: 745, y: 195}
        ,{x: 810, y: 190}
        ,{x: 675, y: 260}
        ,{x: 745, y: 260}
        ,{x: 815, y: 260}
    ];

    function bg() {
        i = new Image();
        i.onload = function() {
            ctx.drawImage(i,0,0);
        }

        i.src = "images/i.png";
    }

    bg();

    function fingerprint(x, y, r, n) {
        var r0 = r;
        while (n--) {
            var arc = Math.random() * 2 * Math.PI,
                r = Math.random() * r0;
            point(x + Math.cos(arc) * r, y + Math.sin(arc) * r, "rgba(200, 200, 200," + (.2 + .5 * Math.random()) + ")")
        }
    }

    function point(x, y, rgba) {
        ctx.strokeStyle = rgba;
        ctx.lineCap = "square";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y + 1);
        ctx.stroke();
    }

    function password() {
        var n = 6,
            ret = [];

        while (n--) {
            ret.push(Math.floor(Math.random() * 10));
        }

        return ret;
    }

    var pwd = password();

    window.powder = {
        blow: function() {
            S.each(pwd, function(n, i) {
                fingerprint(coords[i].x, coords[i].y, 20, Math.floor(Math.random() * 50));
            });
        }
    };

});
