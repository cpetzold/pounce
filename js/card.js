
/*
Card
================
  1. DOM Element
  2. Suit / Color
  3. Card (value)


Deck
================

  1. Shuffle
  2. Take
  3


Stack
================

Player
================


*/

Game = function(){
  this.player = new Player();
  this.cards = [];
  
  $('.card').live('mouseover mouseout mousedown', function(e){
    if (e.target.tagName != 'LI') {
      e.target = e.target.parentNode;
    }
    switch (e.type) {
      case 'mouseover':
        $(this).addClass('hovered');
        $('.hovered ~ li').addClass('hovered');
        break;
      case 'mouseout':
        $('.hovered').removeClass('hovered');
        break;
      case 'mousedown':
        console.log('click', e.target.card);
        break;
    }
  });
  
}
Game.ID = 0;
Game.prototype = {
  
  makeCard: function(s, v){
    var id = ++Game.ID;
    return this.cards[id] = new Card(id, s, v);
  },
  addCard: function(c) {
    return this.cards[c.id] = c;
  }
  
}

Card = function(id, s, v) {
  this.value = v;
  this.suit = s;
  this.id = id;
};

Card.prototype = {
  element:function() {
    var sym = this.suitSym(this.suit),
        el = $('<li class="card"></li>'),
        v = $('<span class="value"></span>').text(this.value),
        s = $('<span class="symbol"></span>').html(sym),
        b = $('<span class="back"></span>');
  
    if (this.value == 'A') {
      b.html(sym);
    }
  
    el.addClass(this.suit);    
    el.append(v).append(s).append(b);
    
    el[0].card = this;

    return el;
  },
 
  toString: function() {
    return this.value + this.suitSym(this.suit);
  },

  suitSym: function(suit) {
    var sym;
    switch (suit) {
      case 'h': sym = '\u2665'; break;
      case 'd': sym = '\u2666'; break;
      case 'c': sym = '\u2663'; break;
      case 's': sym = '\u2660'; break;
    }
    return sym;
  }
};


Deck = function() {
  this.cards = [];

  var vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
      suits = ['h', 'd', 'c', 's'],
      v, s;
      
  for (s = 0; s < suits.length; s++) {
    for (v = 0; v < vals.length; v++) {
      this.cards.push(new Card(null,  suits[s], vals[v]));
    }
  }
};
Deck.prototype = {
  shuffle: function() {
    var i, j, o;
    for (i = this.cards.length - 1; i > 0; i--) {
      j = parseInt(Math.random() * i);
      o = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = o;
    }
  },
  
  take: function(n) {
    n = n || 1;
  
    var st = new Stack();
    while (n--) {
      st.add(this.cards.shift());
    }
  
    return st;
  },

  toString: function() {
    var str = '', i;
    for (i = 0; i < this.cards.length; i++) {
      str += this.cards[i] + ' ';
    }
    return str;
  }
};

Stack = function(c) {
  this.cards = c || [];
};
Stack.prototype = {
  element: function() {
    var el = $('<ul class="stack"></ul>');
  
    var i, c, cel;
    for (i = 0; i < this.cards.length; i++) {
      c = this.cards[i];
      cel = c.element();
      if (i == this.cards.length-1) {
        cel.addClass('full');
      }
      el.append(cel);
    }
    return el;
  },

  get: function(i) {
    return this.cards[i];
  },

  add: function(c) {
    this.cards.push(c);
  },

  top: function() {
    return this.cards[this.cards.length-1];
  },

  toString: function() {
    var str = '', i;
    for (i = 0; i < this.cards.length; i++) {
      str += this.cards[i] + ' ';
    }
    return str;
  }
};