/* Weapon.js */

 export class Weapon {

    // ------------------------------------------------------------------------
    // Init
    // ------------------------------------------------------------------------

    constructor(random) {
        // Model
        this.nameWeapon = random;
        this.id = '';
        this.weapon = null;
        this.position = null;
        // View
        this.elem = this._createView();  // <div> element
        // 
    }
    
    get idSetup() {

    } 
    
    
    set idSetup(id) {
        return ;
        
    }
     
    _createView() {

        var elem = $('<div>')
            .addClass('weapon')
            .html('<p>Test weapon</p>');
 
        return elem;
    }
     
     
 }

//        elem.click(function() {
//            console.log('player click');
//            console.log(this.name); // Why this.name doesnt work here? It works above! });
            