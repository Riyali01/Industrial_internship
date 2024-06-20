let count = 0;
const box = document.getElementById("box");
const originalMargin = parseInt(window.getComputedStyle(box).marginTop, 10); // Get and parse the original margin
const pageHeight = document.body.offsetHeight;

function increaseMargin() {
    box.style.marginTop = originalMargin + count + "px";
    count += 10;
    if (originalMargin + count + box.offsetHeight >= pageHeight) {
        resetMargin();
    }
}

function resetMargin() {
    box.style.marginTop = originalMargin + "px";
    count = 0;
    clearInterval(intervalId);
}

const intervalId = setInterval(increaseMargin, 1000);
