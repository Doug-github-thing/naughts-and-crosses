const turnMax = 9;

let phase = 'placing' // phases: placing, moving, endgame

let x = true;
let counter = 1;

window.onload = function() {
    for(i = 1; i < 4; i++)
        for(j = 1; j < 4; j++) {
            const this_box = document.getElementById(i + '' + j);

            this_box.onclick = function () {
                switch (phase){
                    case 'placing':
                        
                        if(this_box.innerHTML != '')
                            return;

                        this_box.innerHTML = getXValue();
                        checkVictory(this_box.id);

                        break;
                    case 'moving':
                        // add logic for moving step
                        break;
                    default:
                        return;
                }
            }
        }
}

function checkVictory(coords) {
    const value = getXValue();
    const i = coords[0];
    const j = coords[1];

    if(counter >= turnMax) {
        document.getElementById('turn').innerHTML = "Game ogre!";
        phase = 'endgame';
        return;
    }    

    // given the location and value of the move made, check all surrounding squares
    // to see if that move is part of a win
    search(i, j, value);

    switchTurns();
}

function search(i, j, value) {

    console.log(i+' '+j+' '+value);

    // cycle through the row to see if you've won horizontally
    // cycle through the column to see if you've won vertically
    // if move was not in one of the 4 outside middle spaces, check the diagonals as well

    
}

function switchTurns() {
    x = x ? false : true;
    document.getElementById('turn').innerHTML = getXValue() + "'s turn!";
    counter++;
}

function getXValue() {
    return x ? 'x' : 'o';
}