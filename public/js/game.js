Game = function(){
  this.player = new Player();
  this.cards = [];
  this.drag = null;
  
  $('#player .card').live('mouseover', $.proxy(this.mouseOver, this));
  $('#player .card').live('mouseout', $.proxy(this.mouseOut, this));
  $('#player .card').live('mousedown', $.proxy(this.mouseDown, this));
  $('#player .card').live('mouseup', $.proxy(this.mouseUp, this));
  $(document).mousemove($.proxy(this.mouseMove, this));
  
}
Game.ID = 0;
Game.prototype = {
  
  getCardEl: function(t) {
    if (t.tagName != 'LI') {
      return t.parentNode;
    }
    return t;
  },
  
  mouseOver: function(e) {
    var target = this.getCardEl(e.target);
    $(target).addClass('hovered');
    $('.hovered ~ li').addClass('hovered');
  },
  
  mouseOut: function(e) {
    $('.hovered').removeClass('hovered');
  },
  
  mouseDown: function(e) {
    console.log(e);
    var cardEl = $(this.getCardEl(e.target));
    var card = cardEl.data('card');
    
    var cardOffset = cardEl.offset();
    this.drag = {
      el: cardEl,
      dx: e.pageX - cardOffset.left,
      dy: e.pageY - cardOffset.top
    };
    
    // console.log(this.drag, card.toString());
  },
  
  mouseUp: function(e) {
    if (this.drag) {
      this.drag.el.addClass('returning');
    }
    this.drag = null;
  },

  mouseMove: function(e) {
    // console.log(this.drag);
    if (this.drag) {
      // console.log('dragging', this.drag);
      this.drag.el.offset({
        top: e.pageY - this.drag.dy,
        left: e.pageX - this.drag.dx
      });
    }
  }
  
};


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


// main
(function($){
  
  var game = new Game();
  $('#bottom').append(game.player.element());      

  $(document).disableTextSelection();
  
})(jQuery);