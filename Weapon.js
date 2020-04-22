/* Weapon.js */

 export class Weapon {

    // ------------------------------------------------------------------------
    // Init
    // ------------------------------------------------------------------------

    constructor(weaponType) {

        this.id = '';
        this.weaponId = weaponType;
        this.weapon = null;
        this.position = null;
        this.elem = this._createView();
        this.weaponArray = [];
        this.currentDamage = null;
        // 
    }
     
    _wristSlap() {
        let elem = $('<div>').addClass('weapon').html('<img src="wrist.jpg" style="height:100%; width:100%;">');
        let wrist = 0;
        this.weapon = wrist;
        this.currentDamage = 20;
        console.log(this.currentDamage);
        return elem;
    }
     
    _choke() {
        let elem = $('<div>').addClass('weapon').html('<img src="choke.jpg" style="height:100%; width:100%;">');
        let choke = 1;
        this.weapon = choke;
        this.currentDamage = 30;
        console.log(this.currentDamage);
        return elem;
    }
    
    _theBat() {
        let elem = $('<div>').addClass('weapon').html('<img src="bat.jpg" style="height:100%; width:100%;">');
        let bat = 2;
        this.weapon = bat;
        this.currentDamage = 40;
        console.log(this.currentDamage);
        return elem;
    }
     
    _theGun() {
        let elem = $('<div>').addClass('weapon').html('<img src="gun.jpg" style="height:100%; width:100%;">');
        let gun = 3;
        this.weapon = gun;
        this.currentDamage = 60;
        console.log(this.currentDamage);
        return elem;
    }
     
    _createView() {
//        console.log(this.weaponId);
       
       switch(this.weaponId) {
           case 0:
               return this._wristSlap();
               break;
           case 1:
               return this._choke();
               break;
           case 2:
               return this._theBat();
               break;
           case 3:
               return this._theGun();
               break;
            } 
    }
     
    
     
    
     
     
 }
            