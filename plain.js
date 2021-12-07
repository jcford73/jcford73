'use strict';
(function () {
    var splash = document.getElementById('splash-container');
    var modal = document.getElementById('modal-container');
    var welcome = document.getElementById('welcome-box');
    var comeInButton = document.getElementById('come-in-button');

    var lines = [
        'Hi there.', //
        "I'm JC.",
        'This is my portfolio.',
    ];

    var buttonWait = 500;

    if (splash.addEventListener) {
        splash.addEventListener('click', function () {
            window.location = '/welcome'
        }, false);
    }

    for (var i = 0; i < lines.length; i++) {
        buttonWait += lines[i].length * 50 + 450;
        lines[i] = lines[i].split('');
    }

    function showWelcome(lines, div) {
        var line = lines[0];
        // console.log(line.length, line);
        if (line.length == 0) {
            if (lines.length <= 1) return;
            lines.shift();
            div = document.createElement('div');
            welcome.appendChild(div);
            setTimeout(function () {
                showWelcome(lines);
            }, 450);
            return;
        }
        if (!div) {
            div = document.createElement('div');
            welcome.appendChild(div);
        }
        var letter = line.shift();
        if (letter) {
            var span = document.createElement('span');
            span.innerHTML = letter;
            div.appendChild(span);
        }
        setTimeout(function () {
            showWelcome(lines, div);
        }, 50);
    }

    showWelcome(lines);

    setTimeout(function () {
        splash.className = 'intro-done';
    }, buttonWait);
})();
