
//templater (f=>{}) ([{},{}])

const makeMoodList = templater (o=>`
		<li><a href="#mood-page" class="mood-jump" data-id="${o.id}">
					<img src="${o.img}">
					</a></li>

	`);

const makeChooseMoodList = templater (o=>`
		<li><a href="#addlocation-page" class="mood-jump" data-id="${o.id}">
					<img src="${o.img}">
					</a></li>

	`);




const makeUserProfile = templater (o=>`
		<div class="profile-head">
			<div class="profile-image">
				<img src="${o.img}" alt="">
			</div>
		</div>
				<h1>${o.name}</h1>
				<P>${o.gender}</P>
				<p>${o.city}</p>
				<p>${o.bio}</p>

	`);

const makeMoodImage = templater(o=>`

			<img src="${o.img}" alt="">

`);


const makeMoodProfile = templater(o=>`

		<div class="profile-body">

			<div class="profile-name">${o.name}</div>

			<div class="profile-description">
				<div><strong>Description</strong> <span>${o.description}</span></div>
			</div>

			<div class="cta-button">
					<a href="#addlocation-page">Make a dot</a>
			</div>
			<div class="secondary-button">
					<a href="#moodedit-page" data-id="${o.id}">Edit mood</a>
			</div>

			<div>
				<a href="#" class="js-delete-mood" data-id="${o.id}">Delete</a></div>
			</div>
		</div>

`);

const makeLocationProfile = templater(o=>`

		<div class="profile-body">

			<div class="profile-name">${o.name}</div>

			<div class="profile-description">
				<div><strong>Description</strong> <span>${o.description}</span></div>
			</div>

			<div class="cta-button">
					<a href="#addlocation-page">Make a dot</a>
			</div>
			<div class="secondary-button">
					<a href="#moodedit-page">Edit mood</a>
			</div>

			<div>
				<a href="#" class="js-delete-mood" data-id="${o.id}">Delete</a></div>
			</div>
		</div>

`);

const makeHomeWindow = templater(o=>`
		<div class="display-flex recent-mood">
			<div class="flex-none">
				<div class="recent-image">
					<img src="${o.img}" alt="">
				</div>
			</div>
			<div class="flex-stretch">
				<h2>${o.name}</h2>
				<div><strong>Description</strong> <span>${o.description}</span></div>
				<div><strong>Favorite</strong> <span>${o.favorite}</span></div>
				<div>
					<a href="#dot-page" class="form-button location-button" data-id="${o.mid}">Visit Dot</a>
				</div>
			</div>
		</div>
`);


const makeEditUserForm = (o) => {
return `
	<form>


		<div class="form-control">
			<label for="name">Name</label>
			<input type="text" placeholder="Name" id="edit-user-name" data-role="none" value="${o.name}">
		</div>

		<div class="form-control">
			<label for="gender">Gender</label>
			<select class="form-button" id="edit-user-gender" data-role="none">
				<option value="female">female</option>
				<option value="male">male</option>
			</select>
		</div>

		<div class="form-control">
			<label for="city">City</label>
			<input type="text" placeholder="city" id="edit-user-city" data-role="none" value="${o.city}">
		</div>

		<div class="form-control">
			<label for="bio">Bio</label>
			<input type="text" placeholder="This is the description of a cat. He swag." id="edit-user-bio" data-role="none" value="${o.bio}">
		</div>

	</form>



`;
}



const makeEditMoodForm = (o) => {
return `
	<form>

		<div class="form-control">
			<label for="name">Name</label>
			<input type="text" placeholder="Mood Name" id="edit-mood-name" data-role="none" value="${o.name}">
		</div>

		<div class="choose-bg">
						<div class="bg-colors">
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-1{fill:#f36e54;}</style></defs><circle class="cls-1" cx="20" cy="20" r="20"/></svg>
						</div>
						<div class="bg-colors">
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-2{fill:#e889b9;}</style></defs><circle class="cls-2" cx="20" cy="20" r="20"/></svg>
						</div>
						<div class="bg-colors">
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-3{fill:#f8d26c;}</style></defs><circle class="cls-3" cx="20" cy="20" r="20"/></svg>
						</div>
						<div class="bg-colors">
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-4{fill:#bbd534;}</style></defs><circle class="cls-4" cx="20" cy="20" r="20"/></svg>
						</div>
						<div class="bg-colors">
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-5{fill:#5486c5;}</style></defs><circle class="cls-5" cx="20" cy="20" r="20"/></svg>
						</div>
						<div class="bg-colors">
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-6{fill:#9d80bb;}</style></defs><circle class="cls-6" cx="20" cy="20" r="20"/></svg>
						</div>
						<div class="bg-colors">
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-7{fill:#223f7b;}</style></defs><circle class="cls-7" cx="20" cy="20" r="20"/></svg>
						</div>
						<div class="bg-colors">
							<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-8{fill:#37ba9a;}</style></defs><circle class="cls-8" cx="20" cy="20" r="20"/></svg>
						</div>
					</div>


		<div class="form-control">
			<label for="name">Description</label>
			<textarea class="form-input" placeholder="Type your Description" id="edit-mood-description"> ${o.description}</textarea>
		</div>


	</form>
`;
}
