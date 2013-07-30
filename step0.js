/*
 * @name: step0.js
 * @description: 
 * @author: —¦Ä¾(wondger@gmail.com)
 * @date: 2013-07-23
 * @param: 
 * @todo: 
 * @changelog: 
 */
KISSY.ready(function(S){
    var c = S.one("#J_Canvas"),
        ctx = c && c[0].getContext('2d');

    var coords = [
        {x: 735, y: 330}
        ,{x: 680, y: 120}
        ,{x: 750, y: 120}
        ,{x: 815, y: 123}
        ,{x: 675, y: 190}
        ,{x: 745, y: 195}
        ,{x: 810, y: 190}
        ,{x: 675, y: 260}
        ,{x: 745, y: 260}
        ,{x: 815, y: 260}
        ,{x: 665, y: 330}
        ,{x: 815, y: 330}
    ];

    var _MSG_ = 0,
        _BLOWC_ = 0;

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
            point(x + Math.cos(arc) * r, y + Math.sin(arc) * r, "rgba(200, 200, 200," + (.5 + .5 * Math.random()) + ")")
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
        return [0,1,2,3,4,5,6,7,8,9].sort(function(){
            return Math.random() > .5;
        }).slice(4);
    }

    function getKey(x, y) {
        var i = 0,
            pt;

        while (pt = coords[i]) {
            if (x > pt.x - 15 && x < pt.x + 50 && y > pt.y - 10 && y < pt.y + 50) {
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
                fingerprint(coords[n].x, coords[n].y, 20, Math.floor(Math.random() * 100));
            });
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
                + "          Welcomt to CXA!\n"
                + "Run powder.blow() to show fingerprint.\n"
                + "======================================";

        if (!_MSG_ && window.console && window.console.info) {
            _MSG_ = 1;
            window.console.clear && window.console.clear();
            window.console.info(b);
        }
    }

    S.one(window).fire("resize");

    c.on("click", function(e){
        var ofst = c.offset(),
            k = getKey(e.clientX - ofst.left + window.scrollX, e.clientY - ofst.top + window.scrollY);

        if (k === 10) {
            _pwd_ = "";
        }
        else if (k === 11) {
            if (_pwd_ === pwd.join("")) {
                alert("Pass!");
            }
            else {
                alert("Password Incorrect!");
                _pwd_ = "";
            }
        }
        else if (S.isNumber(k)){
            _pwd_ += k;
        }
    });

});
