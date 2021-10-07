var number = {};
var start = false;
var check = false;
var preData = {};
var wrapBox = document.querySelector('#hello_box')

function setNumberRandom() {
    return Math.floor(Math.random() * 30 + 1);
}

function reset() {
    score.innerText = '0';
    min.innerText = '00';
    seconds.innerText = '00';
    start = false;
    gameBox.innerHTML = createIcon();
    items = document.querySelectorAll('.game-box .item');
    itemClick();
    preData = {};
    check = false;
}

function createIcon() {
    var allHtml = '';
    for (let i = 0; i < 6; i++) {
        let html = '<div class="row">'
        for (let j = 0; j < 10; j++) {
            while (true) {
                let numberRandom = setNumberRandom();
                if (number[numberRandom] !== true) {
                    html += `<div class="col-1-10">
                            <div class="item" data="${numberRandom}"><img src="./image/${numberRandom}.png"></div>
                        </div>`;
                    if (number[numberRandom] === false) {
                        number[numberRandom] = true;
                    } else {
                        number[numberRandom] = false;
                    }
                    break;
                }
            }
        }
        html += '</div>';
        allHtml += html;
    }
    number = {};
    return allHtml;
}

function itemClick() {
    items.forEach((item) => {
        item.onclick = (e) => {
            start = true;
            let itemClick = e.target;
            if (itemClick.matches('.item')) {
                if (!e.target.classList.contains('active')) {
                    e.target.className = 'item active';
                    if (!check) {
                        e.target.classList.add('pre');
                        preData = {
                            data: e.target.getAttribute('data'),
                        };
                        check = true;
                    } else {
                        if (e.target.getAttribute('data') === preData.data) {
                            document.querySelector(`.item.active.pre`).className = 'item active success';
                            e.target.classList.add('success');
                            score.innerText = String(Number(score.innerText) + 1).padStart(2, '0');
                            if (score.innerText === '30') {
                                start = false;
                                let msg = document.createElement('div');
                                msg.setAttribute('id', 'msg');
                                let time = document.querySelector('.time>span');
                                msg.innerHTML = `<div>
                                                    <h2>Chiến thắng</h2>
                                                    <div class="msg-content">
                                                        <p><span>Score: </span><span>30</span></p>
                                                      <p><span>Time: </span><span>${time.innerText}</span></p>
                                                    </div>
                                                    <button>Chơi lại</button>
                                                    </div>`;
                                wrapBox.append(msg);
                                let replay = wrapBox.querySelector('#msg button');
                                replay.onclick = (e) => {
                                    msg.remove();
                                    reset();
                                }
                            }
                        } else {
                            document.querySelector(`.item.active.pre`).className = 'item active error pre';
                            e.target.classList.add('error');
                            setTimeout(() => {
                                e.target.classList.remove('active')
                                e.target.classList.remove('error')
                                document.querySelector(`.item.active.pre`).className = 'item';
                            }, 500);
                        }
                        preData = {};
                        check = false;
                    }
                }
            }

        }
    })
}

var gameBox = document.querySelector('.game-box');
gameBox.innerHTML = createIcon();
/****************************************************************/

var items = document.querySelectorAll('.game-box .item');
var score = document.querySelector('.score span');
var min = document.querySelector('.min');
var seconds = document.querySelector('.seconds');

// reset
var resetBtn = document.querySelector('.control button');

resetBtn.onclick = () => {
    reset();
}

setInterval(() => {
    if (start) {
        if (Number(seconds.innerText) === 59) {
            seconds.innerText = '00';
            min.innerText = String(Number(min.innerText) + 1).padStart(2, '0');
        } else {
            seconds.innerText = String(Number(seconds.innerText) + 1).padStart(2, '0');
            ;
        }
    }
}, 1000);
itemClick();

