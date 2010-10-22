Stack = function(c) {
  this.cards = c || [];
  this.emptyEl = $('<li class="card empty"></li>');
};
Stack.prototype = {
  element: function() {
    if (this.el) return this.el;
    
    var el = $('<ul class="stack"></ul>');
  
    var i, c, cel;
    for (i = 0; i < this.cards.length; i++) {
      c = this.cards[i];
      cel = c.element();
      el.append(cel);
    }
    
    this.el = el;
    this.el.data('stack', this);
    
    return el;
  },
  
  update: function() {
    var self = this;
    
    var els = self.el.children();
    els.each(function(k, v){
      if (!self.cards[k] || $(v).hasClass('empty')) $(v).detach();
    });
    
    els = self.el.children();
    
    if (self.cards.length < 1) {
      self.el.append(self.emptyEl);
    } else {
      $.each(self.cards, function(k, v){
        if (!els[k]) self.el.append(v.el);
      });
    }
    
  },
  
  get: function(i) {
    return this.cards[i];
  },

  add: function(c) {
    this.cards.push(c);
  },
  
  merge: function(s) {
    this.cards = this.cards.concat(s.cards);
  },

  top: function(n) {
    if (n > 1) {
      var result = [];
      for (var i = 0; i < n; i++) {
        result.push(this.cards[i]);
      }
      return result;
    } else return this.cards[this.cards.length-1];
  },

  take: function(n) {
    n = n || 1;
    var cards = this.cards.splice(this.cards.length - n, n);
    return new Stack(cards);
  },

  canDrop: function(s) {
    var i = $.inArray(this.top().value, Deck.values);
    if (!i) return false; // if -1 or 0 (not found or value is 2)
    
    var expectedValue = Deck.values[i-1];
    var expectedSuits = (this.top().suit == 'h' || this.top().suit == 'd') ? ['c', 's'] : ['h', 'd'];
    return (s.cards[0].value == expectedValue && $.inArray(s.cards[0].suit, expectedSuits) != -1);
  },

  toString: function() {
    var str = '', i;
    for (i = 0; i < this.cards.length; i++) {
      str += this.cards[i] + ' ';
    }
    return str;
  }
};


Deck = function() {
  this.cards = [];  
  for (var s = 0; s < Deck.suits.length; s++) {
    for (var v = 0; v < Deck.values.length; v++) {
      this.cards.push(new Card(null,  Deck.suits[s], Deck.values[v]));
    }
  }
};
Deck.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
Deck.suits = ['h', 'd', 'c', 's'];
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
    var cards = this.cards.splice(this.cards.length - n, n);
    return new Stack(cards);
  },

  toString: function() {
    var str = '', i;
    for (i = 0; i < this.cards.length; i++) {
      str += this.cards[i] + ' ';
    }
    return str;
  }
};
