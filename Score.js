/*Score.js*/

export class Score {
    
    constructor(divId, playerName) {
        
        
        this.name = playerName;
        this.playerObj = null;
        this.divID = divId;
        this.nameField = null;
        this.lifeBar = null;
        this.weaponField = null;
        this.playerLifePoints = 100;
        this.elem = null;
        this.weaponName = 'a slap';
        this.weaponObj = null;
        this.board = null;
        this.damage = null;
        
        this._initScoreBoard();
//        this.fightMode();
        
    }
    
_initScoreBoard() {
        
        this.nameField = $('<div>')
            .attr('id','playerNameBracket'+this.divID)
            .addClass('bracket')
            .html('<h4>'+this.name+'</h4>');

        this.lifeBar = $('<div>')
            .attr('id', 'lifePointsBracket'+this.divID)
            .addClass('bracket')
            .html('<label for="life">'+this.playerLifePoints+'% </label><progress id="life" value="" max="'+this.playerLifePoints+'"></progress>');
        
        this.weaponField = $('<div>')
            .attr('id','weaponBracket'+this.divID)
            .addClass('bracket')
            .html('<h5>weapon: </h5><h6>'+this.weaponName+'</h6><img src="slap.jpg" id="scoreImage">');
    
        $('#'+this.divID).append(this.nameField);
        $('#'+this.divID).append(this.lifeBar);
        $('#'+this.divID).append(this.weaponField);
    
//        this.fireField = $('<div>').attr('id', 'fireBracket'+this.divID).addClass('bracket');
    
        /*Testing fight mode ****************************************************************************************/
        
//        this.fireButton = $('<button>').attr('id', 'fireButton'+this.divID).addClass('w3-button w3-red w3-round').html('FIGHT');
//        
//        this.fireButton.click(function(){
//            console.log(this.playerObj);
//            
//        });
//        
//        this.escapeButton = $('<div>').attr('id', 'escapeButton'+this.divID).addClass('w3-button w3-red w3-round').attr('onclick', '').html('DEFEND');
//    
//        $('#'+this.divID).append(this.fireField);
//        $('#'+this.divID).append(this.fireButton);
//        $('#'+this.divID).append(this.escapeButton);
    
        
    }
    
get life() {
    
        return true
}

set life(damage) {
    
        let health = this.playerLifePoints - damage;
        this.playerObj.health = health;
        
        $('#lifePointsBracket'+this.divID).html('<label for="life">'+health+'% </label><progress id="life" value="'+health+'" max="100"></progress>');
}
    
get fightMode() {
        
        return true
    }

set fightMode(p) {
        
        let board = this.board;
        let playerOne = this.board.playerOne;
        let playerTwo = this.board.playerTwo;
//        console.log(this.board.scoreBoard_P1.name);
        
       
        
        switch(this.divID) {
            case board.scoreBoard_P1.divID:
            console.log('divID test 1');
                $('#'+'fireBracket'+board.scoreBoard_P1.divID).remove();
                    break;
            case board.scoreBoard_P2.divID:
            console.log('divID test 2');
                $('#'+'fireBracket'+board.scoreBoard_P2.divID).remove();
                    break;
            } 
        
        this.fireField = $('<div>').attr('id', 'fireBracket'+this.divID).addClass('bracket');
        this.fireButton = $('<button>').attr('id', 'fireButton'+this.divID).addClass('w3-button w3-red w3-round').html('ATTACK');
            
        
        this.escapeButton = $('<div>').attr('id', 'escapeButton'+this.divID).addClass('w3-button w3-red w3-round').html('DEFEND');
    
        $('#'+this.divID).append(this.fireField);
        $('#'+this.divID).append(this.fireButton);
        $('#'+this.divID).append(this.escapeButton);
    
        this.fireButton.click(function(){
            
            switch(p.name) {
            case board.scoreBoard_P1.name:
            console.log('fight test 1');
                board.scoreBoard_P2.life = p.firePower;
                board.playerTwo = p;
                    console.log(board.playerTwo);
                board.scoreBoard_P2.fightMode = p;
                
                    break;
            case board.scoreBoard_P2.name:
        console.log('fight test 2');
                board.scoreBoard_P1.life = p.firePower;
                board.playerOne = p;
                    console.log(board.playerOne);
                board.scoreBoard_P1.fightMode = p;
                    break;
            } 
        });   
          
        
    }
    
get weaponImg() {
        
        return 
    
    }
    
set weaponImg(weaponObj) {
            
        if(weaponObj) {
            
            $('#weaponBracket').empty();
            $('#weaponBracket').addClass('bracket').append(this.weaponField.html('<h5>weapon: </h5><h6>'+weaponObj.name+'</h6><img src="'+weaponObj.picture+'" id="scoreImage">'));
        }    
        
    
    }
} 