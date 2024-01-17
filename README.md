# Reminders

Reminders is an intuitive task-tracking app designed to enhance your productivity. Reminders allow you to create projects, share them with other users and be always on time with your tasks. Explore the full experience of Reminders by visiting the site at [Reminders](https://reminders.oskarpetr.dev).

## List of technologies

- Next.js
- React.js
- Typescript
- Tailwind
- PostgreSQL
- REST API

## Key features

- Home screen widgets
- Intuitive deadline overview
- Easy management for tasks, projects and members
- Logs overview
- Profile info and avatar editor
- 16 API endpoints

## API

| Method   | Endpoint                     | Action description                    |
| -------- | ---------------------------- | ------------------------------------- |
| `POST`   | `/api/sign-in`               | Verify if a user already exists       |
| `GET`    | `/api/projects`              | Get projects by user                  |
| `POST`   | `/api/projects`              | Create a project                      |
| `POST`   | `/api/accounts`              | Create an account                     |
| `GET`    | `/api/projects/[id]`         | Get a project by id                   |
| `PATCH`  | `/api/projects/[id]`         | Update a project by id                |
| `DELETE` | `/api/projects/[id]`         | Delete a project by id                |
| `GET`    | `/api/projects/[id]/tasks`   | Get tasks by project id               |
| `POST`   | `/api/projects/[id]/tasks`   | Create a task by project id           |
| `PATCH`  | `/api/projects/[id]/tasks`   | Update a task by project id           |
| `DELETE` | `/api/projects/[id]/tasks`   | Delete a task by project id           |
| `GET`    | `/api/projects/[id]/members` | Get members by project id             |
| `POST`   | `/api/projects/[id]/members` | Create a member by project id         |
| `DELETE` | `/api/projects/[id]/members` | Delete a member by project id         |
| `PATCH`  | `/api/accounts/[id]/general` | Update user general information by id |
| `PATCH`  | `/api/accounts/[id]/avatar`  | Update an avatar by user id           |

## 1. Creating an account

Users can create their new account, once they reach the website. They will be automatically redirected to a **Sign in** page. If a user does not have already an existing account, they can click on the **Register** link below the sign-in form. To register a new account, the user must fill in the name, email, and password field, and also upload an avatar for their account profile picture.

![image](https://github.com/oskarpetr/reminders/assets/64423998/94d2ea3c-4c48-4ad9-9042-eac34357ff60)

Once your account is created, you will be redirected to a **Sign in** page, where you need to fill out the email and password fields. If your password is incorrect, you will get prompted to fill in the correct password.

## 2. Dashboard

If you have logged in successfully to the application, you will arrive at a dashboard home page. Here you can find all the projects you have created or projects that have been shared with you. If there are not any projects tied to your account, a "no projects have been found" text will appear.

![image](https://github.com/oskarpetr/reminders/assets/64423998/8724b642-23bd-4ad9-8ed9-db58ad5d5b12)

## 3. Projects

### Creating a project

If you are starting a new project solo or as a team, the process of creating a new project is the same. In the sidebar, there is a section named **Projects** with the projects list below it. When creating a new project, you must click on the **Add project** button and a popup with the filling form will appear. The project form takes in the name of the project, the project's primary color and the project icon that should represent the project in simpler terms. When the form is completed click on the **Create project** button.

![image](https://github.com/oskarpetr/reminders/assets/64423998/20ce0d70-5693-4c9e-8e7d-3102d62c7076)

Once the project is created, you will get redirected to the project dashboard, where you can manage all the tasks, and members, edit the project and view the project logs.

### Editing a project

If you want to edit a project, you must first enter the project dashboard. You can get there via the sidebar under the section **Projects**. When you click the project you want to enter, it will redirect you to the project's dashboard. Here, you need to click on the cog settings icon in the top right corner. Once you click it, a popup with the project settings with appear. You can find here the individual fields for the project name, color and icon.

![image](https://github.com/oskarpetr/reminders/assets/64423998/c2e88f23-7a7d-4f9f-b99d-ccdede5f9b40)

### Deleting a project

In the edit project popup, you can also find a button for the project deletion. If you press the **Delete project** button, a new popup will show up if you are sure that you want to delete this project, as well as their tasks, members and logs. If you confirm the project deletion, the project will be deleted and you will get redirected to the main dashboard page.

![image](https://github.com/oskarpetr/reminders/assets/64423998/e91a1c71-d8e3-4c4c-8c4a-d905b3f9369a)

## 4. Managing tasks

### Creating a task

When creating a new task, it is important to be present in the project, where you want the task to be created. You can create a new task by pressing the **Add task** button, then you will get prompted with a popup. In order to create it, you must fill in the required fields, and that it is the task name with the task due date. After filling these fields out, click on the **Create task** button, afterwards the popup will automatically close.

![image](https://github.com/oskarpetr/reminders/assets/64423998/5d7fcde1-bd7a-450c-bd61-39f97ea115ad)

### Editing a task

After successfully creating a new task, you might end up wishing you named it something different, or the deadline has been postponed. This feature can help you remove these problems from your workflow. When you hover over any task, a menu on the right of the task will appear, then click on the **Pencil** button. A popup will show up on your screen with all those certain pre-filled with the task's properties. Once you are satisfied with the edited fields, you can click on the **Edit task**.

![image](https://github.com/oskarpetr/reminders/assets/64423998/465a656f-a1b9-48fb-8d6c-f458f1cb5012)

### Deleting a task

When a task is no longer needed to be present in a project, deleting might be a good option for you. When hovering over a certain task, a menu on the right of the task will appear, then click on the **Trash** button. A verification popup will show up and ask if you are sure that you want to delete this task, as well as the logs with it. If you confirm the deletion, the task will be immediately deleted.

![image](https://github.com/oskarpetr/reminders/assets/64423998/516da0ae-5e4e-47d2-bb47-9b707ce2e4c6)

## 5. Members

### Adding a member

When you want to collaborate on your project with your friends, or colleagues, you can absolutely do it. When you enter your project's dashboard, you can find the shared button in the top right corner. If you click on it, a popup will appear with the list of the members. To add a member click on the **Add member** button, and a form will show up where you need to enter the member's email address. Once the new member's email address is filled out, you can click on the **Invite** button.

![image](https://github.com/oskarpetr/reminders/assets/64423998/c5c2844d-3464-4442-9311-775496fd5d65)

### Removing a member

Removing a member from the list of members to whom have been the project shared, is as simple as hovering on the specific member you want to remove and clicking the **Trash** button.

![image](https://github.com/oskarpetr/reminders/assets/64423998/9e3fba97-e561-401c-9c57-1a6290edc4d6)

## 6. Logs

When each of these actions is performed on the client, a new log is every time registered in the database. You can view these logs in your project's dashboard when clicking on the **Rounded arrow** button.

![image](https://github.com/oskarpetr/reminders/assets/64423998/a510f026-6ecc-42e7-9afd-aba90799d148)

## 7. Profile

If you want edit your account information, you can visit the profile section in the sidebar. Here, you can change your avatar by pressing the **Upload avatar** button or change your name in the name field, and then submiting the changes with the **Save changes**.
