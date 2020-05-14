<?php


function makeConn() {
	$host = "localhost";
	$user = "dots_user";
	$pass = "heshuishuijiao8";
	$dbname = "dots_wnm617";

	$c = new mysqli($host,$user,$pass,$dbname);
	if($c->connect_errno) die($c->connect_error);
	$c->set_charset('utf8');
	return $c;
}


function fetchAll($r) {
	$a = [];
	while($row = $r->fetch_assoc())
		$a[] = $row;
	return $a;
}


function makeUpload($file,$folder) {
	$filename = microtime(true) . "_" .
		$_FILES[$file]['name'];

	if(@move_uploaded_file(
		$_FILES[$file]['tmp_name'],
		$folder . $filename
	)) return ["result"=>$filename];
	else return [
		"error"=>"File Upload Failed",
		"_FILES"=>$_FILES,
		"filename"=>$filename
	];
}



// $c = connection, $ps = prepared statement,$st = statement type, $p = parameters
function makeQuery($c,$ps,$st,$p) {
	if($st!="" && $statement = @$c->prepare($ps)){
		if(
			@$statement->bind_param($st, ...$p) &&
			@$statement->execute()
		) {
			$r = substr($ps,0,6)=="SELECT" ?
				fetchAll($statement->get_result()):
				[];
			return [
				"params"=>$p,
				"qry"=>$ps,
				"result"=>$r
			];
		}
	} else {
		$r = $c->query($ps);
		if(!$c->errno) return [
			"qry"=>$ps,
			"result"=>fetchAll($r)
		];
	}
	return [
		"qry"=>$ps,
		"error"=>$c->error
	];
}


function makeStatement($c,$t,$p) {
	switch($t) {
		case "users_all":
			return makeQuery($c,"SELECT * FROM `track_users`","",$p);
		case "moods_all":
			return makeQuery($c,"SELECT * FROM `track_moods`","",$p);
		case "locations_all":
			return makeQuery($c,"SELECT * FROM `track_locations`","",$p);


		/*SELECT * FROM table WHERE id=? AND price=? 
		id

		*/



		case "moods_from_user":
		return makeQuery($c,"SELECT * FROM `track_moods` WHERE uid = ?","i",$p);

		case "locations_from_mood":
		return makeQuery($c,"SELECT * FROM `track_locations` WHERE mid = ?","i",$p);

		case "user_by_id":
		return makeQuery($c,"SELECT * FROM `track_users` WHERE id = ?","i",$p);

		case "mood_by_id":
		return makeQuery($c,"SELECT * FROM `track_moods` WHERE id = ?","i",$p);

		case "location_by_id":
		return makeQuery($c,"SELECT * FROM `track_locations` WHERE id = ?","i",$p);



		case "recent_moods_locations":
		return makeQuery($c,"SELECT 
			*
			FROM `track_moods` AS m 
			LEFT JOIN (
			SELECT * FROM `track_locations` 
			ORDER BY `date_create` DESC
			) AS l
			ON m.id=l.mid
		    WHERE m.uid = ? 
		    GROUP BY l.mid","i",$p);



		// INSERT STATEMENTS

		case "insert_user":
			// Check for existing username or email
			$r = makeQuery($c,"SELECT id FROM `track_users` WHERE `username`=? OR `email`=?","ss",[$p[0],$p[1]]);
			if(count($r['result'])) return ["error"=>"Username or Email exists"];

			$r = makeQuery($c,"INSERT INTO
				`track_users`
				(`username`,`email`,`password`,`name`,`date_create`)
				VALUES
				(?,?,md5(?),?,NOW())
				","ssss",$p);
			return ["result"=>"success"];



		case "insert_mood":
			$r = makeQuery($c,"INSERT INTO
				`track_moods`
				(`uid`,`name`,`description`,`date_create`)
				VALUES
				(?,?,?,NOW())
				","iss",$p);
			return ["result"=>"success"];



		case "insert_location":
			$r = makeQuery($c,"INSERT INTO
				`track_locations`
				(`mid`,`lat`,`lng`,`degree`,`favorite`,`description`,`icon`,`date_create`)
				VALUES
				(?,?,?,?,?,?,'https://via.placeholder.com/100/888/fff/?text=ICON',NOW())
				","iddiis",$p);
			return ["result"=>"success"];




		// UPDATE STATEMENTS

		case "edit_user":
			$r = makeQuery($c,"UPDATE
				`track_users`
				SET
				`name`=?,
				`gender`=?,
				`city`=?,
				`bio`=?
				WHERE id=?
				","ssssi",$p);
			return ["result"=>"success"];


		case "edit_user_image":
			$r = makeQuery($c,"UPDATE `track_users` SET `img`=? WHERE id=?
				","si",$p);
			return ["result"=>"success"];



		case "edit_mood":
			$r = makeQuery($c,"UPDATE
				`track_moods`
				SET
					`name`=?,
					`description`=?
				WHERE id=?
				","ssi",$p);
			return ["result"=>"success"];




		// DELETE STATEMENTS

		case "delete_mood":
			$r = makeQuery($c,"DELETE FROM `track_moods` WHERE id=?","i",$p);
			return ["result"=>"success"];
		case "delete_location":
			$r = makeQuery($c,"DELETE FROM `track_locations` WHERE id=?","i",$p);
			return ["result"=>"success"];



		case "check_login":
			return makeQuery($c,"SELECT id FROM `track_users` WHERE username = ? AND password = md5(?)","ss",$p);


	}
}


if(!empty($_FILES)) {
	$r = makeUpload("image","../uploads/");
	die(json_encode($r));
}






//POST AND GET DUMP
$data = json_decode(file_get_contents("php://input"));

echo json_encode(
	makeStatement(
		makeConn(),
		@$data->type,
		@$data->params
	),
	JSON_NUMERIC_CHECK
);