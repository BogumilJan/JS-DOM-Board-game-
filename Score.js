/*Score.js*/

export class Score {
    
    constructor(divId, playerName) {
        
        
        this.name = playerName;
        this.divID = divId;
        this.nameField = null;
        this.lifeBar = null;
        this.weaponField = null;
        this.view = this._createView();
        this.playerLifePoints = 50;
        this.elem = null;
        
        this._initScoreBoard();
        this._createView();
        
    }
    
_initScoreBoard() {
        
        this.nameField = $('<div>')
            .attr('id','playerNameBracket')
            .addClass('bracket')
            .html('<h4>'+this.name+'</h4>');

        this.lifeBar = $('<div>')
            .attr('id', 'lifePointsBracket')
            .addClass('bracket')
            .html('<label for="life">'+this.playerLifePoints+'% </label><progress id="life" value="'+this.playerLifePoints+'" max="100"></progress>');

        this.weaponField = $('<div>')
            .attr('id','weaponBracket')
            .addClass('bracket')
            .html('<h4>Weapon</h4><img src="rocket_launcher.jpg" id="scoreImage">');
    
    
        $('#'+this.divID).append(this.nameField);
        $('#'+this.divID).append(this.lifeBar);
        $('#'+this.divID).append(this.weaponField);
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