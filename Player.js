/* Player.js */

 export class Player {

    // ------------------------------------------------------------------------
    // Init
    // ------------------------------------------------------------------------

    constructor(name) {
        // Model
        this.name = name;
        this.health = 100;
        this.weaponObject = null;
        this.position = null;
        this.id = null;
        this.firePower = 10;

        // View
        this.elem = this._createView();
//        this.defaultWeapon = this._defaultWeapon();
    }
     
    _createView() {
        var elem = $('<div>')
            .attr('id', this.name)
            .addClass('player')
            .html('<p><b>'+this.name+'</b></p>');
            
        return elem;
    }
     
    get weapon() {
           return this.weaponObject; 
    }
     
    set weapon(weaponObj) {
                
                console.log();
                console.log(weaponObj);
            if(weaponObj) {
                this.weaponObject = weaponObj;
                this.firePower = this.weaponObject.power;
                console.log(weaponObj.power);
            }
//            $('#'+this.name).
//            this.weapon = weaponObj;
        
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