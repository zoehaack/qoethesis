document.addEventListener('DOMContentLoaded', function () {
   let isSafari =navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
   navigator.userAgent &&
   navigator.userAgent.indexOf('CriOS') == -1 &&
   navigator.userAgent.indexOf('FxiOS') == -1;
    
    if(isSafari){
        document.getElementById('body').style.display = 'none';
        document.getElementById('safari').classList.remove("hide");
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById('body').style.display = 'none';
        document.getElementById('mobile').classList.remove("hide");
    }
    customPlay(); //own play effect
    mturk(); //save id
    formDisplay(); // display form after played
}, false);


//video arrays

const exampleVid = "https://qoe-thesis.s3.eu-central-1.amazonaws.com/example/final_example.mp4";

const bbb = ["https://qoe-thesis.s3.eu-central-1.amazonaws.com/bb/final_Ha_BBB.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/bb/final_Ms_BBB.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/bb/final_Os_BBB.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/bb/final_Ts_BBB.mp4"];

const ed = ["https://qoe-thesis.s3.eu-central-1.amazonaws.com/ed/final_Ha_ED.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/ed/final_Ms_ED.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/ed/final_Os_ED.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/ed/final_Ts_ED.mp4"];

const swacc = ["https://qoe-thesis.s3.eu-central-1.amazonaws.com/sa/final_Ha_SWACC.mp4",
                "https://qoe-thesis.s3.eu-central-1.amazonaws.com/sa/final_Ms_SWACC.mp4", 
                "https://qoe-thesis.s3.eu-central-1.amazonaws.com/sa/final_Os_SWACC.mp4", 
                "https://qoe-thesis.s3.eu-central-1.amazonaws.com/sa/final_Ts_SWACC.mp4"];

const tos = ["https://qoe-thesis.s3.eu-central-1.amazonaws.com/ts/final_Ha_TOS.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/ts/final_Ms_TOS.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/ts/final_Os_TOS.mp4", 
            "https://qoe-thesis.s3.eu-central-1.amazonaws.com/ts/final_Ts_TOS.mp4"];
/*
const exampleVid = "./example/final_example.mp4";

const bbb = ["./bb/final_Ha_BBB.mp4", 
            "./bb/final_Ms_BBB.mp4", 
            "./bb/final_Os_BBB.mp4", 
            "./bb/final_Ts_BBB.mp4"];

const ed = ["./ed/final_Ha_ED.mp4", 
            "./ed/final_Ms_ED.mp4", 
            "./ed/final_Os_ED.mp4", 
            "./ed/final_Ts_ED.mp4"];

const swacc = ["./sa/final_Ha_SWACC.mp4",
                "./sa/final_Ms_SWACC.mp4", 
                "./sa/final_Os_SWACC.mp4", 
                "./sa/final_Ts_SWACC.mp4"];

const tos = ["./ts/final_Ha_TOS.mp4", 
            "./ts/final_Ms_TOS.mp4", 
            "./ts/final_Os_TOS.mp4", 
            "./ts/final_Ts_TOS.mp4"];

*/


const videos = [bbb, ed, swacc, tos];

let randomized = [];

let randomizedObj;
let mturkident;

let scrollingElement = (document.scrollingElement || document.body);

const firstDiv = document.getElementById('one');
const secDiv = document.getElementById('two');
const thirdDiv = document.getElementById('three');
const fourthDiv = document.getElementById('four');

const vid0 = document.getElementById('example');
const vid1 = document.getElementById('video1');
const vid2 = document.getElementById('video2');
const vid3 = document.getElementById('video3');
const vid4 = document.getElementById('video4');

const vidElements = [vid0, vid1, vid2, vid3, vid4];

const elProgress0 = document.getElementById('percentProgress0');
const elProgress1 = document.getElementById('percentProgress1');
const elProgress2 = document.getElementById('percentProgress2');
const elProgress3 = document.getElementById('percentProgress3');
const elProgress4 = document.getElementById('percentProgress4');

const progressFetch = [elProgress0, elProgress1, elProgress2, elProgress3, elProgress4];

const progressBar = document.getElementById('bar');

