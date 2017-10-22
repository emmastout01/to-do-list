console.log('script sourced');

$('document').ready(onReady);

function onReady() {
    console.log('Document ready');
    refreshTasks();
    $('.addTaskButton').on('click', addTaskClicked);
    $('.taskListContainer').on('change', '#completeCheckbox', completedTask);
} // end onReady

// GET route to get tasks from database
function refreshTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).done(function (response) {
        var taskList = response;
        appendTasks(taskList);
    }).fail(function(error) {
        console.log('this isn\'t working', error);
    }) //end GET route
} // End refreshTasks

//Append task list (retrieved from database table) to DOM 
function appendTasks(taskList) {
    $('.taskListContainer').empty();
    for (var i = 0; i < taskList.length; i++) {
        var task = taskList[i];
        var $tr = $('<tr></tr>');
        var completeCheckbox = '<input type="checkbox" id="completeCheckbox" data-id = "' + task.id + '" name="check"/><label for="completedCheckbox"></label>';
        var deleteButton = '<button class="deleteButton">Delete Task</button>'
        $tr.data = ('task', task);
        $tr.append('<td>' + task.taskName + '</td>')
        $tr.append('<td>' + task.dueDate + '</td>')
        $tr.append('<td>' + completeCheckbox + '</td><td>' + deleteButton + '</td>');
        $('.taskListContainer').append($tr);
    } //end for loop
} //end appendTasks

// Click handler for add task button; POST route to add task to database
function addTaskClicked() {
    console.log('add task button clicked');
    var taskName = $('.taskName').val();
    console.log('taskName:', taskName);
    var taskToSend = {
        taskName: taskName,
        completed: false
    }
    console.log(taskToSend);
    $.ajax({
        type: 'POST', 
        url: '/tasks',
        data: taskToSend
    }).done(function (response) {
        console.log(response);
        refreshTasks();
    }).fail(function (error) {
        console.log('error in post route:', error);
    })
} // End addTaskClicked

//Click handler for completedTask checkbox; PUT route to change 'completed' to true
function completedTask() {
    console.log($(this).data().id);
    if (this.checked) {
        $.ajax({
            type: 'PUT',
            url: '/tasks/' + $(this).data().id
        })
        console.log('in completedTask');
    } else {
        console.log('not checked');
    }
    
}