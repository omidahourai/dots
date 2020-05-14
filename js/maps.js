

const makeMap = async (target) =>{

		await checkData(()=>window.google);

		let sf = {lat: 37.771622, lng:  -122.449258};
		let map_el = $(target);


		if(!map_el.data("map")) map_el
		.data(
			"map",
			new google.maps.Map(map_el[0], {
				center: sf,
				zoom: 12,
				disableDefaultUI:true,
				styles:mapStyles
		    })
	    )
		.data(
			"infoWindow",
			new google.maps.InfoWindow({content:''})
	    );

	    console.log(
	    	map_el.data("map").getCenter().lat(),
	    	map_el.data("map").getCenter().lng()
	    )

    return map_el;
}


const makeMarkers = (map_el,locs) => {

	let map = map_el.data("map");
	let markers = map_el.data("markers");

	if(markers) markers.forEach(o=>o.setMap(null));

	markers = [];

	locs.forEach((o,i,a)=>{
		if(!o.lat) return;
		let m = new google.maps.Marker({
			position: o,
			map: map,
			icon: {
				url:o.icon,
				scaledSize: {
					width:30,
					height:30
				}
			}
		});
		markers.push(m);
	});

	map_el.data("markers",markers);

	setTimeout(()=>{setMapBounds(map,locs)},100);
}


const setMapBounds = (map, locs) => {
	if(locs.length == 1) {
		map.setCenter(locs[0]);
		map.setZoom(14);
	} else
	if(locs.length == 0) {
		if(window.location.protocol!=="https:") return;
		else {
			navigator.geolocation.getCurrentPosition(p=>{
				let pos = {
					lat:p.coords.latitude,
					lng:p.coords.longitude
				};
				map.setCenter(pos);
				map.setZoom(15);
			},(...args)=>{
				console.log("error?",args);
			},{
				enableHighAccuracy:false,
				timeout:5000,
				maximumAge:0
			})
		}
	} else {
		let bounds = new google.maps.LatLngBounds(null);
		locs.forEach(o=>{
			if(o.lat) bounds.extend(o);
		});
		map.fitBounds(bounds);
	}
}



const mapStyles = [

  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];