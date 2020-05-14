

$(()=>{

	checkUserId();

	//Event Delegation
	$(document)


	//ROUTING
	.on("pagecontainerbeforeshow",function(e,ui){
		console.log(ui.toPage[0].id)
		switch(ui.toPage[0].id) {
			case "home-page":
				showHomePage();
			break;
			case "addnew-page":
				chooseListPage();
			break;
			case "addlocation-page":
				showAddLocationPage();
			break;
			case "list-page":
				showListPage();
			break;
			case "profile-page":
				showUserPage();
			break;
			case "mood-page":
				showMoodPage();
			break;
			case "profile-edit-page":
				showProfileEditPage();
			break;
			case "moodedit-page":
				showMoodEditPage();
			break;
			case "dot-page":
				showDotPage();
			break;


		}
	})



	// FORMS

	.on("submit","#login-form",function(e){
		e.preventDefault();
		checkLoginForm ();


	})


	.on("submit","#signup-form",function(e){
		e.preventDefault();

		if($("#signup-password").val()!=$("#signup-password2").val()) {
			throw "Passwords don't match";
			return;
		}

		query({
			type:'insert_user',
			params:[
				$("#signup-username").val(),
				$("#signup-email").val(),
				$("#signup-password").val(),
				$("#signup-name").val()
			]
		}).then(d=>{
			if(d.error) throw d.error;
			$.mobile.navigate("#home-page");
		})
	})


	// use async function so we can make synchronous requests with "await"
	.on("submit","#list-add-form", async function(e){
		e.preventDefault();

		// get variables from the form and session
		const userId = sessionStorage.userId;
		const name = $("#list-add-name").val();
		const description = $("#list-add-description").val();

		try {

			// insert a new mood on the table for the current user
			await query({
				type:'insert_mood',
				params:[userId, name, description]
			})

			// get the mood we just saved
			const d = await query({
				type:'moods_from_user',
				params:[userId]
			})

			// set the moodId in the session so we have it on other pages
			sessionStorage.moodId = d.result[0].id

			// navigate to mood-page and show content using showMoodPage
			$.mobile.navigate("#mood-page");
		} catch (e) {
			throw e
		}
	})


	/* CLICKS */

	.on("click",".js-addlocation",function(e) {
		query({
			type:'insert_location',
			params:[
				sessionStorage.moodId,
				$("#add-location-lat").val(),
				$("#add-location-lng").val(),
				$("#add-location-description").val()
			]
		}).then(d=>{
			if(d.error) throw d.error;
		})
	})

	.on("click",".js-edit-user",function(e) {
		query({
			type:'edit_user',
			params:[
				$("#edit-user-name").val(),
				$("#edit-user-gender").val(),
				$("#edit-user-city").val(),
				$("#edit-user-bio").val(),
				sessionStorage.userId
			]
		}).then(d=>{
			if(d.error) throw d.error;
		})
	})


	.on("click",".js-edit-mood",function(e) {
		query({
			type:'edit_mood',
			params:[
				$("#edit-mood-name").val(),
				$("#edit-mood-description").val(),
				sessionStorage.moodId
			]
		}).then(d=>{
			if(d.error) throw d.error;
		})
	})

	.on("click",".js-logout",function(e) {
		sessionStorage.removeItem("userId")

		checkUserId();

	})

	.on("click",".mood-jump",function(e){
		if($(this).data("id")===undefined) {
			throw("No id defined on this element");
		}
		sessionStorage.moodId = $(this).data("id");
	})

	// set the session locationId when we click the "Visit Dot" button in makeHomeWindow
	.on("click",".location-button",function(e){
		if($(this).data("id")===undefined) {
			throw("No id defined on this element");
		}
		sessionStorage.locationId = $(this).data("id");
	})

	// set the session moodId when we click "Edit mood" button in makeMoodProfile
	.on("click","a[href|='#moodedit-page']",function(e){
		if($(this).data("id")===undefined) {
			throw("No id defined on this element");
		}
		sessionStorage.moodId = $(this).data("id");
	})

	.on("click",".js-delete-mood",function(e){
		query({
			type:'delete_mood',
			params:[$(this).data("id")]
		})
		.then(d=>{
			if(d.error) throw d;
			$.mobile.navigate("#list-page");
		});
	})



	.on("click",".nav-tabs a",function(e) {
		let id = $(this).parent().index();
		$(this).parent().addClass("active")
			.siblings().removeClass("active");

		$(this).parent().parent().parent().next().children()
			.eq(id).addClass("active")
			.siblings().removeClass("active")
	})




	.on("change","#edit-upload-image",function(e){
		upload($("#edit-upload-image")[0].files[0])
		.then(d=>{
			if(d.error) throw d;
			else {
				let src = `https://zeeliu.com/public_html/aau/wnm617/m13/uploads/${d.result}`;
				$("#edit-upload-filename").val(src);
				$("#edit-upload-page .image-picker").css("background-image",`url(${src})`);
			}
		})
	})
	.on("click",".js-editupload",function(e){
		query({
			type:'edit_'+$("#edit-upload-type").val()+'_image',
			params:[
				$("#edit-upload-filename").val(),
				$("#edit-upload-id").val()
			]
		})
		.then(d=>{
			if(d.error) throw d;
		})
	})










		/* DATA ACTIVATE */
	.on("click","[data-activate]",function(e){
		$($(this).data("activate"))
			.addClass("active");
	})
	.on("click","[data-deactivate]",function(e){
		$($(this).data("deactivate"))
			.removeClass("active");
	})
	.on("click","[data-toggle]",function(e){
		$($(this).data("toggle"))
			.toggleClass("active");
	})
	.on("click","[data-activateone]",function(e){
		$($(this).data("activateone"))
			.addClass("active")
			.siblings().removeClass("active");
	});








		$("[data-template]").each(function(){
		let template_id = $(this).data("template");
		let template_str = $(template_id).html();
		$(this).html(template_str);
	})




})
