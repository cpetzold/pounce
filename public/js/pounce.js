Pounce = function() {
  var activeStack;
  
  var init = function() {
    
    var game = new Game();
    // $('#board').append(game.player.element());      

    $(document).disableTextSelection();
    
  };
  
  return {
    init: init
  };
  
  
}();

$(Pounce.init);

jQuery.fn.disableTextSelection = function() {
    return this.each(function() {
        if (typeof this.onselectstart != "undefined") {
            this.onselectstart = function() { return false; };
        } else if (typeof this.style.MozUserSelect != "undefined") {
            this.style.MozUserSelect = "none";
        } else {
            this.onmousedown = function() { return false; };
            this.style.cursor = "default";
        }
    });
};