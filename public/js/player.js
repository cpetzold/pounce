Player = function() {
  this.avatar = 'avtest.png';
  
  var deck = new Deck();
  deck.shuffle();
  this.hand = deck.take(35);
  this.pile = deck.take(13);
  this.spots = [];
  for (var i = 0; i < 4; i++) {
    this.spots.push(deck.take(1));
  }
  
  this.el = this.element();
};
  
Player.prototype = {
  element: function() {
    var el = $('<div id="player"></div>');
    var pounce = $('<div class="pounce"></div>');
    pounce.append($('<ul class="stack"><li class="card" style="background: url(../images/' + this.avatar + ')"><span class="size">13</span></li></ul>'));
    
    
    var piles = $('<div class="piles"></div>');
    for (var i = 0; i < this.spots.length; i++) {
      var stack = this.spots[i];
          stackEl = stack.element();
      piles.append(stackEl);
    }
    
    var stream = $('<div class="stream"></div>');
    for (var i = 0; i < 2; i++) {
      var card = this.hand[i];
      console.log(card);
    }
    
    return el.append(pounce, piles, stream);
  }
};