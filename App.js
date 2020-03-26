/* App.js */

import { Board } from './Board.js';
import { Player } from './Player.js';
import { Weapon } from './Weapon.js'; 


 export class App {

    constructor(divId, boardSize, player_1, player_2) {
        
        this.board = null;  // JS obj
        this.elem = null;  // app <div>
        this.playerOne = player_1;
        this.playerTwo = player_2;
        
        this._initBoard(divId, boardSize);
        this._initBlock();
        this._initWeapon();
        this._initPlayers();
      
    }

    _initBoard(divId, boardSize) {
        
            this.board = new Board(boardSize);
            this.elem = $('<div>')
            .attr('id', 'the_game')
            .append(this.board.elem);  
        
            $('#'+divId).append(this.elem);
    }
     
     _playerName() {
         let p = this.player;   
     }
     
     _initBlock() {
         let b = true;
        for (let i=0; i<5; i++) {
            this.board.addBlock(b);
        }
    } 
     
    _initWeapon() {
        for (let i=0; i<5; i++) {
            let valueRandom = Math.floor(Math.random() * 10);
            console.log(valueRandom);
            let w = new Weapon(valueRandom);
            this.board.addWeapon(w);
        }
    }

    _initPlayers() {
            let playerOne = new Player(this.playerOne);
            let playerTwo = new Player(this.playerTwo);
            console.log(this.playerTwo);
            this.board.playerOne = playerOne;
            this.board.playerTwo = playerTwo;
            this.board.addPlayer(playerOne);
            this.board.addPlayer(playerTwo);
        }
    
}