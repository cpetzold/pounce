
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

Card = function(s, v) {
  this.value = v;
  this.suit = s;
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
      v, s, c;
      
  for (s = 0; s < suits.length; s++) {
    for (v = 0; v < vals.length; v++) {
      this.cards.push(new Card(suits[s], vals[v], c));
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

  add: function(c) {
    this.cards.push(c);
  },

  top: function() {
    return this.cards[this.cards.length-1];
  }

  toString: function() {
    var str = '', i;
    for (i = 0; i < this.cards.length; i++) {
      str += this.cards[i] + ' ';
    }
    return str;
  }
};