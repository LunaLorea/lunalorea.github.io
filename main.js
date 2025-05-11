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
        await new Promise(r => setTimeout(r, 10*i));
    }

    currentElement.textContent = initialLetter;
    changedCharacters.delete(currentElement);
}

function getRandomChar() {
    let possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}[]/=?+-\_|1234567890;:";
    return possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
}



window.addEventListener("load", function(e) {
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
        randomizeCharacter(element, 10 + Math.floor(distance * 40));
    });
})

function pythagoras(a, b) {
    return (Math.sqrt(a*a + b*b));
}