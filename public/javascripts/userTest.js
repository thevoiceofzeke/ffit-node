$(document).ready(function () {
  	$('#addUserButton').on('click', function() {
  		var username = $('#newUsername').val();
  		var password = $('#newPassword').val();
      var admin = $('#isAdmin').checked;
  		var userData = {
  			'username': username,
  			'password': password,
  			'admin': admin
  		}
  		console.log('adding user: ' + userData.username);

  		$.ajax({
  			type: 'POST',
  			url: '/users',
  			data: userData
  		}).done(function (data) {
  			$( '.result' ).html( data );
  		});

  	});
	
 	$('#listUsers').on('click', function() {
 		$('.result').html('<h3>Users</h3>');
  		$.get( '/users', function(data) {
  			for (var i = 0; i < data.length; i++) {
  				$('.result').append(data[i]._id + ': ' + '<a href="/profile/' + data[i].username + '">' + data[i].username + '</a>');
  				$('.result').append('<br>');
  			}
  			console.log(data);
  		});
  	});	

// INDEX/AUTH PAGE EVENT HANDLERS
  // $('#loginButton').on('click', function() {
  //     var username = $('#username').val();
  //     var password = $('#password').val();
  //     var userData = {
  //       'username': username,
  //       'password': password
  //     }
  //     console.log('authenticating user: ' + username);
  //     $.ajax({
  //       type: 'POST',
  //       url: '/login',
  //       data: userData
  //     }).done(function (data) {
  //       $( '.result' ).html( data );
  //     });
  // });
});
