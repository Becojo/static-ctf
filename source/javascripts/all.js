//= require_tree .

function checkFlag(flag, cb) {
  $.ajax({
    dataType: 'json',
    url: '/flags/' + flag + '.json',
  }).done(function(data) {
    cb(data, false);
  }).fail(function() {
    cb(null, true);
  });
}

$(function() {
  var response = $('#response');
  var flag = $('#flag');
  
  $('#submit-flag-form').submit(function(e) {
    checkFlag(flag.val().trim(), function(data, err) {
      if(err) {
        Materialize.toast('Nope', 1000);
      } else {
        if(!localStorage['completed_' + data.id]) {
          Materialize.toast('Congrats!', 1000);
        }
        
        localStorage['completed_' + data.id] = 1;
        localStorage['flags_' + data.id] = data.flag;
      }
    });
    
    return false;
  });

  $('.challenge').each(function() {
    if(localStorage['completed_' + this.id]) {
      $(this).find('.active').removeClass('active').end()
             .find('.material-icons').html('done');
    }
  });

  $('.collapsible').collapsible();
});
