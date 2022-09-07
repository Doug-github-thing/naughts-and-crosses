const turnMax = 9;

let phase = 'placing' // phases: placing, moving, endgame

let x = true;
let counter = 1;

// when the window loads, builds onclick funciton for each button:
// on click, check what phase you're in, see if click is valid, then make move
window.onload = function() {
    for(i = 1; i < 4; i++)
        for(j = 1; j < 4; j++) {
            const this_box = document.getElementById(i + '' + j);

            this_box.onclick = function () {
                switch (phase) {
                    case 'placing':
                        if(this_box.innerHTML != '')
                            return;

                        this_box.innerHTML = getXValue();
                        if(counter > 4)
                            checkVictory(this_box.id);

                        switchTurns();
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

// checks all possible ways the move just made could trigger a win by filling an array with a group of 3 
//    neighboring boxes and then checking if the values in all boxes are equal. If so, it's a win.
function checkVictory(coords) {
    const i = coords[0];
    const j = coords[1];

    let arr = [0, 0, 0];

    // check if all values in that row are the same
    for(q = 1; q < 4; q++)
        arr[q-1] = document.getElementById(q + '' + j);
    checkArr(arr);

    // check if all values in that column are the same
    for(q = 1; q < 4; q++)
        arr[q-1] = document.getElementById(i + '' + q);
    checkArr(arr);

    // if it's on a diagonal, check those too. For the non-diagonals, difference between i and j is +/- 1
    if(Math.abs(Number(i) - Number(j)) != 1) {
        // checks the backslash
        for(q = 1; q < 4; q++)
            arr[q-1] = document.getElementById(q + '' + q);
        checkArr(arr);

        // checks the forward slash (couldn't find a more elegant way than hardcoding the array)
        checkArr([document.getElementById('13'), document.getElementById('22'), document.getElementById('31')]);
    }
}

// given an array of length 3 containing squares, checks if they are all equal to see if game is over. If it is, makes it so
function checkArr(arr) {
    if(arr[0].innerHTML == arr[1].innerHTML && arr[1].innerHTML == arr[2].innerHTML) {
        document.getElementById('turn').innerHTML = getXValue() + ' wins!';
        for(q = 0; q < 3; q++)
            arr[q].className = 'selectable';
        endTheGame();
    }
}

// iterates the turn counter, switches whose turn it is, changes phase if it's time for that
function switchTurns() {
    if (phase == 'endgame')
        return;

    x = x ? false : true;
    document.getElementById('turn').innerHTML = getXValue() + "'s turn!";
    if(counter == turnMax) {
        // document.getElementById('phase').innerHTML = "Moving phase"; This is going to be the thing once moving phase is enabled 
        endTheGame();
        return;
    }
    counter++;
}

function endTheGame() {
    document.getElementById('phase').innerHTML = "Game ogre";
    if(document.getElementById('turn').innerHTML[2] != 'w')
        // if no one wins, change text
        document.getElementById('turn').innerHTML = "Thanks for playing";
    
    phase = 'endgame';
}

function getXValue() {
    return x ? 'x' : 'o';
}