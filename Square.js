/* Square.js */

import { Player } from './Player.js';
import { Weapon } from './Weapon.js';


export class Square {

    constructor(row, col) {
  
            this.id = `sq_${row}_${col}`; 
            this.location = {row: row, col: col};
            this.playerObj = null;
            this._blockObj = null;
            this.weaponObj = null;
            this.playerActive = false;
            this.col = col;
            this.row = row;
            this.elem = this._createView();
        
    }

    _createView() {
        
            let elem = $('<td>').attr('id', this.id);
            return elem;
    }
    
    

    get player() {
        
            return this.playerObj;
    }

    set player(player) {
        
            this.playerObj = player;
            this.playerActive = true;
            if (player) {
                $('#'+this.id).empty();
                $('#'+this.id).append(player.elem);
                player.position = this.location;
                
                    if(this.weaponObj) { 
                        player.weapon = this.weaponObj;
//                        console.log(player.weapon)
                        $('#'+this.id).empty();
                        $('#'+this.id).append(player.elem);     
                        }
                }
    }
 
    get block() {
        
            return this._blockObj;
    }
    
    set block(block) {
        
            this._blockObj = block;
            if (block) {
                $('#'+this.id).addClass('block');
                } 
    }
    
    get weapon() {
        
            return this.weaponObj;
    }
    
    set weapon(weapon) {
        
            this.weaponObj = weapon;
            weapon.position = this.location;
            weapon.id = this.id;
            $('#'+this.id).append(weapon.elem);

    }
}
