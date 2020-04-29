/* Board.js */

import { Square } from './Square.js';
import { Player } from './Player.js';


export class Board {

    // ------------------------------------------------------------------------
    // Init
    // ------------------------------------------------------------------------

    constructor(size) {
        this.size = size;
        this.position = {row: -1, col: -1};
        this.model = this._createModel();
        this.elem = this._createView();
        this.player = null;
        this.playerOne = null;
        this.playerTwo = null;
        this.scoreBoard_P1 = null;
        this.scoreBoard_P2 = null;
        this.playerOneWeapon = null;
        this.playerTwoWeapon = null;
        this.clickCol = 0;
        this.blockObjArray = [];
        this.weapon = null;
        this.playerObjArray = [];
        this.playerPosition = [];
        this.blockMoveValue = null;
        
//        this.newGame();
//        this.movePlayer();
    }

    _createModel() {
        var model = []; 

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

        $(tableElem).on('click', 'td', function(event) {
            let clickId = event.currentTarget.id;
            let arrayId = clickId.split('');
            let pos = {
                row: Number(arrayId[3]), 
                col: Number(arrayId[5])
            };
                    if(board._checkValidMove(pos)) {
                        board._movePlayer(pos);
                        board._weaponPickUp(pos);
                        
                    }
        });
        
        return tableElem;
    }
    
/*Squares methods **************************************************/    
     

    getSquare(row, col) {
        if(row<0 || row>9 || col<0 || col>9) {
            return false;
        } else { 
        return this.model[row][col]; 
        }
    }

    _getRandomPosition() {
        
        let r = Math.floor(Math.random() * this.size);
        let c = Math.floor(Math.random() * this.size);

        return { row: r, col: c };
    }
    
    _playerVisualGuide(pos) {
        
            let u;
                for (u=1; u<4; u++) {
                    let guideUp = this.getSquare(pos.row-u, pos.col);
                    if(guideUp && !guideUp.block /*&& !guideUp.player*/) {

                        $('#'+guideUp.id).addClass('guide');
//                        continue;
                    } 
                    else { break; }
                }
                
        
            let d;
                for (d=1; d<4; d++) {
                    let guideDown = this.getSquare(pos.row+d, pos.col);
                    if(guideDown && !guideDown.block /*&& !guideDown.player*/) {
                       
                        $('#'+guideDown.id).addClass('guide');
//                        continue;
                    } 
                    else { break; }  
                } 

            let l;
                for (l=1; l<4; l++) {
                    let guideLeft = this.getSquare(pos.row, pos.col-l);
                    if(guideLeft && !guideLeft.block /*&& !guideLeft.player*/) {
                       
                        $('#'+guideLeft.id).addClass('guide');
//                        continue;
                    } 
                    else { break; }
                } 

            let r;
                for (r=1; r<4; r++) {
                    let guideRight = this.getSquare(pos.row, pos.col+r);
                    if(guideRight && !guideRight.block /*&& !guideRight.player*/) {
                       
                        $('#'+guideRight.id).addClass('guide');
//                        continue;
                    } 
                    else { break; }
                } 
    }
    

    addBlock(b) {
        
        let pos = this._getRandomPosition(); 
        let sq = this.getSquare(pos.row, pos.col);
        while(sq.block) {
            pos = this._getRandomPosition(); 
            sq = this.getSquare(pos.row, pos.col);
        }
        sq.block = b;
        this.blockObjArray.push(sq.location);
    }
    
    addWeapon(weapon) {
        
        let pos = this._getRandomPosition(); 
        let sq = this.getSquare(pos.row, pos.col);
        while(sq.block || sq.weaponObj) {
            pos = this._getRandomPosition(); 
            sq = this.getSquare(pos.row, pos.col);
        }
        sq.weapon = weapon;
    }

