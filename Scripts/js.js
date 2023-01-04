"use strict";

window.addEventListener("load", () => {
	const form = document.querySelector("#task-form"),
		input = document.querySelector("#task-input"),
		listEl = document.querySelector(".task");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		console.log(e.target);

		const task = input.value;

		if (!task) {
			alert("Please add a task");
			return;
		}

		const taskEl = document.createElement("div");
		taskEl.classList.add("task-item");

		listEl.appendChild(taskEl);

		const taskTitle = document.createElement("input");
		taskTitle.classList.add("task__title");
		taskTitle.setAttribute("readonly", "readonly");
		taskTitle.value = task;

		taskEl.append(taskTitle);

		const taskPanel = document.createElement("div");
		taskPanel.classList.add("task__panel");

		const counter = document.createElement("div");
		counter.classList.add("task__timer");

		counter.innerHTML = "00:00:00";

		const taskController = document.createElement("div");
		taskController.classList.add("task__controller");

		const btnStart = document.createElement("a"),
			btnStop = document.createElement("a"),
			btnReset = document.createElement("a");

		btnStart.innerHTML = "Start";
		btnStop.innerHTML = "Stop";
		btnReset.innerHTML = "Reset";

		btnStart.classList.add("btn", "btn--orange", "start");
		btnStop.classList.add("btn", "btn--orange", "stop");
		btnReset.classList.add("btn", "btn--orange", "reset");

		taskController.append(btnStart);
		taskController.append(btnStop);
		taskController.append(btnReset);

		taskPanel.append(counter);
		taskPanel.append(taskController);

		taskEl.append(taskPanel);

		const taskFooter = document.createElement("div");
		taskFooter.classList.add("task__footer");

		const btnEdit = document.createElement("a"),
			btnDelete = document.createElement("a");

		btnEdit.classList.add("btn", "btn--transparent", "edit");
		btnEdit.innerHTML = "End Task";

		btnDelete.classList.add("btn", "btn--red", "delete");
		btnDelete.innerHTML = "Delete Task";

		taskFooter.append(btnEdit);
		taskFooter.append(btnDelete);

		taskEl.append(taskFooter);

		//input value
		input.value = "";

		//counter
		let seconds = 0;
		let interval = null;

		btnStart.addEventListener("click", start);
		btnStop.addEventListener("click", stop);
		btnReset.addEventListener("click", reset);

		//counter functions

		function timer() {
			seconds++;

			let hrs = Math.floor(seconds / 3600);
			let mins = Math.floor((seconds - hrs * 3600) / 60);
			let secs = seconds % 60;

			if (secs < 10) {
				secs = "0" + secs;
			}
			if (mins < 10) {
				mins = "0" + mins;
			}
			if (hrs < 10) {
				hrs = "0" + hrs;
			}

			counter.innerHTML = `${hrs}:${mins}:${secs}`;
		}

		function start() {
			if (interval) {
				return;
			}
			console.log(interval);

			interval = setInterval(timer, 1000);
		}

		function stop() {
			clearInterval(interval);
			interval = null;
			console.log(interval);
		}

		function reset() {
			stop();
			seconds = 0;
			counter.innerHTML = "00:00:00";
		}

		btnEdit.addEventListener("click", () => {
			if (btnEdit.innerText.toLowerCase() == "edit") {
				taskTitle.removeAttribute("readonly");
				taskTitle.focus();
				btnEdit.innerHTML = "Save";
			} else {
				taskTitle.setAttribute("readonly", "readonly");
				btnEdit.innerHTML = "Edit";
			}
		});

		btnDelete.addEventListener("click", () => {
			if (task) {
				taskEl.remove();
			}
		});
	});
});
