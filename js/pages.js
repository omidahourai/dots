
// ASYNC

const showListPage = async () => {

	let d = await query({
		type:'moods_from_user',
		params:[sessionStorage.userId]

	});
		console.log(d);

		$("#list-page .moodlist")
			.html(makeMoodList(d.result));

}


const chooseListPage = async () => {

	let d = await query({
		type:'moods_from_user',
		params:[sessionStorage.userId]

	});
		console.log(d);

		$("#addnew-page .moodlist")
			.html(makeChooseMoodList(d.result));

}


const showAddLocationPage = async () => {
	let map_el = await makeMap("#addlocation-page .map");

	let m = false;

	map_el.data("map").addListener("click",function(e){
		let pos = {
			lat:e.latLng.lat(),
			lng:e.latLng.lng()
		};

		if(m!=false) m.setMap(null);

		$("#add-location-lat").val(pos.lat);
		$("#add-location-lng").val(pos.lng);

		m = new google.maps.Marker({
			position: pos,
			map: map_el.data("map")
		});
	});

	setMapBounds(map_el.data("map"),[]);
}


const showUserPage = async () => {

	let d = await query({
		type:'user_by_id',
		params:[sessionStorage.userId]

	});
		console.log(d);

		$("#profile-page .profile-body")
			.html(makeUserProfile(d.result));

}

const showMoodPage = async () => {
	if(sessionStorage.moodId===undefined) {
		throw("No mood id defined");
	}



	query({
		type:'mood_by_id',
		params:[sessionStorage.moodId]
	}).then(d=>{

	console.log(d);

	$("#mood-page .profile-image")
		.html(makeMoodImage(d.result));

	});

	query({
		type:'mood_by_id',
		params:[sessionStorage.moodId]
	}).then(d=>{

	console.log(d);

	$("#mood-page .profile-content")
		.html(makeMoodProfile(d.result));

	});


	query({
		type:'locations_from_mood',
		params:[sessionStorage.moodId]
	}).then(async d=>{
			let map_el = await makeMap("#mood-page .map");

			console.log(d);

			makeMarkers(
				map_el,
				d.result

				);
		});

}


const showDotPage = async () => {
	if(sessionStorage.locationId===undefined) {
		// throw("No location id defined");
	}



	query({
		type:'location_by_id',
		params:[sessionStorage.locationId]
	}).then(d=>{

	console.log(d);

	$("#dot-page .profile-image")
		.html(makeMoodImage(d.result));

	});

	query({
		type:'location_by_id',
		params:[sessionStorage.locationId]
	}).then(d=>{

	console.log(d);

	$("#dot-page .profile-content")
		.html(makeLocationProfile(d.result));

	});


	query({
		type:'location_by_id',
		params:[sessionStorage.moodId]
	}).then(async d=>{
		console.log('makin dot map!')
			let map_el = await makeMap("#dot-page .map");

			console.log(d);

			makeMarkers(
				map_el,
				d.result

				);
		});

}


const showHomePage = async () => {
	let d = await query({
		type:'recent_moods_locations',
		params:[sessionStorage.userId]
	});

	console.log(d);

	let moods =
		d.result.reduce((r,o)=>{
		 o.icon = `img/dots/icons/${o.name}.svg`;
		if(o.lat) r.push(o);
		return r;
	},[]);
		console.log(moods);

	let map_el = await makeMap("#home-page .map");

	makeMarkers(map_el,moods);

	map_el.data("markers").forEach((o,i)=>{
		o.addListener("click",function(e){
			// example 1
/*			$("#home-page .basin")
				.addClass("active")
				.html(makeHomeWindow(moods[i]));*/

			// example 2
			console.log(moods[i]);
			map_el.data("infoWindow")
				.open(map_el.data("map"),o);
			map_el.data("infoWindow")
				.setContent(makeHomeWindow(moods[i]));
		})
	});
	}



const showProfileEditPage = async () => {
	let d = await query({
		type:'user_by_id',
		params:[sessionStorage.userId]
	});

	$("#profile-edit-page .edit-form")
		.html(makeEditUserForm(d.result[0]))
}


const showMoodEditPage = async () => {
	let d = await query({
		type:'mood_by_id',
		params:[sessionStorage.moodId]
	});

	$("#moodedit-page .edit-form")
		.html(makeEditMoodForm(d.result[0]))
}


