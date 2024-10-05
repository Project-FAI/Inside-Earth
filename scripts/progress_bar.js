const progress_bar = document.querySelector('.progress-bar');


function show(progress) {
    progress_bar.style.display = "block";
    progress_bar.style.width = (progress * 100) + "%";
}

function hide() {
    progress_bar.style.display = "none";
}

export default {show, hide};