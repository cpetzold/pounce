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
    
    this.el = el;
    this.el.data('card', this);
    
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