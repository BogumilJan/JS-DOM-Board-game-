/*Score.js*/

export class Score {
    
    constructor(divId, playerName) {
        
        
        this.name = playerName;
        this.divID = divId;
        this.nameField = null;
        this.lifeBar = null;
        this.weaponField = null;
        this.view = this._createView();
        this.playerLifePoints = 100;
        this.elem = null;
        this.weaponName = 'a slap';
        this.weaponObj = 
        
        this._initScoreBoard();
        this._createView();
        this.fightMode();
        
    }
    
_initScoreBoard() {
        
        this.nameField = $('<div>')
            .attr('id','playerNameBracket'+this.divID)
            .addClass('bracket')
            .html('<h4>'+this.name+'</h4>');

        this.lifeBar = $('<div>')
            .attr('id', 'lifePointsBracket'+this.divID)
            .addClass('bracket')
            .html('<label for="life">'+this.playerLifePoints+'% </label><progress id="life" value="'+this.playerLifePoints+'" max="100"></progress>');

        this.weaponField = $('<div>')
            .attr('id','weaponBracket'+this.divID)
            .addClass('bracket')
            .html('<h5>weapon: </h5><h6>'+this.weaponName+'</h6><img src="slap.jpg" id="scoreImage">');
        
        $('#'+this.divID).append(this.nameField);
        $('#'+this.divID).append(this.lifeBar);
        $('#'+this.divID).append(this.weaponField);
    }

fightMode() {
        
        this.fireField = $('<div>').attr('id', 'fireBracket'+this.divID).addClass('bracket');
        
        this.fireButton = $('<button>').attr('id', 'fireButton'+this.divID).addClass('w3-button w3-red w3-round').attr('onclick', '').html('FIRE');
        
        this.escapeButton = $('<div>').attr('id', 'escapeButton'+this.divID).addClass('w3-button w3-red w3-round').attr('onclick', '').html('RUN');
    
        $('#'+this.divID).append(this.fireField);
        $('#'+this.divID).append(this.fireButton);
        $('#'+this.divID).append(this.escapeButton);
}
    
_createView() {
    
//    this.nameField = $('<div>')
//        .attr('id', 'playerNameBracket')
//        .addClass('nameBracket')
//        .html('<h3>Player:</h3><br><h2>'+this.name+'</h2>');
//    
//    this.lifeBar = $('<div>')
//        .attr('id', 'lifePointsBracket')
//        .addClass('barBracket')
//        .html()
//    
}
    



_playerName(playerName) {
    return
}

} 