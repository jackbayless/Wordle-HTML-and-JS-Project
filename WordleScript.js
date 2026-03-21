
console.log("Page Loaded")

let row = 0;
let col = 0;
let length = 5;
let difficulty = 6;

let word = "COLIN"

function setTile(row, col, letter) {
    console.log("Tile " + row + " " + col + " set to " + letter);

    var id = "" + row + "" + col
    const tile = document.getElementById(id)

    if (!tile) {
        console.error("No tile: ", row, col);
        return;
    }

    tile.textContent = letter;

    console.log("Tile: " + id + " Success")


}

function increment_col () {
    if (col < length - 1) {
        col++;
    }
}

function decrement_col () {
    if (col > 0) {
        col--;
    }

}


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function check_letter(str, ind) {

    if (word[ind] === str) return 2;

    for (let i = 0; i < word.length; i++) {
        if (word[i] === str) return 1;
    }

    return 0;

}

function update_tile_and_key(id, color) {
    document.getElementById(id).style.backgroundColor = color
    let key_id = document.getElementById(id).textContent;
    document.getElementById(key_id).style.backgroundColor = color
}

function draw_keyboard (len, diff) {

    let test_div = document.createElement("div");
    test_div.style.backgroundColor = "green";
    test_div.textContent = len;
    test_div.classList.add("test_div");

    let test_div2 = document.createElement("div");
    test_div2.style.backgroundColor = "red";
    test_div2.textContent = diff;
    test_div2.classList.add("test_div");


    let test_div3 = document.createElement("div");

    test_div3.appendChild(test_div);
    test_div3.appendChild(test_div2);
    return test_div3;


}

addEventListener('keydown', function(e) {

    let letter = e.key.toUpperCase()

    if (isLetter(letter)) {
        setTile(row, col, letter);
        increment_col();
    }

    else if (e.key === "Backspace") {
        setTile(row, col, "");
        decrement_col();
        console.log("Backspace");
    }

    else if (e.key === "Enter") {
        let score = 0;
        console.log("Enter Clicked");
        col = 0;

        for (col; col < length; col++) {
            let id = "" + row + "" + col;
            let letter = document.getElementById(id).textContent;

            let guess_value = check_letter(letter, col)
            score += guess_value;

            if (guess_value === 2) update_tile_and_key(id, "green");
            else if (guess_value === 1) update_tile_and_key(id, "yellow");
            else update_tile_and_key(id, "grey");

            if (score === 2 * length) {
                document.getElementById("result").textContent = "YOU WIN!!!!"
                return;
            }

        }
        row++;
        col = 0;

        if (row >= difficulty - 1) {
            document.getElementById("result").textContent = "YOU LOSE :("
        }
        return;


    }

    console.log("Row: " + row + " col: " + col);

})

document.getElementById("apply_options_button").addEventListener('click', function(e) {
    console.log("clicked")
    let len_input = document.getElementById("length").value;
    let diff_input = document.getElementById("difficulty").value;
    console.log(len_input);
    console.log(diff_input);
    document.getElementById("keyboard").innerHTML = "";
    document.getElementById("keyboard").appendChild(draw_keyboard(len_input, diff_input));


})