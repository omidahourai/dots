
// PROMISES
const query = (options) => {
	return fetch('php/data.php',{
		method:'POST',
		body:JSON.stringify(options),
		headers:{'Content-Type':'application/json'}
	}).then(d=>d.json());
}

const upload = (file) => {
	let fd = new FormData();
	fd.append("image",file);

	return fetch('php/data.php',{
		method:'POST',
		body:fd
	}).then(d=>d.json());
}



//CURRIED FUNCTIONS
const templater = f =>a =>
	(Array.isArray(a)?a:[a])
	.reduce((r,o,i,a)=>r+f(o,i,a),"");



const checkData = checker => new Promise((resolve,reject)=>{
	const check = () => {
		return checker() ? resolve() : setTimeout(check,10);
	}
	check();
});