//randomize video array
function random() {
    randomized.push(exampleVid);
    while (randomized.length < 5) {
        for (r = 0; r < videos.length; r++) {
            check(r, (Math.floor(Math.random() * 4)));
        }
    }
}
//check if no doubles
function check(row, column) {
    if (randomized.some(e => e.includes((videos[row][column]).substring(58, 60)))) { //10,12
        return check(row, (Math.floor(Math.random() * 4)));
    } else {
        randomized.push(videos[row][column]);
    }
}
//adds event listener to video -> display forms after it ended
function formDisplay(){
    let formVideos = [vid1, vid2, vid3, vid4];
    let forms = document.getElementsByClassName("ratingForm");
    let buttons = [
        document.getElementById('firstButton'),
        document.getElementById('secondButton'),
        document.getElementById('thirdButton'),
        document.getElementById('fourthButton')

    ]
    vid0.addEventListener('ended', function (e) {
        document.getElementById('start').classList.remove("hide");
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
        document.body.style.background = "#ffffff";
    })
    for(let i = 0; i<formVideos.length; i++){
        formVideos[i].addEventListener('ended', function (e) {
            forms[i].classList.remove("hide");
            buttons[i].classList.remove("hide");
            scrollingElement.scrollTop = scrollingElement.scrollHeight;
            document.body.style.background = "#ffffff";
        })
    }
}

//test play pause
function customPlay(){
    let allVideos = document.getElementsByClassName('customPlay');
    let pausePlay = document.getElementsByClassName('playpause');
    let wrapper = document.getElementsByClassName('wrapper');
    for (let i = 0; i<allVideos.length; i++ ) {
        wrapper[i].addEventListener("click", function(e) {
            document.body.style.background = "#535353";
            if (allVideos[i].paused == true) {
              // Play the video
              scrollingElement.scrollTop = scrollingElement.scrollHeight;
              allVideos[i].play();
              pausePlay[i].classList.add("visibility");
            } else {
              // Pause the video
              allVideos[i].pause();
              pausePlay[i].classList.remove("visibility");
            }
        });
   }
}
//mturk id save
function mturk(){
    document.getElementById('mturkButton').addEventListener("click", function(e){
        let input = document.getElementById('mturkId').value;
        e.preventDefault();
        if(input == ""){
            alert('mturk ID or name is required');
        } else {
            mturkident = document.getElementById('mturkId').value;
            //getData(randomized[0], vidElements[0]);
            document.getElementById('explainer').classList.add('hide');
            document.getElementById('zero').classList.remove('hide');
            progressBar.style.width = "10%";
        }
    })
}

//start button
function startButton() {
    document.getElementById('start').classList.add('hide');
    document.getElementById('zero').classList.add('hide');
    //getData(randomized[1], vidElements[1]);
    firstDiv.classList.remove('hide');
    progressBar.style.width = "30%";
}
function firstButton() {
    firstDiv.classList.add('hide');
    //getData(randomized[2], vidElements[2]);
    secDiv.classList.remove('hide');
    progressBar.style.width = "50%";
}
function secondButton() {
    secDiv.classList.add('hide');
    //getData(randomized[3], vidElements[3]);
    thirdDiv.classList.remove('hide');
    progressBar.style.width = "70%";
}
function thirdButton() {
    thirdDiv.classList.add('hide');
    //getData(randomized[4], vidElements[4]);
    fourthDiv.classList.remove('hide');
    progressBar.style.width = "90%";
}
//last button
function end() {
    if (checkRadio() == 8) {
        submit();
        forCsv();
        document.getElementById('testing').classList.add('hide');
        document.getElementById('ending').classList.remove('hide');
        progressBar.style.width = "100%";
    } else {
        revise();
    }
}

//submit to db
function submit() {
    let submission = [];
    let counter = 0;
    document.querySelectorAll(".ratingForm").forEach(f => {
        let obj = {};
        f.querySelectorAll("input").forEach(ele => {
            if (ele.checked) {
                obj[ele.name] = ele.value;
            }
        })
        let videoSource = appendVideoSource(counter);
        Object.assign(obj,videoSource);
        submission.push(obj);
        counter++;
    })
    submission.push({mturkID: mturkident})
    let jsonData = JSON.stringify(submission, null, 2);
    requestHandler(jsonData, '/json');
}
//single randomized object
function appendVideoSource(count){
    switch(count){
        case 0:
            return {video1:randomized[1]};
        case 1:
            return {video2:randomized[2]};
        case 2:
            return {video3:randomized[3]};
        case 3:
            return {video4:randomized[4]};
        default:
            return;
    }
}
//all in one randomized object
function toObject(arr) {
    let clippedArr = arr.slice(1);
    var rv = {};
    for (var i = 0; i < clippedArr.length; ++i)
        if (clippedArr[i] !== undefined) {
            let test = `video${i + 1}`;
            rv[test] = clippedArr[i];
        }
    return rv;
}
//request for db
function requestHandler(data, path) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    }
    fetch(path, options)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            document.getElementById('staticUuid').value = data.completion;
        })
}

