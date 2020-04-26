/* Weapon.js */

 export class Weapon {

    // ------------------------------------------------------------------------
    // Init
    // ------------------------------------------------------------------------

    constructor(weaponType) {

        this.id = '';
        this.name = null;
        this.weaponId = weaponType;
        this.weapon = null;
        this.position = null;
        this.power = null;
        this.picture = '';
        this.elem = this._createView();
        
        // 
    }
     
    _wristSlap() {
        let elem = $('<div>').addClass('weapon').html('<img src="wrist.jpg" style="height:100%; width:100%;">');
        let wrist = 0;
        this.name = 'wrist slap';
        this.weapon = wrist;
        this.power = 20;
        this.picture = 'wrist.jpg';
//        console.log(this.power);
        return elem;
    }
     
    _choke() {
        let elem = $('<div>').addClass('weapon').html('<img src="choke.jpg" style="height:100%; width:100%;">');
        let choke = 1;
        this.name = 'jujitsu choke';
        this.weapon = choke;
        this.power = 30;
        this.picture = 'choke.jpg';
//        console.log(this.power);
        return elem;
    }
    
    _theBat() {
        let elem = $('<div>').addClass('weapon').html('<img src="bat.jpg" style="height:100%; width:100%;">');
        let bat = 2;
        this.name = 'knock out';
        this.weapon = bat;
        this.power = 40;
        this.picture = 'bat.jpg';
//        console.log(this.power);
        return elem;
    }
     
    _theGun() {
        let elem = $('<div>').addClass('weapon').html('<img src="gun.jpg" style="height:100%; width:100%;">');
        let gun = 3;
        this.name = 'assasination';
        this.weapon = gun;
        this.power = 60;
        this.picture = 'gun.jpg';
//        console.log(this.power);
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
            