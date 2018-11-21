
document.getElementById('link').innerHTML = config.text.link;
var audio = `<div data-video=${config.videoID} data-autoplay="1" data-loop="1" id="youtube-audio"> </div>`;
if (config.music === true) { 
 $("body").append(audio);
} 

$(function () {

    var llllll = config.images.forEach(appen)
    function appen(i) {
        document.getElementById("bg").innerHTML= document.getElementById("bg").innerHTML + `<img width="100%"height="100%" src=imgs/${i}>`;
}
    function random(pp) {
        return Math.floor(Math.random() * pp);
    }
    var img = $('div#bg img');
    var len = img.length;
    var current = random(len);
    img.hide();
    img.eq(current).show();

    var x = setInterval(function () {
        img.eq(current).fadeOut(config.transitionInterval, function () {
            current = random(len);
            img.eq(current).fadeIn(config.transitionInterval);
        });
    }, 2 * config.transitionInterval + config.imgInterval);
})

function onYouTubeIframeAPIReady() {
var e = document.getElementById("youtube-audio"), 
t = document.createElement(null); 
e.appendChild(t); var a = document.createElement("div"); 
a.setAttribute("id", "youtube-player"), e.appendChild(a); 
var o = function (e) { 
    t.setAttribute("src", "https://i.imgur.com/" + a) }; 
    e.onclick = function () { r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING ? (r.pauseVideo(), o(!1)) : (r.playVideo(), o(!0)) }; var r = new YT.Player("youtube-player", { height: "0", width: "0", videoId: e.dataset.video, playerVars: { autoplay: e.dataset.autoplay, loop: e.dataset.loop }, events: { onReady: function (e) { r.setPlaybackQuality("small"), r.setVolume(config.musicVolume) 
    o(r.getPlayerState() !== YT.PlayerState.CUED) }, 
    onStateChange: function (e) { e.data === YT.PlayerState.ENDED && o(!1) } } }) 
}

var count = 0;
var thisCount = 0;


const handlers = {
    startInitFunctionOrder(data) {
        count = data.count;

        document.querySelector('.letni h3').innerHTML += [data.type][data.order - 1] || '';
    },

    initFunctionInvoking(data) {
        document.querySelector('.yeet').style.left = '0%';
        document.querySelector('.yeet').style.width = ((data.idx / count) * 100) + '%';
    },

    startDataFileEntries(data) {
        count = data.count;

        document.querySelector('.letni h3').innerHTML += "\u{1f358}";
    },

    performMapLoadFunction(data) {
        ++thisCount;

        document.querySelector('.yeet').style.left = '0%';
        document.querySelector('.yeet').style.width = ((thisCount / count) * 100) + '%';
    },

    onLogLine(data) {
        document.querySelector('.letni p').innerHTML = data.message + "..!";
    }
};

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();


var flakes = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    flakeCount = 400,
    mX = -100,
    mY = -100

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
        var flake = flakes[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = flake.x,
            y2 = flake.y;

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2;

            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;

        } else {
            flake.velX *= .98;
            if (flake.velY <= flake.speed) {
                flake.velY = flake.speed
            }
            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
        }

        ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
        flake.y += flake.velY;
        flake.x += flake.velX;
            
        if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
        }


        if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(snow);
};

function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.5;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
    for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 3) + 2,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

        flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random()) / 30,
            step: 0,
            opacity: opacity
        });
    }

    snow();
};

canvas.addEventListener("mousemove", function(e) {
    mX = e.clientX,
    mY = e.clientY
});

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

init();

window.addEventListener('message', function (e) {
    (handlers[e.data.eventName] || function () { })(e.data);
});
