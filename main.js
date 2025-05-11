document.addEventListener("mousemove", function(e) {
    let currentElement = document.elementFromPoint(e.clientX, e.clientY);
    if (currentElement.classList.contains("title")) {
        randomizeCharacter(currentElement, 10 + Math.floor(Math.random()*5));
    }
})

let changedCharacters = new Set();

async function randomizeCharacter(currentElement, length) {
    if (changedCharacters.has(currentElement)) {
        return;
    }
    changedCharacters.add(currentElement);


    let initialLetter = currentElement.textContent;
    let numChanges = length;
    
    for (let i = 0; i < numChanges; i++) {
        currentElement.textContent = getRandomChar();
        let timeout = i*5;
        if (timeout > 80) {
            timeout = 80;
        }
        await new Promise(r => setTimeout(r, timeout));
    }

    currentElement.textContent = initialLetter;
    changedCharacters.delete(currentElement);
}

function getRandomChar() {
    let possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}[]/=?+-\_|1234567890;:";
    return possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
}



window.addEventListener("load", function(e) {
    this.document.querySelectorAll('.title').forEach(element => {
        split(element);
    })

    const titleChars = this.document.querySelectorAll('.title');

    const title = this.document.getElementById("title");
    let titleRect = title.getBoundingClientRect();
    let width = titleRect.right - titleRect.left;
    let height = titleRect.bottom - titleRect.top;
    let diameter = pythagoras(width, this.length);

    titleChars.forEach(element => {
        let rect = element.getBoundingClientRect();
        let relPosTop = rect.top - titleRect.top;
        let resPosLeft = rect.left - titleRect.left;
        let distance = 1 / diameter * pythagoras(relPosTop, resPosLeft);
        randomizeCharacter(element, 10 + Math.floor(distance * 30));
    });
    consistantChanges(titleChars);
    consistantChanges(titleChars);
})

function split(element) {
    let content = element.textContent;
    let length = content.length;
    element.textContent = "";

    if (length == 1) { return; }

    for (let i=0; i < length; i++) {
        let newElement = document.createElement("span");
        if (content.charAt(i) != " ") {
            newElement.classList.add("title");
        }
        newElement.textContent = content.charAt(i);
        element.appendChild(newElement);
    }
    element.classList.remove("title");
}

async function consistantChanges(chars) {
    let timeout = Math.floor(Math.random() * 14000) + 5000;
    await new Promise(r => setTimeout(r, timeout));

    let amount = Math.floor(Math.random() * 3 + 1);
    for (let i = 0; i < amount; i++) {
        let index = Math.floor(Math.random() * chars.length);
        randomizeCharacter(chars[index], 15 + Math.floor(Math.random() * 20));
    }

    consistantChanges(chars);
}



function pythagoras(a, b) {
    return (Math.sqrt(a*a + b*b));
}