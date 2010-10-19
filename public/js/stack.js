Stack = function(c) {
  this.cards = c || [];
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
    if (!self.cards.length) {
      self.el.empty();
    } else {
      console.log(self.cards);
      self.el.children().each(function(k, v){
        if (!self.cards[k]) $(v).detach();
      });
      
    }
  },
  
  get: function(i) {
    return this.cards[i];
  },

  add: function(c) {
    this.cards.push(c);
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
