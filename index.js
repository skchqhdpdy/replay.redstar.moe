//favicon 설정
const favicon = document.createElement("link")
favicon.href = "favicon.ico"
favicon.rel = "shortcut icon"
favicon.type = "image/x-icon"
document.querySelector("head").appendChild(favicon)
console.log(document.querySelector("head"))


//filename.json 가져오기
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

//usage:
if (window.sessionStorage.getItem("Reverse") == null) {
  readTextFile("./filename.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
    window.localStorage.clear()
    for (let i = 0; i < data.length; i++) {
      window.localStorage.setItem(i, data[i])
    }
  });
}

//로컬스토리지, 세션스토리지 삭제 함수
function clearStorage() {
  window.localStorage.clear()
  window.sessionStorage.clear()
  location.reload(true)
  return "localStorage, sessionStorage is cleared"
}

//비디오 호버링 변수 값
let keepVideoSecond = []
keepVideoSecond.length = window.localStorage.length

//100ms뒤 실행
setTimeout(() => {
  //동영상 추가 & 비디오 호버링
  for (let i = 0; i < window.localStorage.length; i++) {
    //비디오 태그 넣기
    const addVideo = document.createElement("video")
    addVideo.id = document.querySelectorAll("video").length
    addVideo.controls = true
    addVideo.volume = 0.2
    document.querySelector("div").appendChild(addVideo)

    //영상 주소 넣기
    const addVideoLink = document.createElement("source")
    addVideoLink.src = `http://aodd.xyz:81/replay.redstar.moe/${window.localStorage.getItem(i)}`;
    //addVideoLink.src = window.localStorage.getItem(i);
    document.querySelectorAll("video")[i].appendChild(addVideoLink)

    //영상이름 + 링크연결 넣기
    const addVideoName = document.createElement("h1")
    const addVideoNameLink = document.createElement("a")

    addVideoNameLink.href = window.localStorage.getItem(i)
    addVideoNameLink.target = "_blank"

    addVideoNameLink.innerText = window.localStorage.getItem(i)

    document.querySelector("div").appendChild(addVideoName)
    document.querySelectorAll("h1")[i].appendChild(addVideoNameLink)

    //br 태그 넣기
    for (let i = 1; i <= 10; i++) {
      const addBr = document.createElement("br")
      document.querySelector("div").appendChild(addBr)
    }



    //호버링시 재생
    const addJsInHtml = document.createElement("script")
    addJsInHtml.innerHTML = `
    //호버링시 재생
    const video${i} = document.getElementById("${i}");
    function startPreview${i}() {
      video${i}.muted = false;
      video${i}.currentTime = keepVideoSecond[${i}];
      //video.playbackRate = 0.5;
      video${i}.volume = 0.2
      video${i}.play();
    }
    function stopPreview${i}() {
      //video.currentTime = 0;
      //video.playbackRate = 1;
      video${i}.pause();
      keepVideoSecond[${i}] = video${i}.currentTime
      console.log("%d번 동영상 - %f Second", ${i}, keepVideoSecond[${i}])
      console.log(keepVideoSecond)
    }
    video${i}.addEventListener("mouseenter", () => {
      startPreview${i}();
    });
    video${i}.addEventListener("mouseleave", () => {
      stopPreview${i}();
    });
    `
    document.querySelector("body").appendChild(addJsInHtml)

    //호버링 비디오 재생전 시간초 변수 값
    keepVideoSecond[i] = 0

  }
  setTimeout(() => {
    console.log(keepVideoSecond)
  }, 1000);


  //비디오 Resize
  const videoResize = document.querySelectorAll("video")
  function rs() {
    let width = innerWidth
    let height = innerHeight
    console.log(width, height)
    for (let i = 0; i < videoResize.length; i++) {
      
      videoResize[i].width = (width / 2) - ((width / 2) / 10)
      videoResize[i].height = (width / 2) / (16 / 9) - ((width / 2) / (16 / 9) / 10)
      //console.log(videoResize[i])
      
    }

  }
  rs()
  window.addEventListener("resize", rs)

}, 100);


//reverse 버튼 클릭
const reverseBtnClick = document.getElementById("reverse_data")

function runReverse() {
  if (window.sessionStorage.getItem("Reverse") == 1) {
    window.sessionStorage.clear()
    location.reload(true)
  }
  else{
    //비디오 배열 뒤집기
    readTextFile("./filename.json", function(text){
      var data = JSON.parse(text);
      
      let arr = []
      for (let i = 0; i < data.length; i++) {
        arr[i] = data[i]
      }
      arr.reverse()
      window.localStorage.clear()
    
      for (let i = 0; i < data.length; i++) {
        window.localStorage.setItem(i, arr[i])
      }
      
      window.sessionStorage.setItem("Reverse", 1)
  
      location.reload(true)
      
    })
  }
  
}
reverseBtnClick.addEventListener("click", runReverse)