$(document).ready(function () {
	
 	$('#listUsers').on('click', function() {
 		$('.result').html('<h3>Users</h3>');
  		$.get( '/api/users', function(data) {
  			for (var i = 0; i < data.length; i++) {
  				$('.result').append(data[i]._id + ': ' + '<a href="/profile/' + data[i].username + '">' + data[i].username + '</a>');
  				$('.result').append('<br>');
  			}
  			console.log(data);
  		});
  	});	

});
