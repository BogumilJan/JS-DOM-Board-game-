/* App.js */

"use strict";

import { Board } from './Board.js';
import { Player } from './Player.js';
import { Weapon } from './Weapon.js';
import { Score } from './Score.js';


 export class App {

    constructor(divId, boardSize, player_1, player_2) {
    
        this.board = null;
        this.elem = null;  
        this.playerOne = player_1;
        this.playerTwo = player_2;
        this.scoreBoard_P1 = null;
        this.scoreBoard_P2 = null;
        
        this._initBoard(divId, boardSize);
        this._initScoreBoard();
        this._initBlock();
        this._initWeapon();
        this._initPlayers();
        this._initNewGame();
      
    }

    _initBoard(divId, boardSize) {
        
            this.board = new Board(boardSize);
            this.elem = $('<div>')
            .attr('id', 'the_game')
            .append(this.board.elem);  
            
            $('#'+divId).append(this.elem);
            
    }
     
    _initScoreBoard() {
            
            this.scoreBoard_P1 = new Score('1', this.playerOne);
            this.scoreBoard_P2 = new Score('2', this.playerTwo);
            this.board.scoreBoard_P1 = this.scoreBoard_P1;
            this.board.scoreBoard_P2 = this.scoreBoard_P2;
//            $('#side-container').append(this.scoreBoard_P1.nameField);
//            $('#side-container').append(this.scoreBoard_P2);
    }
   
     _initBlock() {
         let b = true;
        for (let i=0; i<5; i++) {
            this.board.addBlock(b);
        }
    } 
     
    _initWeapon() {
        for (let i=0; i<4; i++) {
//            console.log('Number '+i);
            let w = new Weapon(i);
            this.board.addWeapon(w);
        }
    }

    _initPlayers() {
            let playerOne = new Player(this.playerOne);
            let playerTwo = new Player(this.playerTwo);
//            console.log(this.playerTwo);
            this.board.playerOne = playerOne;
            this.board.playerTwo = playerTwo;
            this.board.addPlayerOne(playerOne);
            this.board.addPlayerTwo(playerTwo);
        }
    _initNewGame() {
//            this.board.newGame();
    }
    
}