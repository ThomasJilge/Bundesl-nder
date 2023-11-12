let bundeslaender = [];
let letters = [];

async function init() {
 let resp = await fetch('./bundesland.json');
 bundeslaender= await resp.json();
 render();
}

function render(filter) {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        const land = bundeslaender[i];
        const population = (land['population'] + '').replace('.', ',');
        const firstLetter = land['name'].charAt(0);

        if (!filter || filter == firstLetter) {
            content.innerHTML += renderLinkHTML(land, population); 
        }

        if(!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }

    renderLetters();
}


function Filter(letter) {
    render(letter);
}


function renderLetters() {
    let letterbox = document.getElementById('letterBox');
    letterbox.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterbox.innerHTML += `<div onclick="Filter('${letter}')" class="letter">${letter}</div>`;
        
    }
}

function renderLinkHTML(land, population) {
    return `
        <a class="bundeslandBox" href="${land['url']}" target="_blank"
            <div>${land['name']}</div>
            <div class="textGrey">${population} Millionen</div>
        <a/>`;
}

function showStates() {
    render();
}