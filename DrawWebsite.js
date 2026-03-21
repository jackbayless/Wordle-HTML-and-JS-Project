
let length = 7; // number of letters
let diff = 3; // difficulty

draw();



function draw() {
    draw_header();
    draw_tiles();
    draw_keyboard();
}

function draw_header() {
    const header = document.createElement("h3");
    header.id="top_header";
    header.textContent = "JB's Wordle (づ｡◕‿‿◕｡)づ";
    document.body.appendChild(header);
}

function draw_tiles() {
    for (let i = 0; i < diff; i++) {

        const container = make_game_container();
        document.body.appendChild(container);

        for (let j = 0; j < length; j++) {

            const new_tile = document.createElement("div");
            new_tile.id = "" + i + "" + j;
            new_tile.classList.add("tile");
            container.appendChild(new_tile);

        }

    }
}

function draw_keyboard() {

    // FIRST ROW
    const container = make_game_container();
    document.body.appendChild(container);
    container.appendChild(make_key("Q"));
    container.appendChild(make_key("W"));
    container.appendChild(make_key("E"));
    container.appendChild(make_key("R"));
    container.appendChild(make_key("T"));
    container.appendChild(make_key("Y"));
    container.appendChild(make_key("U"));
    container.appendChild(make_key("I"));
    container.appendChild(make_key("O"));
    container.appendChild(make_key("P"));

    // SECOND ROW
    const container2 = make_game_container();
    document.body.appendChild(container2);
    container2.appendChild(make_key("A"));
    container2.appendChild(make_key("S"));
    container2.appendChild(make_key("D"));
    container2.appendChild(make_key("F"));
    container2.appendChild(make_key("G"));
    container2.appendChild(make_key("H"));
    container2.appendChild(make_key("J"));
    container2.appendChild(make_key("K"));
    container2.appendChild(make_key("L"));

    // THIRD ROW
    const container3 = make_game_container();
    document.body.appendChild(container3);
    container3.appendChild(make_key("ENTER"));
    container3.appendChild(make_key("Z"));
    container3.appendChild(make_key("X"));
    container3.appendChild(make_key("C"));
    container3.appendChild(make_key("V"));
    container3.appendChild(make_key("B"));
    container3.appendChild(make_key("N"));
    container3.appendChild(make_key("M"));
    container3.appendChild(make_key("BACKSPACE"));
}

function make_key(letter) {

    let key = document.createElement("div");

    if (letter === "ENTER" || letter === "BACKSPACE") {
        key.classList.add("large_key_input");
    } else {
        key.id=(letter);
        key.classList.add("key_input");
    }

    if (letter === "BACKSPACE") key.textContent = "<=="
    else key.textContent = letter;

    return key;

}

function make_game_container() {

    let gc = document.createElement("div");
    gc.classList.add("game_container");
    return gc;
}