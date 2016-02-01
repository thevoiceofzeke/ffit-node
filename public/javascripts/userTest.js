$(document).ready(function () {
	
 	$('#listUsers').on('click', function() {
 		$('.result').html('<h3>Users</h3>');
  		$.get( '/api/users', function(data) {
  			for (var i = 0; i < data.length; i++) {
  				$('.result').append(data[i]._id + ': ' + '<a href="/' + data[i].username + '/profile">' + data[i].username + '</a>');
  				$('.result').append('<br>');
  			}
  		});
  	});	

  	$('#listLeagues').on('click', function() {
 		$('.result').html('<h3>Leagues</h3>');
  		$.get( '/api/leagues', function(data) {
  			for (var i = 0; i < data.length; i++) {
  				$('.result').append('Name: ' + data[i].name + '<br>Preset: ' + data[i].preset + '<br>Commish: ' + data[i].commissioner);
  				$('.result').append('<br><br>');
  			}
  		});
  	});	

});
