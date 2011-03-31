Game = function(){
  this.player = new Player();
  this.cards = [];
  this.drag = $('#drag');
  
  $('#player .card').live('mouseenter', $.proxy(this.mouseOver, this));
  $('#player .card').live('mouseleave', $.proxy(this.mouseOut, this));
  //   $('#player .card').live('mousedown', $.proxy(this.mouseDown, this));
  //   $('#drag .card').live('mouseup', $.proxy(this.mouseUp, this));  
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
    var self = this;
    var target = $(this.getCardEl(e.target));
    target.addClass('hovered').nextAll().addClass('hovered');
    if (!target.hasClass('ui-draggable')) {
      target.draggable({
        helper: 'clone',
        // helper: $.proxy(self.dragStack, self),
        // appendTo: '#drag',
        containment: 'document',
        
        start: $.proxy(self.dragStart, self),
        stop: $.proxy(self.dragStop, self)
      });

    }
  },
  
  mouseOut: function(e) {
    var target = this.getCardEl(e.target);
    $(target).removeClass('hovered').nextAll().removeClass('hovered');
  },
  
  dragStack: function(e) {
    var cardEl = $(this.getCardEl(e.target));
    var card = cardEl.data('card');
    var cardOffset = cardEl.offset();
    var stackEl = cardEl.parent();
    var stack = stackEl.data('stack');
    
    var n = cardEl.nextAll().size()+1;    
    var newStack = stack.take(n);
    newStack.element();
    stack.update();

    newStack.el.children().addClass('hovered');
    newStack.el.offset({x: 100, y: 100});
    console.log(newStack.el.offset());
    return newStack.el;
  },
  
  dragStart: function(e, ui) {
    console.log(e, ui);
  },
  
  dragStop: function(e, ui) {
    console.log(e, ui);
    // if (this.drag) {
    //   var stack = this.drag.st.old;
    //   stack.merge(this.drag.st.cur);
    //   stack.update();
    //   
    //   this.drag.el.cur.removeAttr('style');
    //   this.drag.el.cur.offset(this.drag.originalLocation);
    //   this.drag = null;
    //   $('#drag').empty();
    //   $('.hovered').removeClass('hovered');
    // }
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