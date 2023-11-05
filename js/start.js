const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const allchon = document.querySelector("#allRes");

const endPoint = 12;
let select = [0,0,0,0,0,0,]; //사용자의 첫~끝까지의 선택값 담김

function calResult(){
    console.log(select);
    var result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;

    const resultRec = document.querySelector('.resultRec');
    resultRec.innerHTML = infoList[point].rec;

    const resultNrec = document.querySelector('.resultNrec');
    resultNrec.innerHTML = infoList[point].nrec;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450);
        setResult();
    }
)}

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer); //a에 소속되도록 <div> 내부에 button 만들어짐
    answer.innerHTML = answerText;

    //사용자가 버튼 눌렀을 때
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
                select[target[i]] += 1;
            }

            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 400)
    }, false);
}

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 400);
        let qIdx = 0;
        goNext(qIdx);
    }, 400);
}


function restart(){
    location.replace(location.href);
}
