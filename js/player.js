Player = function() {
  var deck = new Deck();
  deck.shuffle();
  this.hand = deck.take(35);
  this.pile = deck.take(13);
  this.spots = [];
  for (var i = 0; i < 4; i++) {
    this.spots.push(deck.take(1));
  }
};
  
Player.prototype = {
  element: function() {
    var el = $('<div class="player"></div>');
    for (var i = 0; i < this.spots.length; i++) {
      var stack = this.spots[i];
          stackEl = stack.element();

      el.append(stackEl);
    }
    return el;
  }
};