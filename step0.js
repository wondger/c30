/*
 * @name: step0.js
 * @description: 
 * @author: 棪木(wondger@gmail.com)
 * @date: 2013-07-23
 * @param: 
 * @todo: 
 * @changelog: 
 */
KISSY.ready(function(S){
    var c = S.one("#J_Canvas"),
        ctx = c && c[0].getContext('2d'),
        ofst = c.offset();

    var coords = [
        {x: 789, y: 341}
        ,{x: 729, y: 110}
        ,{x: 802, y: 110}
        ,{x: 875, y: 110}
        ,{x: 725, y: 187}
        ,{x: 798, y: 187}
        ,{x: 872, y: 187}
        ,{x: 720, y: 264}
        ,{x: 793, y: 264}
        ,{x: 867, y: 264}
        ,{x: 716, y: 341}
        ,{x: 863, y: 341}
    ];

    var _MSG_ = 0,
        _BLOWC_ = 0;

    function draw(img, x, y, a) {
        var i = new Image();
        i.onload = function() {
            if (a) {
                ctx.save();
                ctx.globalAlpha = a;
            }
            ctx.drawImage(i, x, y);
        }
        i.src = img;
    }

    draw("http://img03.taobaocdn.com/tps/i3/T1pkJ5FXRcXXaBRMbX-1024-624.png", 0, 0);

    function kd(i) {
        if (!S.isNumber(i) || i < 0 || i > 11) return;

        draw("http://img02.taobaocdn.com/tps/i2/T18WNOFoxgXXaST7zk-63-63.png", coords[i].x, coords[i].y);
    }

    function fingerprint(x, y, r, n) {
        var r0 = r;
        while (n--) {
            var arc = Math.random() * 2 * Math.PI,
                r = Math.random() * r0;
            point(x + Math.cos(arc) * r, y + Math.sin(arc) * r, "rgba(200, 200, 200," + (.5 + .5 * Math.random()) + ")")
        }
    }

    function fp(x, y, a) {
        draw("http://img03.taobaocdn.com/tps/i3/T1hdd6FbhaXXclgZYg-44-45.png", x, y, a);
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
        return [0,1,2,3,4,5,6,7,8,9].sort(function(){
            return Math.random() > .5;
        }).slice(4);
    }

    function getKey(x, y) {
        var i = 0,
            pt;

        while (pt = coords[i]) {
            if (x > pt.x && x < pt.x + 65 && y > pt.y && y < pt.y + 60) {
                return i;
            }

            i++;
        }
    }

    var pwd = password(),
        _pwd_ = "";

    window.powder = {
        blow: function() {
            if (_BLOWC_ >= 10) return;
            _BLOWC_ ++;
            S.each(pwd, function(n) {
                //fingerprint(coords[n].x + 31, coords[n].y + 28, 20, Math.floor(Math.random() * 100));
                fp(coords[n].x + 3 + n%5, coords[n].y + 7 + n%3, Math.random() * .04);
            });

            fp(coords[11].x + 5, coords[11].y + 5, Math.random() * .04);
        }
    };

    window.onresize = function(){
        if ((window.outerHeight - window.innerHeight) > 50 ) {
            window._co_ = 1;
            bn();
        }
        else {
            window._co_ = 0;
        }
    }

    function bn() {
        var b = "======================================\n"
                + "          Welcome to CXA!\n"
                + "Run powder.blow() to show fingerprint.\n"
                + "======================================";

        if (!_MSG_ && window.console && window.console.info) {
            _MSG_ = 1;
            window.console.clear && window.console.clear();
            window.console.info(b);
        }
    }

    S.one(window).fire("resize");

    c.on("mousedown", function(e){
        var k = getKey(e.clientX - ofst.left + window.scrollX, e.clientY - ofst.top + window.scrollY);

        //kd(k);

        if (k === 10) {
            _pwd_ = "";
        }
        else if (k === 11) {
            if (_pwd_ === pwd.join("")) {
                alert("Pass!");
            }
            else {
                alert("Opps，不是这个密码！");
                _pwd_ = "";
            }
        }
        else if (S.isNumber(k)){
            _pwd_ += k;
        }
    })
    .on("mousemove", function(e){
        var k = getKey(e.clientX - ofst.left + window.scrollX, e.clientY - ofst.top + window.scrollY);

        if (S.isNumber(k) && k >= 0 && k <= 11) {
            c.css({"cursor": "pointer"});
        }
        else {
            c.css({"cursor": "auto"});
        }
    });
});