    addPlayerOne(player) { 
        
        let pos = this._getRandomPosition(); 
        let sq = this.getSquare(pos.row, pos.col);
        
        while(sq.block || sq.weaponObj) {
            pos = this._getRandomPosition(); 
            sq = this.getSquare(pos.row, pos.col);
        }
        this.playerPosition.push(pos);
        sq.player = player;
        this.position = pos;                                 
        this.player = player;
        this.playerOne = player;
        this._playerVisualGuide(pos);
        this.playerObjArray.push(player);
    }
    
    addPlayerTwo(player) { 
        
        let pos = this._getRandomPosition(); 
        let sq = this.getSquare(pos.row, pos.col);
        let fightPos = this._nearbyPlayerDetection(pos);
        
        while(sq.block || sq.weaponObj || sq.playerObj || fightPos) {
            console.log('playerTwo positioning method worked')
            pos = this._getRandomPosition(); 
            sq = this.getSquare(pos.row, pos.col);
        }
        
        this.playerPosition.push(pos);
        sq.player = player;                               
        this.playerTwo = player;
        this.playerObjArray.push(player);
    }
    
    _nearbyPlayerDetection(playerTwoPos) {
        
        let pos = this.position;
        let playerTwoRow = playerTwoPos.row;
        let playerTwoCol = playerTwoPos.col;
        let validated = null;
        let leftSquare = pos.col-1;
        let rightSquare = pos.col+1;
        let upperSquare = pos.row-1;
        let lowerSquare = pos.row+1;
        
//        console.log(this.position);
        
        if(playerTwoRow == pos.row && (playerTwoCol == leftSquare || playerTwoCol == rightSquare)) {
        validated = true;
        console.log('match made');
        }
            
        if(playerTwoCol == pos.col && (playerTwoRow == upperSquare || playerTwoRow == lowerSquare)) {
        validated = true;
        console.log('match made');  
        }

        return validated;
    }
    
    _nearbyPlayerDetectionFight(clickSq, oponent) {
        
        let oponentPos = oponent.position;
//        let playerTwoRow = pos.row;
//        let playerTwoCol = pos.col;
        let validated = false;
        let leftSquare = clickSq.col-1;
        let rightSquare = clickSq.col+1;
        let upperSquare = clickSq.row-1;
        let lowerSquare = clickSq.row+1;
        
      
        if(oponentPos.row == clickSq.row && (oponentPos.col == leftSquare || oponentPos.col == rightSquare)) {
        validated = true;
        console.log('match made');
        }
            
        if(oponentPos.col == clickSq.col && (oponentPos.row == upperSquare || oponentPos.row == lowerSquare)) {
        validated = true;
        console.log('match made');  
        }

        return validated;
    }
    
    _obstacleBlock() {
            
//        let clickLocation = pos;
        let playerLocation = this.position;
//        console.log(playerLocation);
        let plsq = this.getSquare(playerLocation.row, playerLocation.col);
//        let clsq = this.getSquare(pos.row, pos.col);
        
//        let i;
//        for(i=1;i<=2;i++) {
        
//        let clRow = clickLocation.row;
//        let clCol = clickLocation.col;
//        let clRowUp = clickLocation.row - i;
//        let clRowDown = clickLocation.row + i;
//        let clColLeft = clickLocation.col - i;
//        let clColRight = clickLocation.col - i;
        let plRow = playerLocation.row;
        let plCol = playerLocation.col;
        let validated = 0;
        
        let sqBlockUp = this.getSquare(plRow-1, plCol);
        let sqBlockDown = this.getSquare(plRow+1, plCol);
        let sqBlockLeft = this.getSquare(plRow , plCol-1);
        let sqBlockRight = this.getSquare(plRow, plCol+1);
        let sqBlockUp2 = this.getSquare(plRow+2, plCol);
        let sqBlockDown2 = this.getSquare(plRow-2, plCol);
        let sqBlockLeft2 = this.getSquare(plRow, plCol+2);
        let sqBlockRight2 = this.getSquare(plRow, plCol-2);
            
        if(sqBlockUp.block) {
           return validated = 1 + console.log('test block '+validated);
        } 
        
        if(sqBlockDown.block) {
            
            return validated = 2 + console.log('test block '+validated);
        } 
        
        if(sqBlockLeft.block) {
            
            return validated = 3 + console.log('test block '+validated);
        } 
        if(sqBlockRight.block) {
            
            return validated = 4 + console.log('test block '+validated);
        }
        
        this.blockMoveValue = validated;
    }
    
