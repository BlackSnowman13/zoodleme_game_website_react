var assetsData;
fetchAssetsJson()

async function fetchAssetsJson() {
    await fetch('https://zoodlmes3.s3.ap-south-1.amazonaws.com/game_assets/Jigsaw/assets/assets.json').then(res => res.json()).then((data) => assetsData = data)
}

let showEdgePiece = false;
let disableEvents = true

let jigsawImage = localStorage.getItem('image')
// let jigsawImage = "/assets/jigsaw/animals/cat.jpg"

var seconds = 0;
var initSeconds = 3;

var timerId;
var initTimer;

var peices = [];

var rows = 4;
var cols = 4;

let displayImg = new Image();

var currentSelected = localStorage.getItem('pieceNumber');
console.log(currentSelected)
// var selectedCategory = "animals"
var imageIndex = -1;
var categorySize = 0;

var info = false
var customImage = false;

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

document.querySelectorAll('.piece_number').forEach((button) => {
    button.addEventListener('click', (event) => {
        document.getElementById(currentSelected).classList.remove('selected_piece');
        currentSelected = event.target.id;
        document.getElementById(currentSelected).classList.add('selected_piece');
    })
});

// document.getElementById('imageUploadButton').addEventListener('click', () => {
//     document.getElementById('imageUpload').click()
// })

// document.getElementById("imageUpload").addEventListener("change", function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             customImage = true
//             jigsawImage = e.target.result
//             openSpecialCategorySelection()

//         };
//         reader.readAsDataURL(file);
//     }
// });

document.getElementById('back_button').addEventListener('click', () => {
  location.reload()
})

document.getElementById('show_image').addEventListener('click', () => {
  onShowImageClick()
})

document.getElementById('edge').addEventListener('click', () => {
  onEdgePeiceClick()
})

document.getElementById('hint').addEventListener('click', () => {
  onShowHintClick()
})

document.getElementById('refresh').addEventListener('click', () => {
  onRefreshClick()
})

document.getElementById('info').addEventListener('click', () => {
  showRules()
})

document.getElementById('gameRefresh').addEventListener('click', () => {
  onGameRefreshClick()
})

document.getElementById('home').addEventListener('click', () => {
 location.reload()
})

// document.getElementById('info').addEventListener('click', () => {
// })

initializeGame()

function openSpecialCategorySelection() {
    document.getElementById('selection_image').src = jigsawImage
    document.getElementById('gameSelectionPannel').style.display = "flex";
}

function showRules() {
    if (!info) {
        document.getElementById('infoParent').style.display = "flex"
        document.getElementById('infoParent').style.zIndex = "1"
        document.getElementById('infoParent').style.zIndex = "1"

        document.getElementById('infoDisplay').style.width = "100%"
        document.getElementById('infoDisplay').style.height = "100%"
        document.getElementById('infoDisplay').style.backgroundColor = "#FFC6AA"
        document.getElementById('infoDisplay').style.borderRadius = "0px"

        document.getElementById('infoDisplayHeader').style.transition = "opacity 1s 1s"
        document.getElementById('infoDisplayContent').style.transition = "opacity 1s 1s"

        document.getElementById('infoDisplayHeader').style.opacity = "1"
        document.getElementById('infoDisplayContent').style.opacity = "1"

    } else {
        document.getElementById('infoDisplay').style.width = "50px"
        document.getElementById('infoDisplay').style.height = "50px"
        document.getElementById('infoDisplay').style.backgroundColor = "#FFC6AA"
        document.getElementById('infoDisplay').style.borderRadius = "50px"
        

        document.getElementById('infoDisplayHeader').style.transition = ""
        document.getElementById('infoDisplayContent').style.transition = ""

        document.getElementById('infoDisplayHeader').style.opacity = "0"
        document.getElementById('infoDisplayContent').style.opacity = "0"

        setTimeout(() => {
            document.getElementById('infoParent').style.zIndex = "-1"
            document.getElementById('infoParent').style.zIndex = "-1"
            document.getElementById('infoParent').style.display = "none"
        }, 600)
    }
    info = !info;
}

function nextImageInGame() {
    if (imageIndex < categorySize - 1) {
        imageIndex++;
        jigsawImage = assetsData.animals[imageIndex].url
        initializeGame()
    }
}

function gameBackbutton() {
    clearInterval(timerId)
    seconds = 0;
    customImage = false

    document.getElementById('puzzlesList').style.display = "flex"
    document.getElementById('game').style.display = "none"
    document.getElementById('completionMenu').style.display = "none"
}

