$(document).ready(function () {
	 
    if ($('.leagues').attr('data-user')) {
        var commish = $('.leagues').attr('data-user');
        $.get( '/api/leagues/' + commish, function(data) {
            for (var i = 0; i < data.length; i++) {
              console.log(data);
                $('.leagues').append('Name: ' + data[i].name + '<br>Preset: ' + data[i].preset 
                    + '<br>Commish: ' + data[i].commissioner);
                
                if (data[i].leagueMembers.length > 0) {
                    var memberArray = data[i].leagueMembers;
                    $('.leagues').append('<br>Members: ');
                    for (var ii = 0; ii < memberArray.length; ii++) {
                        $('.leagues').append(memberArray[ii] + ', ');
                    }
                  
                }

                if (data[i].workouts.length > 0) {
                    var workouts = data[i].workouts;
                    $('.leagues').append('<br>Workouts:');
                    for (var iii = 0; iii < workouts.length; iii++) {
                        $('.leagues').append('<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>' + workouts[iii].name + ':</b> ' + workouts[iii].points
                            + '<br>&nbsp;&nbsp;&nbsp;&nbsp;'+ workouts[iii].description_short);   
                    }
                }

                $('.leagues').append('<br><br>');
            }
      });
    }

});
