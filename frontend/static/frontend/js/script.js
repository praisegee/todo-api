
var activeItem = null;
var listSnapshot = []

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();

			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}


getAllTask()


function getAllTask() {
	let wrapper = document.getElementById('task-wrapper');
	// wrapper.innerHTML = ''
	let url = 'http://127.0.0.1:8000/api/task-list/'

	fetch(url)
	.then((resp) => resp.json())
	.then((data) => {
		console.log(data);

		list = data;

		for (let i in list) {

			try {
				document.getElementById(`data-row-${i}`).remove();
			} catch(error) {

			}

			let title = `<span class="title">${list[i].title}</span>`
			if (list[i].completed == true) {
				title = `<em><strike class="title">${list[i].title}</strike></em>`
			}
			let item = `
				<div id="data-row-${i}" class="task-wrapper flex-wrapper">
					<div style="flex: 7">
						${title}
					</div>
					<div style="flex: 1">
						<button class="btn btn-sm btn-outline-info edit">Edit</button>
					</div>
					<div style="flex: 1">
						<button class="btn btn-sm btn-outline-dark delete">X</button>
					</div>
				</div>
			`

			wrapper.innerHTML += item;

		}
		

		if (listSnapshot.length > list.length) {
			for (let i = list.length; i < listSnapshot.length; i++) {
				document.getElementById(`data-row-${i}`).remove();
			}
		}


		listSnapshot = list;

		for (let i in list) {
			let editBtn = document.getElementsByClassName('edit')[i];
			let deleteBtn = document.getElementsByClassName('delete')[i];
			let title = document.getElementsByClassName('title')[i];


			editBtn.addEventListener('click', function() {
				editItem(list[i]);
			})

			deleteBtn.addEventListener('click', function() {
				deleteItem(list[i]);
			})

			title.addEventListener('click', function() {
				strikeUnstrike(list[i]);
			})


		}

	})
}


let form = document.getElementById('form-wrapper');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	console.log("Submit");
	let url = 'http://127.0.0.1:8000/api/task-create/'
	let title = document.getElementById('title').value;
	var csrftoken = getCookie('csrftoken');

	if (activeItem != null) {
		url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`
		activeItem = null;
	}

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({'title': title})
	}).then((resp) => {
		getAllTask()
		document.getElementById('form').reset();
	})
})

function editItem(item) {
	console.log("edit", item);
	activeItem = item
	document.getElementById('title').value = activeItem.title;
}

function deleteItem(item) {
	var url = `http://127.0.0.1:8000/api/task-delete/${item.id}/`
	var csrftoken = getCookie('csrftoken');

	fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
			'X-CSRFToken': csrftoken,
		}
	}).then((resp) => {
		getAllTask()
	})
}

function strikeUnstrike(item) {
	console.log("strikeUnstrike ")
	url = `http://127.0.0.1:8000/api/task-update/${item.id}/`
	item.completed = !item.completed
	var csrftoken = getCookie('csrftoken');

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({
			'title': item.title,
			'completed': item.completed
		})
	}).then((resp) => getAllTask())
}



