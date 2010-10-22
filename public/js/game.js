Game = function(){
  this.player = new Player();
  this.cards = [];
  this.drag = null;
  
  $('#player .card').live('mouseenter', $.proxy(this.mouseOver, this));
  $('#player .card').live('mouseleave', $.proxy(this.mouseOut, this));
  $('#player .card').live('mousedown', $.proxy(this.mouseDown, this));
  $('#drag .card').live('mouseup', $.proxy(this.mouseUp, this));
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
    $(target).addClass('hovered').nextAll().addClass('hovered');
  },
  
  mouseOut: function(e) {
    var target = this.getCardEl(e.target);
    $(target).removeClass('hovered').nextAll().removeClass('hovered');
  },
  
  mouseDown: function(e) {
    
    var cardEl = $(this.getCardEl(e.target));
    var card = cardEl.data('card');
    var cardOffset = cardEl.offset();
    var stackEl = cardEl.parent();
    var stack = stackEl.data('stack');
    
    var n = cardEl.nextAll().size()+1;    
    var newStack = stack.take(n);
    newStack.element(); // generates newStack.el
    stack.update();
    
    newStack.el.children().addClass('hovered')
    
    $('#drag').append(newStack.el);
    newStack.el.offset(cardOffset);
    
    this.drag = {
      st: {
        old: stack,
        new: newStack
      },
      el: {
        old: stackEl,
        new: newStack.el
      },
      offset: {
        left: e.pageX - cardOffset.left,
        top: e.pageY - cardOffset.top
      },
      originalLocation: cardOffset
    };
  },
  
  mouseUp: function(e) {
    if (this.drag) {
      var stack = this.drag.st.old;
      stack.merge(this.drag.st.new);
      stack.update();
      
      this.drag.el.new.removeAttr('style');
      this.drag.el.new.offset(this.drag.originalLocation);
      this.drag = null;
      $('#drag').empty();
      $('.hovered').removeClass('hovered');
    }
  },

  mouseMove: function(e) {
    // console.log(this.drag);
    if (this.drag) {
      // console.log('dragging', this.drag);
      this.drag.el.new.offset({
        left: e.pageX - this.drag.offset.left,
        top: e.pageY - this.drag.offset.top
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
  $('#top').append(game.player.el);      

  $(document).disableTextSelection();
  
})(jQuery);