//for csv data
function forCsv() {
    //let csvArray = [];
    let obj = {};
    document.querySelectorAll("input").forEach(ele => {
        if (ele.checked) {
            obj[ele.name] = ele.value
        }
    })
    Object.assign(obj, randomizedObj);
    //csvArray.push(obj);
    let jsonData = JSON.stringify(obj, null, 2);
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    }
    fetch('/csv', options);
}

function revise() {
    let buttonRevise = document.getElementsByClassName('nextButton');
    for (const br of buttonRevise) {
        br.classList.add('hide');
    }
    let videoRevise = document.getElementsByClassName('video');
    for (const vr of videoRevise) {
        vr.classList.remove('hide');
    }
    let forms = document.getElementsByClassName("ratingForm");
    for(let i = 0; i<forms.length; i++){
        forms[i].classList.remove("hide");
    }

    document.getElementById('notAll').classList.remove('hide');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
//to see if radio buttons are all checked
function checkRadio() {
    const radios = document.querySelectorAll('input[type=radio]');
    let selected = 0;
    for (const rb of radios) {
        if (rb.checked) {
            selected++;
        }
    }
    return selected;
}

function copyClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("staticUuid");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  }

//---------indexedDB Database - browser storing-------------

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let db;
if(!window.indexedDB){
    alert("This browser doesn't support indexeddb");
}

const request = window.indexedDB.open("VideoDatabase", 2);

request.onerror = function() {
    console.log("Database failed to open");
};

request.onsuccess = function(){
    console.log("Database opened succesfully"); 
    db = request.result;
    init();
}


request.onupgradeneeded = function(e){
    console.log("upgrade is called");
    db = e.target.result;

    const vDb = db.createObjectStore("videoDB", { keyPath : "name" })
}

//initial function for indexed db

async function init(){
    random();
    randomizedObj = toObject(randomized);
    for(let i = 0; i < randomized.length; i++){
        await fetchVideo(randomized[i], progressFetch[i], vidElements[i]);
    }
}


//put indexed blobs/data to video element
function getData(key, vidElem){
    let objectStore = db.transaction("videoDB").objectStore("videoDB");
    let request =  objectStore.get(key);
    request.onsuccess = function(){
        if(request.result){
            console.log("taking vids from indexed db");
            addSourceToVideo(request.result.mp4, vidElem);

        }
    }
    request.onerror = function(){
        console.log(request.error);
    }
}

//helper function for adding blobs - creates sources and appends
function addSourceToVideo(src, element) {
    let mp4URL = URL.createObjectURL(src);

    var source = document.createElement('source');

    source.src = mp4URL;
    source.type = 'video/mp4';

    element.appendChild(source);
}

//updating progress bars with fetch
function progress({loaded, total}, progressElem) {
    progressElem.style.width = Math.round(loaded/total*100)+'%';
    progressElem.innerHTML = Math.round(loaded/total*100)+'%';
  }

//fetching videos and making blobs
async function fetchVideo(videoElemSource, progressElem, vid) {
    console.log('downloading with fetch()...');
    const response = await fetch(videoElemSource);
    const contentLength = response.headers.get('content-length');
    const total = parseInt(contentLength, 10);
    let loaded = 0;
  
    const res = new Response(new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        for (;;) {
          const {done, value} = await reader.read();
          if (done) break;
          loaded += value.byteLength;
          progress({loaded, total}, progressElem);
          controller.enqueue(value);
        }
        controller.close();
      },
    }));
    const blob = await res.blob();
    console.log('download completed');
    //progressElem.parentNode.classList.add("hide");
    storeVideo(blob, videoElemSource);
    getData(videoElemSource, vid);
  }

//storing video to indexeddb
 function storeVideo(blob,name){
    let objectStore = db.transaction("videoDB", "readwrite").objectStore('videoDB');
    let record = {
        mp4 : blob,
        name : name
    }
    let request = objectStore.add(record);

    request.onsuccess = function() {
        console.log(`Video ${record.name}was added to DB`);
      }
    
      request.onerror = function() {
        console.log(request.error);
      }
}

window.onunload = function(event) { 
    indexedDB.deleteDatabase("VideoDatabase");
 };
