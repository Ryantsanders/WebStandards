/*  
	Your Project Title
	Author: You
*/

(function($) {
	/*Tool tip*/

$('.masterTooltip').hover(function(){
	var title = $(this).attr('title');
	$(this).data('tipText', title).removeAttr('title');
	$('<p class="tooltip"></p>')
	.text(title)
	.appendTo('body')
	.fadeIn('slow');
}, function() {
	$(this).attr('title', $(this).data('tipText'));
	$('.tooltip').remove();
}).mousemove(function(e) {
	var mousex = e.pageX + 20;
	var mousey = e.pageY + 10;
	$('.tooltip')
	.css({ top: mousey, left: mousex })
});



	
	/*Modal*/
$('.modalClick').on('click', function(event){
	event.preventDefault();
	$('#overlay')
	.fadeIn()
	.find('#modal')
	.fadeIn();
	});
	
$('.close').on('click', function(event){
	event.preventDefault();
	$('#overlay')
	.fadeOut()
	.find('#modal')
	.fadeOut();
	});
	

	
$('.status').mouseover(function(){
	$(this).fadeTo(100, .3);
});

$('.status').mouseout(function(){
	$(this).fadeTo(100, 1);
});

$('#tabs p').hide().eq(0).show();
$('#tabs p:not(:first)').hide();

$('#tabs-nav li').click(function(e){
	e.preventDefault();
	$('#tabs p').hide();
	
$('#tabs-nav .current').removeClass("current");
	$(this).addClass('current');
	var clicked = $(this).find('a:first').attr('href');
	
	$('#tabs ' + clicked).fadeIn('fast');
	}).eq(0).addClass('current');
	
$(".menu > li").hover(function(){
    $(this).filter(':not(:animated)').animate({ width: "200px" });
}, function() {
    $(this).animate({ width: "100px" });
});

// the jquery for the login form
$('#signIn').click(function () {
	// here we have 2 vars that create the value of the variables by passing in the id's of username and password
    var user = $('#username').val();
    var pass = $('#password').val();
    console.log("this notifies you if the password is working");
    $.ajax({
    	// using the login.php file from the database
        url: 'xhr/login.php',
        type: 'post',
        dataType: 'json',
        data: {
            username: user,
            password: pass
        },
        success: function (response) {
            console.log("test user");
            if (response.error){
            alert(response.error);
        } else {
            window.location.assign('dashboard.html')
        };
    }
    });
});

// log out button

$('#signOut').click(function(e){
	e.preventDefault;
	$.get('xhr/logout.php', function(){
		window.location.assign('index.html')
		})
	});   
	
// button that takes you to the projects page i had a problem at first because I was using the $get witht he logout.php for all my buttons which caused me to always logout
//and my jquery for the add project wasnt working until I figured that out
		
$('#projectpage').click(function(e){
	e.preventDefault;
		window.location.assign('projects.html')
	});

// button to go to the dashboard uses window.location.assign to go to the dashboard.html
$('#dash').click(function(e){
	e.preventDefault;
		window.location.assign('dashboard.html')
	});

// button to go to the register form this button is on the home page	
$('#regi').click(function(e){
	e.preventDefault;
		window.location.assign('register.html')
	});
	
	
// register jquery

$('#regis').on('click', function(){
	// register button have to set up a lot of variables to be able to pull the values from them to create an account
	var firstname = $('#first').val(),
		lastname = $('#last').val(),
		username= $('#username').val(),
		email= $('#email').val(),
		password = $('#password').val();
		console.log(firstname+' '+lastname+' '+email+' '+password);
		
	$.ajax({
		url:'xhr/register.php',
		type: 'post',
		dataType: 'json',
		data: {
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email,
			password: password,
		},
		
		success: function(response){
			if (response.error){
				alert(response.error);
			}else{
				// takes you to the dashboard after you create your account
				window.location.assign('dashboard.html');
			}
			
		}
	});

});


// welcome user 
// jquery to get the users id when they login to display their name
$.getJSON("xhr/check_login.php", function(data){
	console.log(data);
	$.each(data, function(key, val){
		console.log(val.first_name);
		$(".userid").html("Welcome User: "+ val.first_name);
		})
	});	
	
// new projects

$('#addButton').on('click', function() {
	// variable for the inputs on the modal window
	var projName = $('#projectName').val(),
		projDesc = $('#projectDescription').val(),
		projDue = $('#projectDueDate').val(),
		status = $('input[name = "status"]:checked').prop("id");
		// ajax using the new_project.php file 	
	$.ajax({
		url: "xhr/new_project.php",
		type: "post",
		dataType: "json",
		data: {
			projectName: projName,
			projectDescription: projDesc,
			dueDate: projDue,
			status: status
		},
		success: function(response) {
			console.log('testing for success');
			
			if(response.error) {
			alert(response.error);
			}else{
				window.location.assign("projects.html");
			};
		}
	});
});

// get projects

var projects = function(){

	$.ajax({
		url: 'xhr/get_projects.php',
		type: 'get',
		dataType: 'json',
		success: function(response){
			if(response.error){
				console.log(response.error);
				}else{
					
					for(var i=0, j=response.projects.length; i < j; i++){
						var result = response.projects[i];
						
						$(".projects").append(
							//'<div style="border:1px solid black">' +
							'<div id="sortable" class="ui-state-default">' +
							" <input class='projectid' type=hidden value='" + result.id + "'>" +
							" Project Name: " + result.projectName + "<br>" +
							" Project Description: " + result.projectDescription + "<br>" +
							" Project status: " + result.status + "<br>"
							+ '<button class="deletebtn">Delete</button>'
							+ '<button class="editbtn">Edit</button>'
							+ '</div> <br>'
						);
					};
					$('.deletebtn').on('click', function(e){
						console.log('test delete');
						var pid = $(this).parent().find(".projectid").val();
						$.ajax({
							url: 'xhr/delete_project.php',
							data: {
								projectID: pid
							},
							type: 'POST',
							dataType: 'json',
							success: function(response){
								console.log('testing for success');
							
								if(response.error) {
									alert(response.error);
								}else{
									console.log(result.id);
									window.location.assign("projects.html");
							};
						}
					});
				}); // end delete
				
			}
			
		}
	})
	}
	projects();	
	
	//theme buttons
	$(function() {
    $( "input[type=submit], a, button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
      });
  });

	var currentIndex = 0,
  items = $('.cycle div'),
  itemAmt = items.length;

function cycleItems() {
  var item = $('.cycle div').eq(currentIndex);
  items.hide();
  item.css('display','inline-block');
}

var autoSlide = setInterval(function() {
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
}, 3000);

$('.next').click(function() {
  clearInterval(autoSlide);
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
});

$('.prev').click(function() {
  clearInterval(autoSlide);
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = itemAmt - 1;
  }
  cycleItems();
});
  
  
	
})(jQuery); // end private scope




