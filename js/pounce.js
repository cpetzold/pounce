Pounce = function() {
  var activeStack;
  
  var init = function() {
    var p = new Player();
    $('#board').append(p.element());      
    
    var d = new Deck();
    d.shuffle();
    var s = d.take(10);
    $('#board').append(s.element());
    
    
    $('.card').live('mouseover mouseout', function(e){
      if (e.type == 'mouseover') {
        $(this).addClass('hovered');
        $('.hovered ~ li').addClass('hovered'); 
      } else {
        $('.hovered').removeClass('hovered');
      }
    });
    
  };
  
  return {
    init: init
    
  };
  
  
}();

$(Pounce.init);