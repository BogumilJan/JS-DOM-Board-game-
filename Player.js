/* Player.js */

 export class Player {

    // ------------------------------------------------------------------------
    // Init
    // ------------------------------------------------------------------------

    constructor(name) {
        // Model
        this.name = name;
        this.weapon = null;
        this.position = null;
        this.id = null;

        // View
        this.elem = this._createView();
        this.defaultWeapon = this._defaultWeapon();
    }
     
    _createView() {
        var elem = $('<div>')
            .attr('id', this.name)
            .addClass('player')
            .html('<p><b>'+this.name+'</b></p>');
            
        return elem;
    }
     
    get weapon() {
           return  
    }
     
    set weapon(weaponObj) {
        
//            $('#'+this.name).
            this.weapon = weaponObj;
        
//            this.weaponObj = weapon;
//            weapon.position = this.location;
//            weapon.id = this.id;
//            $('#'+this.id).append(weaponObj.elem);

    
    }
     
    _defaultWeapon() {
        this.weapon = 10;
        this.currentDamage = 10;
    }
    
     
    

    // ------------------------------------------------------------------------
    // Other
    // ------------------------------------------------------------------------
     
    

}