    _weaponPickUp(pos) {
        
        let clickLocation = pos;
        let playerLocation = this.position;
        let plsq = this.getSquare(playerLocation.row, playerLocation.col);
        let clsq = this.getSquare(pos.row, pos.col);
        
        if(clsq.weaponObj) {
           let playerObj = this.player;
            playerObj.weapon = clsq.weaponObj;
            
            switch(this.player) {
                case this.playerOne:
                    this.scoreBoard_P1.weaponImg = clsq.weaponObj;
                    this.playerOneWeapon = clsq.weaponObj;
                    break;
                case this.playerTwo:
                    this.scoreBoard_P2.weaponImg = clsq.weaponObj;
                    this.playerTwoWeapon = clsq.weaponObj;
                    break;
            }
        }
    }
    
    
                                                                     
    _checkValidMove(pos) {
        
        let clickLocation = pos;
        let playerLocation = this.position;
        let plsq = this.getSquare(playerLocation.row, playerLocation.col);
        let clsq = this.getSquare(pos.row, pos.col);
        
//            let clRowUp = clickLocation.row - 1;
//            let clRowDown = clickLocation.row + 1;
//            let clColLeft = clickLocation.col + 1;
//            let clColRight = clickLocation.col - 1;
        
        
        let playerGo = null; 
        
        let i;
        for(i=1;i<=3;i++) {
            
        let clRow = clickLocation.row;
        let clCol = clickLocation.col;
        let clRowUp = clickLocation.row - i;
        let clRowDown = clickLocation.row + i;
        let clColLeft = clickLocation.col - i;
        let clColRight = clickLocation.col + i;
        let plRow = playerLocation.row;
        let plCol = playerLocation.col;
        let blockUp = true;
        let blockDown = true;
        let blockLeft = true;
        let blockRight = true;
/*Vertical movement verification logic ****************************************/
        
        let sqBlockUp = this.getSquare(plRow-1, plCol);
        let sqBlockDown = this.getSquare(plRow+1, plCol);
        let sqBlockLeft = this.getSquare(plRow ,plCol-1);
        let sqBlockRight = this.getSquare(plRow, plCol+1);
        let sqBlockUp2 = this.getSquare(plRow-2, plCol);
        let sqBlockDown2 = this.getSquare(plRow+2, plCol);
        let sqBlockLeft2 = this.getSquare(plRow, plCol-2);
        let sqBlockRight2 = this.getSquare(plRow, plCol+2);
            
//            && !sqBlockDown.block && !sqBlockUp.block && !sqBlockDown2.block && !sqBlockUp2.block
//            
//            && !sqBlockLeft.block && !sqBlockRight.block && !sqBlockLeft2.block && !sqBlockRight2.block
            
        this._obstacleBlock();
        console.log(this.blockMoveValue);    
        
        switch(this.blockMoveValue) {
            case 1:
                blockUp = false;
                console.log('test move block '+blockUp);
                break;
            case 2:
                blockDown = false;
                console.log('test move block '+blockDown);
                break;
            case 3:
                blockLeft = false;
                console.log('test move block '+blockLeft);
                break;
            case 4:
                blockRight = false;
                console.log('test move block '+blockRight);
                break;
        }   
            
        if(!clsq.block) {
        
            if(blockUp) {
                if((clRowUp) == plRow && clCol == plCol) {
                    playerGo = true;
                }
            }
            if(blockDown) {
                if((clRowDown) == plRow && clCol == plCol)  {
                    playerGo = true;    
                }
            }
        }    
        
/*Horizontal movement verification logic *************************************/  
        
        if(!clsq.block) {
            
            if(blockLeft) {
                if((clColLeft) == plCol && clRow == plRow) {
                playerGo = true;
                }
            }
            if(blockRight) {
                if((clColRight) == plCol && clRow == plRow) {
                playerGo = true;    
                }
            }
        
        }       
        } /* for loop ends here */
        
        switch(this.player) {
                case this.playerOne:
                let fightOne = this._nearbyPlayerDetectionFight(clickLocation, this.playerTwo);
                console.log(fightOne);
                if(fightOne) {
                    this.startFightMode(this.playerOne);
                }
                    break;
                case this.playerTwo:
                let fightTwo = this._nearbyPlayerDetectionFight(clickLocation, this.playerOne);
                console.log(fightTwo);
                if(fightTwo) {
                    this.startFightMode(this.playerTwo);
                }
                    break;
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
        
        switch(this.player) {
        case this.playerOne:
            this.player = this.playerTwo;
            this.position = this.playerTwo.position;
            $('td').removeClass('guide');
            this._playerVisualGuide(this.position);
                break;
        case this.playerTwo:
            this.player = this.playerOne;
            this.position = this.playerOne.position;
             $('td').removeClass('guide');
            this._playerVisualGuide(this.position);
                break;
        } 
    }
    

    
    startFightMode(firstMovePlayer) {
        
        let p1 = this.playerOne;
        let p2 = this.playerTwo;
        let p1Weapon = this.playerOneWeapon;
        let p2Weapon = this.playerTwoWeapon;
        this.scoreBoard_P1.board = this;
        this.scoreBoard_P2.board = this;
//        console.log(this.scoreBoard_P1.board);
//        console.log(this.scoreBoard_P2.board);
        this.scoreBoard_P1.playerObj = p1;
        this.scoreBoard_P2.playerObj = p2;
        
        /*Initiate triger mode on Score board - buttons are now visible*/
        
        switch(firstMovePlayer) {
        case p1:
//            this.scoreBoard_P2.board = this;
                console.log(this.scoreBoard_P2.board);
            this.scoreBoard_P2.fightMode = p2;
                break;
        case p2:
//            this.scoreBoard_P1.board = this;
                console.log(this.scoreBoard_P1.board);
            this.scoreBoard_P1.fightMode = p1;
                break;
        } 
        
    }
     
}

//&& !sqBlockLeft.block && !sqBlockRight.block && !sqBlockLeft2.block && !sqBlockRight2.block

//
//_nearbyPlayerDetection(playerTwoPos) {
//        
//        let pos = this.position;
//        let playerTwoRow = playerTwoPos.row;
//        let playerTwoCol = playerTwoPos.col;
//        let validated = false;
//        let leftSquare = pos.col-1;
//        let rightSquare = pos.col+1;
//        let upperSquare = pos.row-1;
//        let lowerSquare = pos.row+1;
//        
//        console.log(this.position);
//        
//        if(playerTwoRow == pos.row && (playerTwoCol == leftSquare || playerTwoCol == rightSquare)) {
//        validated = true;
//        console.log('match made'+validated);
//        }
//            
//        if(playerTwoCol == pos.col && (playerTwoRow == upperSquare || playerTwoRow == lowerSquare)) {
//        validated = true;
//        console.log('match made'+validated);  
//        }
//
//        return validated;
//    }

    
//    newGame() {
//       // full screen massage pop up 
//        this.player = this.playerOne;
//        this.position = this.playerOne.position;
//        
//    }
//    
//    gameRestart() {
//        
//        let firstTime = (this.elem === null);
//        this._createTable(firstTime);
//        this._setRandomBlocked();
//        this._setRandomCashes();
//
//        if (firstTime) { 
//            // Use 'keydown' because Chrome and Safari don't generate 'keypress'
//            $(document).on('keydown', Board.prototype.onKeydownEvent.bind(this));
//        }
//    
//        var sq = this._getRandomEmptySquare();
//        sq.player = new Player(this.playerName, 0);
//    } 
//    
//    _gameRound() {
//        
//        
//    }

//        if(playerTwoRow == pos.row) {
//            if(playerTwoCol == leftSquare) {
//                validated = true;
//                console.log('match made');
//            } else if(playerTwoCol == rightSquare) {
//                validated = true;
//                console.log('match made');
//            }
//        }
        
//        if(playerTwoRow === pos.row) {
//            switch(playerTwoCol) {
//                case {leftSquare}:
//                    validated = true;
//                    console.log('match made');
//                        break;
//                case {rightSquare}:
//                    validated = true;
//                    console.log('match made');
//                        break;
//            }
//        }
            
//        if(playerTwoCol == pos.col) {
//            if(playerTwoRow == upperSquare) {
//                validated = true;
//                console.log('match made');
//            } else if(playerTwoRow == lowerSquare) {
//                validated = true;
//                console.log('match made');
//            }
//        }
//
//        if(playerTwoCol === pos.col) {
//            switch(playerTwoRow) {
//                case {upperSquare}:
//                    validated = true;
//                    console.log('match made');
//                        break;
//                case {lowerSquare}:
//                    validated = true;
//                    console.log('match made');
//                        break;
//            }
//        }

//let d;
//                for (d=1; d<4; d++) {
//                    let guideDown = this.getSquare(pos.row+d, pos.col);
//                    if(!guideDown.blockObj) {
//                       
//                        $('#'+guideDown.id).addClass('guide');
//                    } else { break; }
//                } 
//
//            let l;
//                for (l=1; l<4; l++) {
//                    let guideLeft = this.getSquare(pos.row, pos.col-l);
//                    if(!guideLeft.blockObj) {
//                       
//                        $('#'+guideLeft.id).addClass('guide');
//                    } else { break; }
//                } 
//
//            let r;
//                for (r=1; r<4; r++) {
//                    let guideRight = this.getSquare(pos.row, pos.col+r);
//                    if(!guideRight.blockObj) {
//                       
//                        $('#'+guideRight.id).addClass('guide');
//                    } else { break; }
//                } 

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
//
//switch(this.position) {
//            case {row: pos.row, col: pos.col+1}:
//                validated = true;
//                console.log('match made');
//                    break;
//            case {row: pos.row, col: pos.col-1}:
//                validated = true;
//                console.log('match made');
//                    break;
//            case {row: pos.row-1, col: pos.col}:
//                validated = true;
//                console.log('match made');
//                    break;
//            case {row: pos.row+1, col: pos.col}:
//                validated = true;
//                console.log('match made');
//                    break;
//                case pos:
//                validated = true;
//        }

//    _fightModeDetection(otherPlayer/*click event position*/) {
//        
//        switch(this.position) {
//                case this.playerOne:
//                let oponent = this.playerTwo;
//                console.log('player one')
//        
//                    break;
//                case this.playerTwo:
//                let oponent = this.playerOne;
//                console.log('player two')
//     
//                    break;
//        }
//        let pos = oponent.position;
//        console.log(pos);
//        let playerTwoRow = otherPlayer.row;
//        let playerTwoCol = otherPlayer.col;
//        let validated = false;
//        let leftSquare = pos.col-1;
//        let rightSquare = pos.col+1;
//        let upperSquare = pos.row-1;
//        let lowerSquare = pos.row+1;
//        
//        console.log('player detection intiated');
//          
////        let leftSquare = { row: pos.row, col: pos.col-1 };
////        let rightSquare = { row: pos.row, col: pos.col+1 };
////        let upperSquare = { row: pos.row-1, col: pos.col };
////        let lowerSquare = { row: pos.row+1, col: pos.col };
//        
//        if(playerTwoRow == pos.row && (playerTwoCol == leftSquare || playerTwoCol == rightSquare)) {
//        validated = true;
//        console.log('match made');
//        }
//            
//        if(playerTwoCol == pos.col && (playerTwoRow == upperSquare || playerTwoRow == lowerSquare)) {
//        validated = true;
//        console.log('match made');  
//        }
//
//        return validated+console.log(validated);
//    }