function initializeGame() {
    clearInterval(timerId)
    seconds = 0;
    initSeconds = 3;

    // document.getElementById('gameSelectionPannel').style.display = "none"
    // document.getElementById('puzzlesList').style.display = "none"
    // document.getElementById('game').style.display = "flex"
    // document.getElementById('completionMenu').style.display = "none"
    // document.getElementById('countdownSeconds').style.display = "block";

    rows = cols = Math.sqrt(parseInt(currentSelected))
    jigsawInit();
}

function previousImage() {
    if (customImage) return;
    if (imageIndex > 0) {
        imageIndex--;
        jigsawImage = assetsData.animals[imageIndex].url
        document.getElementById('selection_image').src = jigsawImage
    }
}

function nextImage() {
    if (customImage) return;
    if (imageIndex < categorySize - 1) {
        imageIndex++;
        jigsawImage = assetsData.animals[imageIndex].url
        document.getElementById('selection_image').src = jigsawImage
    }    
}

function onCloseCategoryClick() {
    document.getElementById('gameSelectionPannel').style.display = "none";
}

function onCategoryClick() {
    categorySize = assetsData.animals.length;
    imageIndex = 0;
    jigsawImage = assetsData.animals[imageIndex].url
    document.getElementById('selection_image').src = jigsawImage
    document.getElementById('gameSelectionPannel').style.display = "flex";
}

function jigsawInit() {
    peices = []
    document.getElementById('jigsaw_pieces').innerHTML = ""

    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth

    canvas.style.flex = "0 1 auto"

    displayImg.src = jigsawImage

    displayImg.onload = () => {
        context.drawImage(displayImg, 0, 0, canvas.width, canvas.height);

        initTimer = setInterval(() => {
            // document.getElementById('countdownSeconds').innerText = initSeconds;
            initSeconds -= 1
            if (initSeconds < 0) {
                clearInterval(initTimer)
                // document.getElementById('countdownSeconds').style.display = "none";

                context.clearRect(0, 0, canvas.width, canvas.height);
                displayJigsawPeices(canvas.width, canvas.height, rows, cols);

                timerId = setInterval(() => {
                    seconds += 1;
                }, 1000)
                disableEvents = false;
            }
        }, 1000)
    }
}


function displayJigsawPeices(width, height, rows, cols) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = jigsawImage
    ctx.imageSmoothingEnabled = false;

    canvas.height = height;
    canvas.width = width;

    image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);

        const pieceWidth = width / cols;
        const pieceHeight = height / rows;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                cutPeice(ctx, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, col, row, cols, rows);
            } 
        }

        const shuffled = shuffleArray(peices);
        for (let peice of shuffled) {
            document.getElementById("jigsaw_pieces").appendChild(peice);
        }
    }
}

function onGameRefreshClick() {
    onRefreshClick()
    document.getElementById('completionMenu').style.display = "none";
}

function onShowHintClick() {
    if (disableEvents) return;
    disableEvents = true;
    const pieceCanvas = document.createElement("canvas");
    const pieceCtx = pieceCanvas.getContext("2d");
    const pieceWidth = canvas.width / cols;
    const pieceHeight = canvas.height / rows;
    const actualPieceWidth = pieceWidth + (2 * (pieceWidth / 3));
    const actualPieceHeight = pieceHeight + (2 * (pieceHeight / 3));

    const peicesContainerChildren = document.getElementById("jigsaw_pieces").children;
    for (let child of peicesContainerChildren) {
        if (child.dataset.placed == "false") {
            if (showEdgePiece && !(child.dataset.corner == "true")) continue;

            const peiceIndex = child.dataset.correctIndex;
            const row = Math.floor(peiceIndex / rows);
            const col = peiceIndex % cols;

            pieceCanvas.width = actualPieceWidth;
            pieceCanvas.height = actualPieceHeight;

            pieceCtx.beginPath();
            drawJigsawShape(pieceCtx, pieceWidth, pieceHeight, actualPieceWidth, actualPieceHeight, col, row, cols, rows, peiceIndex);
            pieceCtx.stroke();
            pieceCtx.clip();

            const heightBlockSize = canvas.height / rows;
            const widthBlockSize = canvas.width / cols;

            const startX = heightBlockSize * row;
            const startY = widthBlockSize * col;
            const clipX = startY;
            const clipY = startX;

            const image = new Image()
            image.src = pieceCanvas.toDataURL();
            image.onload = async () => {
                await context.drawImage(image, 0, 0, actualPieceWidth, actualPieceHeight, clipX - (pieceWidth / 3), clipY - (pieceHeight / 3), actualPieceWidth, actualPieceHeight)

                setTimeout(() => {
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    for (let peice of peices) {
                        if (peice.dataset.placed == "false") continue;

                        const peiceIndex = peice.dataset.correctIndex
                        const currentRow = Math.floor(peiceIndex / rows);
                        const currentColumn = peiceIndex % cols;

                        const heightBlockSize = canvas.height / rows;
                        const widthBlockSize = canvas.width / cols;
                        const startX = heightBlockSize * currentRow;
                        const startY = widthBlockSize * currentColumn;
                        const pieceWidth = canvas.width / cols;
                        const pieceHeight = canvas.height / rows;
                        const actualPieceWidth = pieceWidth + (2 * (pieceWidth / 3));
                        const actualPieceHeight = pieceHeight + (2 * (pieceHeight / 3));
                        const clipX = startY;
                        const clipY = startX;

                        const image = new Image();
                        image.src = peice.src;
                        image.onload = () => {
                            context.drawImage(image, 0, 0, actualPieceWidth, actualPieceHeight, clipX - (pieceWidth / 3), clipY - (pieceHeight / 3), actualPieceWidth, actualPieceHeight)
                            disableEvents = false;
                        }                        
                    }
                }, 3000);
            }
            disableEvents = false
            return;

        }
    }
}

