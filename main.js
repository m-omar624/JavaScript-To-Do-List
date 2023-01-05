
    const taskTimes = [];
    const timeElements = [];
    const taskTexts = [];
    var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
    const days = document.querySelector("#new-task-input-day");
    const hours = document.querySelector("#new-task-input-hour");
	const list_el = document.querySelector("#task");



    
    form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
        const day = days.value;
        const hour = hours.value;
        
		const task_el = document.createElement('div');
		task_el.classList.add("content");

		const task_content_el = document.createElement('div');
		task_content_el.classList.add("content-box");

		task_el.appendChild(task_content_el);
        
        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");
        taskTexts.push(task_input_el)
        task_content_el.appendChild(task_input_el);


        const time = document.createElement("div");
        time.classList.add("time");

        const time_text = document.createElement("h3");
        time_text.innerHTML = 0;
        timeElements.push(time_text);

        var dueDay = parseInt(new Date().getDate());
        dueDay = dueDay + parseInt(day);
        let dueHour = parseInt(new Date().getHours())
        dueHour = dueHour + parseInt(hour);
        let dueMins = parseInt(new Date().getMinutes())
        let dueSec = parseInt(new Date().getSeconds())

        var month = getNewMonth(new Date().getMonth()+1, day);
        if(new Date().getMonth() < month){
             dueDay -= 31*(month - (new Date().getMonth()+1));
        }
        console.log(dueHour);
        month = convertToString(month);
        let currentDate = new Date(month+ " " + dueDay +", 2022 "+ dueHour+":"+dueMins+":"+dueSec).getTime();
        taskTimes.push(currentDate);


        time.appendChild(time_text);
        task_content_el.appendChild(time);

        var optionsArray = [1,2,3,4,5];
        const priorityDiv = document.createElement("div");
        const priority = document.createElement("select");
        priority.id = "Priority";

        for(var i = 0; i<optionsArray.length; i++){
            var option = document.createElement("option");
            option.value = optionsArray[i];
            option.text = optionsArray[i];
            priority.appendChild(option)
        }
        priorityDiv.appendChild(priority);
        task_el.appendChild(priorityDiv);

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const edit = document.createElement("button");
        edit.classList.add("edit");
        edit.innerHTML = "EDIT";
        const deleteEl = document.createElement("button");
        deleteEl.classList.add("delete");
        deleteEl.innerHTML = "DELETE";

        actions.appendChild(edit);
        actions.appendChild(deleteEl);
        task_el.appendChild(actions);

        list_el.appendChild(task_el);

        input.value = '';

        edit.addEventListener('click', (e) => {
			if (edit.innerText.toLowerCase() == "edit") {
				edit.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				edit.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		deleteEl.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});

        const timeLeft = document.getElementById("timeSort");
        timeLeft.addEventListener('click', (e) =>{
            sort();
        });
        
    });
    var x = setInterval(function() {
        var now = new Date().getTime();
        updateTime(now,x);
}, 1000);
});

function updateTime(i,x){

    // getNewMonth(new Date().getMonth()+1);

    for(let k = 0; k < taskTimes.length; k++){
    var distance = taskTimes[k] - i;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timeElements[k].innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
        if (distance < 0) {
            clearInterval(x);
            timeElements[k].innerHTML = "EXPIRED";
        }
    }
}

function getNewMonth(month, day){
    var days;
    switch(month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8: 
        case 10: 
        case 12:
            days = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            days = 30;
            break;
        case 2:
            if(new Date().getFullYear() % 4 == 0){
                days = 29;
            }
            else{
                days = 28;
            }
            break;
    }
    var dueDay = parseInt(new Date().getDate());
    dueDay = dueDay + parseInt(day);
    if(dueDay > days){
        month = month +(Math.floor(dueDay / days));

    }
    

    return month;
}

function convertToString(month){
    switch(month){
        case 1: month = "Jan";
            break;
        case 2: month = "Feb";
            break;
        case 3: month = "Mar";
            break;
        case 4: month = "Apr";
            break;
        case 5: month = "May";
            break;
        case 6: month = "Jun"; 
            break;
        case 7: month = "Jul";
            break;
        case 8: month = "Aug";
            break;
        case 9: month = "Sep";
            break;
        case 10: month = "Oct";
            break;
        case 11: month = "Nov";
            break;
        case 12: month = "Dec";
            break;
        }
    return month;
}

function sort(){
    for(let i = 0; i < taskTimes.length-1; i++){
        for(let j = 0; j<(taskTimes.length)-i-1; j++){
            if(taskTimes[j] > taskTimes[j+1]){
                temp = taskTimes[j];
                taskTimes[j] = taskTimes[j+1];
                taskTimes[j+1] = temp;
                temp = taskTexts[j].value;
                taskTexts[j].value = taskTexts[j+1].value;
                taskTexts[j+1].value = temp;
            }
        }
    }
}
