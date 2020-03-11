const photo = document.getElementById("photo");

photo.addEventListener("dragover", dragHandler);
photo.addEventListener("dragleave", dragHandler);
photo.addEventListener("drop", dropHandler);

function dragHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.type == "dragover") {
        photo.style.background = "rgba(100, 100, 100, 0.1)";
    }
    else {
        photo.style.background = "#fff";
    }
}

function dropHandler(e) {
    e.stopPropagation();
    e.preventDefault();

    photo.innerText = '';
    dragHandler(e);

    let files = e.dataTransfer.files;
    if(files.length > 1) {
        alert("Just one image, please.");
        return;
    }
    if(files[0].type.match(/image.*/)) {
        let objectURL = window.URL.createObjectURL(files[0]);
        photo.style.backgroundImage = "url("+objectURL+")";
        photo.style.backgroundSize = "100% 100%";
        photo.style.backgroundRepeat = "no-repeat";
    } else {
        alert("The file type must be an image");
        return;
    }
}