function onShowImageClick() {
    if (disableEvents) return;
    disableEvents = true;

    context.drawImage(displayImg, 0, 0, canvas.width, canvas.height);

    setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        

        for (let peice of peices) {
            if (peice.dataset.placed == "false") continue;

            const peiceIndex = peice.dataset.correctIndex
            const currentRow = Math.floor(peiceIndex / rows);
            const currentColumn = peiceIndex % cols;

            const heightBlockSize = canvas.height / rows;
            const widthBlockSize = canvas.width / cols;
            const startX = heightBlockSize * currentRow;
            const startY = widthBlockSize * currentColumn;
            const pieceWidth = canvas.width / cols;
            const pieceHeight = canvas.height / rows;
            const actualPieceWidth = pieceWidth + (2 * (pieceWidth / 3));
            const actualPieceHeight = pieceHeight + (2 * (pieceHeight / 3));
            const clipX = startY;
            const clipY = startX;

            const image = new Image();
            image.src = peice.src;
            image.onload = () => {
                context.drawImage(image, 0, 0, actualPieceWidth, actualPieceHeight, clipX - (pieceWidth / 3), clipY - (pieceHeight / 3), actualPieceWidth, actualPieceHeight)
            }                        
        }
    }, 3000);

    disableEvents = false;
}

function onRefreshClick() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    showEdgePiece = false;
    for (let peice of peices) {
        peice.style.display = "block";
        peice.dataset.placed = false;
        document.getElementById("jigsaw_pieces").appendChild(peice);
    }
    clearInterval(timerId);
    seconds = 0
    timerId = setInterval(() => {
        seconds += 1
    }, 1000)
}

