/* Board.js */

import { Square } from './Square.js';
import { Player } from './Player.js';


export class Board {

    // ------------------------------------------------------------------------
    // Init
    // ------------------------------------------------------------------------

    constructor(size) {
        this.size = size;
        this.position = {row: -1, col: -1};// player's position (row/col)
        this.model = this._createModel();  // a 2-dim array of Square objs
        this.elem = this._createView();  // a <table> elem
        this.player = null;
        this.playerOne = null;
        this.playerTwo = null;
        this.clickCol = 0;
        this.blockObjArray = [];
        this.weapon = null;
        this.playerPosition = [];
//        this.movePlayer();
    }

    _createModel() {
        var model = [];  // model[2][3] is row 3, column 4 (since first row is 0)

        for (let r=0; r<this.size; r++) {
            model.push( [] ); 
            for ( let c=0; c<this.size; c++) {
                model[r].push( new Square(r, c) );
            }
        }

        return model;
    }
    
    

    _createView() {
        let tableElem = $('<table>');

        for (let r=0; r<this.size; r++) {
            let trElem = $('<tr>');

        for (let c=0; c<this.size; c++) {
                let sq = this.getSquare(r, c);
                $(trElem).append(sq.elem);
            }
            
        $(tableElem).append(trElem);  
        }
        
/*Player control click event function *******************************/
        
        let board = this;
        let playerPos = this.player;
//         $(tableElem).click(function(event) {
        $(tableElem).on('click', 'td', function(event) {
            console.log(event.target.id);
            let clickId = event.currentTarget.id;
            let arrayId = clickId.split('');
            let pos = {
                row: Number(arrayId[3]), 
                col: Number(arrayId[5])
            };

                    if(board._checkValidMove(pos)) {
                        board._movePlayer(pos);
                        }
        });
        
        return tableElem;
    }
    
/*Squares methods **************************************************/    
     

    getSquare(row, col) {
        
        return this.model[row][col];
    }

    _getRandomPosition() {
        
        let r = Math.floor(Math.random() * this.size);
        let c = Math.floor(Math.random() * this.size);

        return { row: r, col: c };
    }


    addBlock(b) {
        
        let pos = this._getRandomPosition(); 
        let sq = this.getSquare(pos.row, pos.col);
        while(sq.blockObj) {
            pos = this._getRandomPosition(); 
            sq = this.getSquare(pos.row, pos.col);
        }
        sq.block = b;
        this.blockObjArray.push(sq.location);
        console.log(this.blockObjArray);
    }
    
    addWeapon(weapon) {
        
        let pos = this._getRandomPosition(); 
        let sq = this.getSquare(pos.row, pos.col);
        while(sq.blockObj || sq.weaponObj) {
            pos = this._getRandomPosition(); 
            sq = this.getSquare(pos.row, pos.col);
        }
        sq.weapon = weapon;
        this.weapon = weapon;
//        this.goldObjArray.push(sq.location);
//        console.log(this.goldObjArray);
    }

    addPlayer(player) { 
        
        let pos = this._getRandomPosition();          
        let sq = this.getSquare(pos.row, pos.col); 
        while(sq.blockObj || sq.weaponObj) {
            pos = this._getRandomPosition(); 
            sq = this.getSquare(pos.row, pos.col);
        }
        this.playerPosition.push(pos);
        sq.player = player;
        this.position = pos;                                 
        this.player = player;
        console.log(this.playerPosition);
    }
                                                                 
    _checkValidMove(pos) {
        
        let clickLocation = pos;           
        let playerLocation = this.position;
        let plsq = this.getSquare(playerLocation.row, playerLocation.col);
        let plObj = this.player;
        let weaponObj = this.weapon;
        console.log(pos.row + ' testing valid move');
        let clsq = this.getSquare(pos.row, pos.col);
        let clElem = weaponObj.position;
//        console.log(clickIdString);
        let clBlock = 0;
        let clRow = clickLocation.row;
        let clRowUp = clickLocation.row + 1;
        let clRowDown = clickLocation.row - 1;
        let clCol = clickLocation.col;
        let clColLeft = clickLocation.col + 1;
        let clColRight = clickLocation.col - 1;
        let plRow = playerLocation.row;
        let plCol = playerLocation.col;
        let playerGo = null;    
        
/*Vertical movement verification logic ****************************************/
        
        if(!clsq.block) {
        if(clRowUp == plRow && clCol == plCol) {
                playerGo = true;
            }
        if(clRowDown == plRow && clCol == plCol)  {
                playerGo = true;    
            }
        }    
        
/*Horizontal movement verification logic *************************************/  
        
        if(!clsq.block) {
         if(clColLeft == plCol && clRow == plRow) {
                playerGo = true;
            }
        
        if(clColRight == plCol && clRow == plRow) {
                playerGo = true;    
            }
        }
        return playerGo;    
    }
    
    
    _movePlayer(click) {

        let plsqPos = this.position;
        let player = this.player;
        let rowPl = plsqPos.row;
        let colPl = plsqPos.col;
        // Current click position - new Player location
        let clsqPos = click;
        let rowCl = click.row;
        let colCl = click.col;
        
        let playerSq = this.getSquare(rowCl, colCl);
        playerSq.player = player;
        this.player = playerSq.player;
        this.position = clsqPos;
    }
     
}


//    _checkBlock(blockClick) {
//        let blockArray = this.blockObjArray;
//        let validation = null;
////        console.log(blockArray);
//        for (let i=0; i<5; i++) {
//            if(blockArray[i] == blockClick) {
//                console.log(blockArray[i]);
//                validation = false;
////           } else {
////                return true;
//           }
//        }
//       return validation; 
//    }
//    
//    _checkGold(goldClick) {
//        let goldArray = this.goldObjArray;
//        let validation = true;
//        console.log(goldArray);
//        for (let i=0; i<5; i++) {
//            if(goldArray[i] == goldClick) {
//                console.log(goldArray[i]);
//                validation = true;
//           }
//        }
//        return validation;
//    }


