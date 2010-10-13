Player = function() {
  var deck = new Deck();
  this.deck.shuffle();
  this.hand = this.deck.take(35);
  this.pile = this.deck.take(13);
  this.spots = [];
  for (var i = 0; i < 4; i++) {
    this.spots.push(this.deck.take(1));
  }
}
  
Player.prototype = {
  element: function() {
    var el = $('<div class="player"></div>');
    for (var i = 0; i < this.spots.length; i++) {
      var stack = this.spots[i];
          stackEl = stack.element();

      $(stackEl).bind('mousedown', { 
        player: this, 
        stack: stack, 
        stackEl: stackEl 
      }, this.clickStack);

      el.append(stackEl);
    }
    return el;
  },
  
  clickStack = function(e) {
    e.preventDefault();
    var player = e.data.player;
        stack = e.data.stack;
        stackEl = e.data.stackEl[0];

    console.log(player.hand, stack, stackEl);
  }
};
  
