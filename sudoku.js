Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var possibilityBoard = [];
for(let y=0;y<9;y++){
    possibilityBoard.push([]);
    for(let x=0;x<9;x++){
        possibilityBoard[y].push([1,2,3,4,5,6,7,8,9]);
    }    
}
var board = [
   [7,0,2,0,4,8,0,0,0],   
   [0,8,5,0,0,0,7,0,0],
   [0,0,0,0,0,2,6,0,3],
   [0,0,0,6,0,1,4,0,2],   
   [1,0,8,2,0,0,0,0,7],
   [9,0,0,7,0,0,8,0,0],
   [0,0,0,0,0,3,0,4,1],   
   [8,3,0,0,9,0,0,7,0],
   [0,9,0,4,2,0,0,3,0]
];
var unknown = 81;
for(let y=0;y<9;y++){
    for(let x=0;x<9;x++){
        if(board[y][x]){
            possibilityBoard[y][x].length = 0;
            possibilityBoard[y][x].push(board[y][x]); 
        }
    }
}

for(let y=0;y<9;y++){        
    for(let x=0;x<9;x++){
        board[y][x] = 0;
    }
}

while(unknown){
    for(let y=0;y<9;y++){
        for(let x=0;x<9;x++){
            if(possibilityBoard[y][x].length===1 && board[y][x]===0){
                
                unknown--;
                const tmp = possibilityBoard[y][x][0];
                board[y][x] = tmp;
                for(let i=0;i<9;i++){
                    if(Array.isArray(possibilityBoard[i][x])) possibilityBoard[i][x].remove(tmp)
                    if(Array.isArray(possibilityBoard[y][i])) possibilityBoard[y][i].remove(tmp)
                }
                for(let i=0;i<3;i++){
                    for(let j=0;j<3;j++){
                        possibilityBoard[3*parseInt(y/3)+i][3*parseInt(x/3)+j].remove(tmp);
                    }
                }
            }
        }
    }
    
}

console.log(board);
