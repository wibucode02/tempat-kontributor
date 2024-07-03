import json

task_list = []

# Save task list
def save_task(filename):
  with open(filename, 'w') as file:
    json.dump(task_list, file)
  print(f"Task list has been saved to '{filename}")

# Load task list
def load_task(filename):
  global task_list
  try:
    with open(filename, 'r') as file:
      task_list = json.load(file)
    print(f"Task list has been loaded from {filename}")
  except FileNotFoundError:
    print(f"File '{filename} not found'")

# Add a task to list
def add_task(task):
  task_list.append({"task": task, "completed": False})
  print(f"Task '{task}' added.")

# Show a task from list
def show_task():
  if not task_list:
    print("No task in list.")
  else:
    for index, task in enumerate(task_list, start=1):
      status = "Completed" if task["completed"] else "Not completed"
      print(f"{index}. {task['task']} - {status}")

# Mark a task as completed
def mark_completed(number):
  if 0 < number <= len(task_list):
    task_list[number - 1]["completed"] = True
    print(f"Task '{task_list[number - 1]['task']}' Has marked as completed")
  else:
    print("Task number not found.")

# Delete a task from list
def delete_task(number):
  if 0 < number <= len(task_list):
    task = task_list.pop(number - 1)
    print(f"Task '{task['task']}' Has deleted.")
  else:
    print('Task number not found.')  

# Update a list from list
def update_task(number, new_task):
  if 0 < number <= len(task_list):
    task_list[number - 1]["task"] = new_task
    print(f"Task number {number} has updated to '{new_task}'")
  else:
    print("Task number not found.")

# Show a task fron list (with filter)
def show_filtered_task(completed=None):
  filtered_task = task_list
  if completed is not None:
    filtered_task = [task for task in task_list if task["completed"] == completed ]
  if not filtered_task:
    print("No task that match the filter.")
  else:
    for index, task in enumerate(filtered_task, start=1):
      status = "Completed" if task["completed"] else "Not completed"
      print(f"{index}. {task['task']} - {status}")

# Usage
# add_task(string)
# show_task
# show_filtered_task(completed=Boolean)
# delete_task(integer)
# update_task(integer, string)
# mark_completed(integer)
# save_task(string)
# load_task(string)
add_task("Ngoding")
add_task("Nonton Youtube")

show_task()

mark_completed(2)

print("Not completed task:")
show_filtered_task(completed=False)

update_task(1, "Main Game")

show_task()
save_task('todo.json')
delete_task(1)
delete_task(2)
load_task('todo.json')
show_task()