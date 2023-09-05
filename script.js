

const refreshBtn = document.querySelector(".button");
const colours = document.querySelector(".colours");
const paletteBoxes = 5;
const lockedColors = new Set();
let initialPalette = [];

const generatePalette = () => {
  colours.innerHTML = "";
  
  const newPalette = [];

  // Generate new colors for the unlocked slots
  for (let i = 0; i < paletteBoxes; i++) {
    let randomHex;
    
    if (initialPalette[i] !== undefined && lockedColors.has(initialPalette[i])) {
      // If a color is locked in the initial palette, keep it
      randomHex = initialPalette[i];
    } else {
      do {
        randomHex = generateRandomColor();
      } while (newPalette.includes(randomHex) || lockedColors.has(randomHex));
    }

    newPalette.push(randomHex);

    const colour = document.createElement("li");
    colour.classList.add("colour");

    if (lockedColors.has(randomHex)) {
      colour.classList.add("locked");
      colour.style.border = "solid";
    }
    
    colour.innerHTML = `<div class="colourimage" style="background: ${randomHex}"></div>
                         <div class="hex">${randomHex}</div>`;
    colour.addEventListener("click", () => toggleLockColour(colour, randomHex));
    colours.appendChild(colour);
  }

  initialPalette = [...newPalette];
};

const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
};

const toggleLockColour = (colourElement, colorHex) => {
  if (lockedColors.has(colorHex)) {
    lockedColors.delete(colorHex);
    colourElement.classList.remove("locked");
    colourElement.style.border = ""; 
  } else {
    lockedColors.add(colorHex);
    colourElement.classList.add("locked");
    colourElement.style.border = "solid"; 
  }
};

generatePalette();

refreshBtn.addEventListener("click", generatePalette);
