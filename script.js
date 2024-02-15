let hexEl = document.getElementById("hexpicker");
let schemeEl = document.getElementById("schemePicker");
let btnEl = document.getElementById("btn-getscheme");

let hexvalue = '';
let schemevalue = '';

hexEl.addEventListener("change", selectHex);
schemeEl.addEventListener("change", selectScheme);
btnEl.addEventListener("click", getcolorscheme);

function selectHex(e) {
    hexvalue = e.target.value.replace("#", "");
}

function selectScheme(e) {
    schemevalue = e.target.value.toLowerCase();
}

function getcolorscheme() {
    let url = `https://www.thecolorapi.com/scheme?hex=${hexvalue}&mode=${schemevalue}&count=6`;
    let sectionEl = document.getElementById("section-displaycolours");

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let hexArray = data.colors;
        sectionEl.innerHTML = '';

        hexArray.forEach((color, index) => {
            let colorBox = document.createElement("div");
            colorBox.classList.add("color-box");
            colorBox.style.backgroundColor = color.hex.value;
            colorBox.dataset.color = color.hex.value;

            let colorValue = document.createElement("div");
            colorValue.textContent = color.hex.value;
            colorValue.classList.add("color-value");

            colorBox.appendChild(colorValue);
            sectionEl.appendChild(colorBox);

            colorBox.addEventListener("click", copyColor);
            colorBox.addEventListener("mouseover", darkenColor);
            colorBox.addEventListener("mouseout", resetColor);
        });
    });
}

function copyColor(e) {
    let colorValue = e.target.dataset.color;
    navigator.clipboard.writeText(colorValue);
    let feedbackEl = document.createElement("div");
    feedbackEl.classList.add("copy-feedback");
    feedbackEl.textContent = `Copied: ${colorValue}`;
    document.body.appendChild(feedbackEl);
    setTimeout(() => {
        feedbackEl.classList.add("show");
        setTimeout(() => {
            feedbackEl.remove();
        }, 2000);
    }, 100);
}

function darkenColor(e) {
    e.target.style.filter = "brightness(80%)";
}

function resetColor(e) {
    e.target.style.filter = "brightness(100%)";
}
