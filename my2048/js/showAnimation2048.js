function showNumberWithAnimation(i, j, randomNumber) {
    let numberCell = $("#number-cell-" + i + "-" + j);

    numberCell.css("background-color", getNumberBackgroundColor(randomNumber));
    numberCell.css("color", getNumberColor(randomNumber));
    numberCell.text(randomNumber);

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j),
    }, 50)
}

function showMoveAnimation(fromX, fromY, toX, toY) {
    let numberCell = $("#number-cell-" + fromX + "-" + fromY);
    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY),
    }, 200)
}

function updateScore(score) {
    $("#score").text(score);
}