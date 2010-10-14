Pounce = function() {
  var activeStack;
  
  var init = function() {
    
    var game = new Game();
    $('#board').append(game.player.element());      

    
    
  };
  
  return {
    init: init
  };
  
  
}();

$(Pounce.init);