function onEdgePeiceClick() {
    for (let peice of peices) {
        if (peice.dataset.placed == "false" && peice.dataset.corner == "false") {
            peice.style.display = showEdgePiece ? "block" : "none"
        }
        document.getElementById("jigsaw_pieces").appendChild(peice);
    }
    showEdgePiece = !showEdgePiece;
    console.log(`showState: ${showEdgePiece}`)

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function cutPeice(ctx, x, y, pieceWidth, pieceHeight, col, row, cols, rows) {
    const pieceCanvas = document.createElement("canvas");
    const pieceCtx = pieceCanvas.getContext("2d");

    const actualPieceWidth = pieceWidth + (2 * (pieceWidth / 3));
    const actualPieceHeight = pieceHeight + (2 * (pieceHeight / 3));

    const peiceIndex = (row * cols) + col;

    pieceCanvas.width = actualPieceWidth;
    pieceCanvas.height = actualPieceHeight;

    pieceCtx.beginPath();
    drawJigsawShape(pieceCtx, pieceWidth, pieceHeight, actualPieceWidth, actualPieceHeight, col, row, cols, rows, peiceIndex);
    pieceCtx.stroke();
    pieceCtx.clip();

    pieceCtx.drawImage(ctx.canvas, x - (pieceWidth / 3), y - (pieceHeight / 3), actualPieceWidth, actualPieceHeight, 0, 0, actualPieceWidth, actualPieceHeight)

    const cutImage = document.createElement("img");
    cutImage.src = pieceCanvas.toDataURL();
    cutImage.classList.add('jigsaw_piece');
    cutImage.draggable = true;
    cutImage.dataset.correctIndex = peiceIndex;
    cutImage.dataset.placed = false;

    if (row == 0 || col == 0 || row == rows - 1 || col == cols - 1) cutImage.dataset.corner = true;
    else cutImage.dataset.corner = false

    cutImage.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        const dragImage = document.getElementById('dragImage')
        
        dragImage.style.left = touch.clientX - actualPieceWidth / 2 + 'px'
        dragImage.style.top = touch.clientY - actualPieceHeight / 2 + 'px'
        dragImage.style.width = actualPieceWidth + 'px'
        dragImage.style.height = actualPieceHeight + 'px'
        dragImage.src = cutImage.src
        dragImage.style.display = "block"
    })

    cutImage.addEventListener("touchmove", (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        const dragImage = document.getElementById('dragImage')

        dragImage.style.left = touch.clientX - actualPieceWidth / 2 + 'px'
        dragImage.style.top = touch.clientY - actualPieceHeight / 2 + 'px'
        // console.log('here')
        // dragImage.style.display = "block"
    })

    cutImage.addEventListener("touchend", (event) => {
        const touch = event.changedTouches[0];

        const dragImage = document.getElementById('dragImage')

        dragImage.style.left = touch.clientX - actualPieceWidth / 2 + 'px'
        dragImage.style.top = touch.clientY - actualPieceHeight / 2 + 'px'
        dragImage.style.display = "none"

        const dropX = touch.clientX;
        const dropY = touch.clientY;

        const rect = canvas.getBoundingClientRect();
        const canvasX = dropX - rect.left;
        const canvasY = dropY - rect.top;

        if (canvasX >= 0 && canvasX <= canvas.width && canvasY >= 0 && canvasY <= canvas.height) {
            const index = cutImage.dataset.correctIndex;
            const currentRow = Math.floor(index / rows);
            const currentColumn = index % cols;
            
            const heightBlockSize = canvas.height / rows;
            const widthBlockSize = canvas.width / cols;

            const startX = heightBlockSize * currentRow;
            const startY = widthBlockSize * currentColumn;
            const endX = heightBlockSize * (currentRow + 1);
            const endY = widthBlockSize * (currentColumn + 1);

            if (canvasX >= startY && canvasY >= startX && canvasX <= endY && canvasY <= endX) {
                const clipX = startY;
                const clipY = startX;

                const droppedImg = new Image();
                droppedImg.src = cutImage.src;
                droppedImg.onload = async () => {
                    await context.drawImage(droppedImg, 0, 0, actualPieceWidth, actualPieceHeight, clipX - (pieceWidth / 3), clipY - (pieceHeight / 3), actualPieceWidth, actualPieceHeight)
                    cutImage.style.display = "none";
                    cutImage.dataset.placed = true;
                    
                    const foundIndex = peices.find(peice => peice.dataset.correctIndex == index)
                    peices[foundIndex] = cutImage;

                    const status = peices.find((p) => p.dataset.placed == "false")
                    if (status === undefined) {
                        clearInterval(timerId);
                        document.getElementById('timer').innerText = formatSeconds(seconds)
                        document.getElementById('completionImg').src = jigsawImage
                        document.getElementById('completionMenu').style.display = "flex"
                    }
                };
            }
        }
    })
    peices.push(cutImage);

}

function formatSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function drawJigsawShape(ctx, w, h, actualPieceWidth, actualPieceHeight, col, row, cols, rows, index) {
    ctx.lineTo(w / 3, h / 3);

    if (row != 0) ctx.arc(actualPieceWidth / 2,  h / 3, 25, 1 * Math.PI , 0* Math.PI, (col % 2 == 0))
    ctx.lineTo(actualPieceWidth - (w / 3), h / 3);

    if (col != cols - 1) ctx.arc(actualPieceWidth - (w / 3),  actualPieceHeight / 2 , 25, 1.5 * Math.PI , 0.5* Math.PI, !(row % 2 == 0))
    ctx.lineTo(actualPieceWidth - (w / 3), actualPieceHeight - (h / 3));

    if (row != rows - 1) ctx.arc(actualPieceWidth / 2, actualPieceHeight - (h / 3), 25, 0 * Math.PI , 1 * Math.PI, !(col % 2 == 0))
    ctx.lineTo(w / 3, actualPieceHeight - (h / 3));

    if (col != 0) ctx.arc(w / 3,  actualPieceHeight / 2, 25, 0.5 * Math.PI , 1.5 * Math.PI, (row % 2 == 0))
    ctx.lineTo(w / 3, h / 3);

}