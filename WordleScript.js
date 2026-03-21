
console.log("Page Loaded")

let row = 0;
let col = 0;
let global_length = 5;
let global_difficulty = 6;
let word = "BELLA"

let EC2_URL = "https://www.jackbayless.club";

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
    if (col < global_length - 1) {
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

function draw_tiles() {

    let tiles = document.createElement("div");
    tiles.id = "tiles";

    for (let i = 0; i < global_difficulty; i++) {

        const container = document.createElement("div");
        container.classList.add("game_container");
        document.body.appendChild(container);

        for (let j = 0; j < global_length; j++) {

            const new_tile = document.createElement("div");
            new_tile.id = "" + i + "" + j;
            new_tile.classList.add("tile");
            container.appendChild(new_tile);

        }

        tiles.appendChild(container);

    }
    return tiles;
}

// placeholder before i set up server and get words through there -- ..
async function set_word() {
    let len = parseInt(global_length);

    if (len === 3) word = "CAT";
    else if (len === 4) word = "FART";
    else if (len === 5) word = "BELLA";
    else if (len === 6) word = "CLEARY";
    else if (len === 7) word = "ICEKING";
    else if (len === 8) word = "THINKPAD";

    let url = EC2_URL + "/wordle/getword?length=" + global_length;

    let r = await fetch(url);
    let data = await r.json();
    console.log(data.word)
    word = data.word;

}




addEventListener('keydown', function(e) {

    var letter = e.key.toUpperCase()

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
        e.preventDefault();
        let score = 0;
        console.log("Enter Clicked");
        col = 0;

        for (col; col < global_length; col++) {
            let id = "" + row + "" + col;
            let letter = document.getElementById(id).textContent;

            let guess_value = check_letter(letter, col)
            score += guess_value;

            if (guess_value === 2) update_tile_and_key(id, "green");
            else if (guess_value === 1) update_tile_and_key(id, "yellow");
            else update_tile_and_key(id, "grey");

            if (score === 2 * global_length) {
                document.getElementById("result").textContent = "YOU WIN!!!!"
                return;
            }


        }
        row++;
        col = 0;

        if (row >= global_difficulty - 1) {
            document.getElementById("result").textContent = "YOU LOSE :("
        }
        return;





    }



    console.log("Row: " + row + " col: " + col);

// woo




})

document.getElementById("apply_options_button").addEventListener('click', function(e) {
    console.log("apply clicked")

    global_length = document.getElementById("length").value;
    console.log("Length set to:", global_length);

    global_difficulty = document.getElementById("difficulty").value;
    console.log("Difficulty set to:", global_difficulty);

    set_word();
    console.log("Word has been set: ", word)

    document.getElementById("tiles_container").innerHTML = "";
    document.getElementById("tiles_container").appendChild(draw_tiles());

    row = 0;
    col = 0;

})
