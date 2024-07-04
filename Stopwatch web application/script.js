var hours=0;
var minutes=0;
var seconds=0;
var start=document.getElementById('start');
var reset=document.getElementById("reset");
var lap=document.getElementById('lap');
var lap_div = document.getElementById("laps");

function double_digits(num) {
    return num <= 9 ? '0' + num.toString() : num;
}

window.onload = function () {
    lap_count = 0;
    var h = document.getElementById("hours");
    var m = document.getElementById("minutes");
    var s = document.getElementById("seconds");
    h.style.fontSize = '48px';
    m.style.fontSize = '42px';
    s.style.fontSize = '30px';
    var stopwatch = document.getElementById("stopwatch");
    var outerCircle=document.querySelector('.outer-circle');

    var interval;

    listen_start();

    function run() {
        reset.style.visibility = 'visible';
        lap.style.visibility = 'visible';

        if (start.innerText == 'Start') {
            start.innerText = 'Pause';
            outerCircle.classList.add('running');
            interval = setInterval(function () {
                seconds += 1;
                if (seconds == 60) {
                    seconds = 0;
                    minutes += 1;
                    m.innerText = double_digits(minutes);
                }
                if (minutes == 60) {
                    minutes = 0;
                    hours += 1;
                    h.innerText = double_digits(hours);
                }
                s.innerText = double_digits(seconds);
            }, 10);
        } else {
            clearInterval(interval);
            start.innerText = 'Start';
            outerCircle.classList.remove('running');
        }
    }

    reset.addEventListener('click', function () {
        clearInterval(interval);
        hours = 0;
        minutes = 0;
        seconds = 0;
        h.innerText = double_digits(hours);
        m.innerText = double_digits(minutes);
        s.innerText = double_digits(seconds);
        reset.style.visibility = 'hidden';
        lap.style.visibility = 'hidden';
        lap_div.innerHTML = '';
        start.innerText='Start';
        lap_count=0;
        outerCircle.classList.remove('running');
    });

    lap.addEventListener('click', function () {
        lap_count += 1;
        lap_div.innerHTML += `<div id='lap_list'>Lap ${lap_count} - ${double_digits(hours)}:${double_digits(minutes)}:${double_digits(seconds)}</div>`;
    });

    function listen_start() {
        start.addEventListener('click', run);
    }
}
