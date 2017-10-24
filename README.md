# Weekend Challenge 3

## Project Description


## Table Setup

```
CREATE TABLE "ToDo" (
	"id" serial primary key,
	"taskName" varchar(400) not null,
	"completed" boolean,
	);
```

## Tasks

#### **Base Mode:** 
- [x] Spin up server
- [x] Create database in postico
- [x] GET route to grab tasks from DB
- [x] Append task and update/delete buttons in client.js
- [x] Create add task button on DOM and click handler in client.js
- [x] POST route to add new task
- [x] Alter append function so tasks are appended in a table with complete/delete buttons
- [x] PUT route to update task to change "completed" to true
- [x] Add CSS changes to altered task
- [x] DELETE route to delete task


#### **Hard Mode:** 

- [ ] Create alert when user presses delete button
- [ ] Add jQuery animation to page when item is added to list
- [ ] Add jQuery animation to page when item is removed from list
- [ ]

#### **Pro Mode:** 
Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.
Add a due date to your tasks and put the items which need to be completed next at the top of the page. Highlight overdue tasks in red.
Add any additional features that you think would be useful or interesting!