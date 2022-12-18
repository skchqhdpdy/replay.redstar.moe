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
readTextFile("./filename.json", function(text){
  var data = JSON.parse(text);
  console.log(data);
  window.sessionStorage.clear()
  window.sessionStorage.clear()
  for (let i = 0; i < data.length; i++) {
    window.sessionStorage.setItem(i, data[i])
  }
  for (let i = 0; i < data.length; i++) {
    window.sessionStorage.setItem(i, data[i])
  }
  
});


//동영상 추가
for (let i = 0; i < window.sessionStorage.length; i++) {
  //비디오 태그 넣기 document.querySelector("iframe").contentDocument.querySelector("video").volume
  const addVideo = document.createElement("iframe")

  addVideo.src = window.sessionStorage.getItem(i)
  
  addVideo.id = document.querySelectorAll("iframe").length + 1
  document.querySelector("div").appendChild(addVideo)
  
console.log(document.querySelectorAll("iframe")[0].contentDocument.querySelector("video"))
console.dir(document.querySelectorAll("iframe")[0].contentDocument.querySelector("video"))
  //영상 주소 넣기
  document.querySelectorAll("iframe")[i].contentDocument.querySelector("video").volume = 0.4

  //영상이름 + 링크연결 넣기
  const addVideoName = document.createElement("h1")
  const addVideoNameLink = document.createElement("a")

  addVideoNameLink.href = window.sessionStorage.getItem(i)
  addVideoNameLink.target = "_blank"

  addVideoNameLink.innerText = window.sessionStorage.getItem(i)

  document.querySelector("div").appendChild(addVideoName)
  document.querySelectorAll("h1")[i].appendChild(addVideoNameLink)

  //br 태그 넣기
  for (let i = 1; i <= 10; i++) {
    const addBr = document.createElement("br")
    document.querySelector("div").appendChild(addBr)
  }
}



//비디오 Resize
const videoResize = document.querySelectorAll("video")
function rs() {
  let width = innerWidth
  let height = innerHeight
  console.log(width, height)
  for (let i = 0; i < videoResize.length; i++) {
    
    videoResize[i].width = width / 2
    videoResize[i].height = (width / 2) / (16 / 9)
    //console.log(videoResize[i])
    
  }
}
rs()
window.addEventListener("resize", rs)
