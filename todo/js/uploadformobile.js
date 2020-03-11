const mfileLabel = document.getElementById("mfilelabel")
const mfile = document.getElementById("mfile")
let filter = "win16|win32|win64|mac";

mfile.addEventListener("change", uploadHandler);

/* 기기가 모바일이면 파일 선택 */
if(navigator.platform) {
    if(0 > filter.indexOf(navigator.platform.toLowerCase())) {
        photo.innerText = '';
        mfileLabel.style.display = "block";    
    }
}

function uploadHandler(e) {
    let files = e.target.files;
    if(files.length > 1) {
        alert("Just one image, please.");
        return;
    }
    if(files[0].type.match(/image.*/)) {
        let objectURL = window.URL.createObjectURL(files[0]);
        photo.style.backgroundImage = "url(" + window.URL.createObjectURL(files[0]) +")";
        photo.style.backgroundSize = "100% 100%";
        photo.style.backgroundRepeat = "no-repeat";
        mfileLabel.style.display = "none";  
    } else {
        alert("The file type must be an image");
        return;
    }
}