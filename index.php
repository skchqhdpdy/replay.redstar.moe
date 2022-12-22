<?php  
// 폴더명 지정  
$dir = "./";  
  
// 핸들 획득  
$handle  = opendir($dir);  
  
$files = array();  
  
// 디렉터리에 포함된 파일을 저장한다.  
while (false !== ($filename = readdir($handle))) {  
if($filename == "." || $filename == ".."){  
continue;  
}  

#.mp4 확장자 체크
if ($ext = substr(strrchr($filename, '.'), 1) == "mp4") {
    
  
    // 파일인 경우만 목록에 추가한다.  
    if(is_file($dir . "/" . $filename)){  
        $files[] = $filename;  
        }  
    }  
}
  
// 핸들 해제  
closedir($handle);  
  
// 정렬, 역순으로 정렬하려면 rsort 사용  
rsort($files);  
  
$f = json_encode($files, JSON_PRETTY_PRINT);
echo $f;
echo " <-- 동영상 목록 php로 따서 json파일로 저장한거 따온거임 (동영상 개수 : ", count($files),"개)";
echo " 개발자 도구 콘솔에 여러가지 출력되게 만들어 놨으니 궁금하면 F12 ㄱㄱ ";

#filename.json 파일 생성
file_put_contents('filename.json', $f);
?>

<!-- /////////////////////////////////////////////////////////////////////////////////////////////////// -->

<!DOCTYPE html>
<html lang="ko">
<head>
    
    <title>Replay</title>

    <!-- <link href="./favicon.ico" rel="shortcut icon" type="image/x-icon">
 -->
</head>
<body style="background: pink;">

    <script>
        alert("마우스 호버링시 자동재생 됩니다. \n\nvideo is played automatically when hovering the mouse.")
    </script>

    <br>
    <button id="reverse_data">Reverse Data (Video)</button>

    <script>
        let width = innerWidth
        const btnStyle = document.getElementById("reverse_data").style

        if (window.sessionStorage.getItem("Reverse") == 1) {
            document.getElementById("reverse_data").innerText = "Return Data (Video)"
            console.log("비디오 리버스 된 상태")
        }
        btnStyle.marginLeft = (width / 2) - 41.2
        btnStyle.border = 0
        btnStyle.background = "#9370DB"
        btnStyle.display = "block"
        btnStyle.margin = "20px auto"
        btnStyle.textAlign = "center"
        btnStyle.border = "4px solid #FF0000"
        btnStyle.padding = "14px 80px"
        btnStyle.outline = "none"
        btnStyle.color = "yellow"
        btnStyle.borderRadius = "24px"
        btnStyle.transition = "0.25s"
        btnStyle.cursor = "pointer"
        document.getElementById("reverse_data").addEventListener("mouseenter", () => {
            btnStyle.background = "#FF0000"
        })
        document.getElementById("reverse_data").addEventListener("mouseleave", () => {
            btnStyle.background = "#9370DB"
        })

    </script>

    <div style="text-align: center;">

    <!-- <iframe width="720" height="480" src="./2022 10 16 04 22 15.mp4" frameborder="0"></iframe> -->

    </div>
    
    <script src="./index.js"></script>
      
</body>
</html>