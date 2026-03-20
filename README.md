***
# <div align="center"> :sparkles: Welcome to Weather To-Do List :sparkles: </div>
<div align="center">Code Institute Individual Capstone Project / Final Individual Fullstack Project</div> 

***
<div align="center"> :point_right: View the live project here:</div>
<div align="center"> :point_right: https://weather-to-do-list-e7b16ee62076.herokuapp.com/ :point_left:</div>

--- 
<img width="2946" height="1680" alt="image" src="https://github.com/user-attachments/assets/2464fe5b-dbaf-4ee5-b987-c18b0933c80a" />
Stay organised with a to‑do list that adapts to the weather. This app combines your tasks with real‑time forecasts so you can plan smarter, avoid surprises, and make the most of every day. Whether it’s sunshine, rain, or anything in between, your schedule adjusts automatically to keep you on track.

---
## :scroll:Table of Contents:scroll:  
---
1. [Project Overview](UX)
2. [Technologies Used](T)
3. [Features](Features)
4. [Design](Design)
5. [Testing](T)
7. [Deployment](D)
8. [Credits](C)
#
# :snowflake: 1. WeatherToDoList :snowflake:
---
## Project Overview / MVP 
WeatherToDoList is a Django web app that should include:

- user authentication
- a live weather search experience for cities worldwide
- a calendar-backed task manager for any day of the year
- task categories, status tracking, CRUD operations, sharing, and email reminders

##
## 🛠️ 2. Tech Stack / Technologies Used 🛠️
---
| `Technologies`          | `Languages / Tools`                                      |
|-----------------------------|-------------------------------------------------------------|
| Primary Framework           | 🐎 [Django](D) (Web framework)                              |
| Front-end                   | 🌐📝 [HTML](H), 🎨[CSS](C), ⚡[JavaScript](J)              |
| Language Environment        | 🐍 [Python](P)                                               |
| Database Interface          | 🐘 [PostgreSQL](P)                                           |
| Web Server                  | 🚀 [Gunicorn](G) (WSGI HTTP server for production)           |
| Static Files                | ❄️ [WhiteNoise](w)  (serves static files in Django)          |
| Database Configuration      | 🔗 [dj-database-url](dj) (env‑based DB configuration)        |
| HTTP Client                 | 📡 [Requests](R) (API calls)                                 |
| Interface Specs             | ⚙️ [asgiref](a) (async Python web services standard)         |
| External APIs               | 🌤️ [Open-Meteo geocoding and forecast APIs](O)               |


##
## 👨‍💻 3. Features / User Stories 👨‍💻
---

- As a user of the site I should be able to:
 	- :white_check_mark:Sign up, log in, and log out with Django authentication
	- :white_check_mark:Create, read, update, delete, and share tasks
	- :white_check_mark:Organize tasks by `work`, `personal`, `shopping`, `business`, and `wish list`
	- :white_check_mark:Mark tasks as `in progress` or `done`
	- :white_check_mark:Configure recurring tasks (daily/weekly/monthly/yearly)
	- :white_check_mark:Browse tasks on a monthly calendar and inspect a selected day
	- :white_check_mark:Upload and remove file attachments per task
	- :white_check_mark:Search for cities globally with autocomplete
	- :white_check_mark:Display animated weather scenes for clear, cloudy, rain, snow, storm, and mist conditions
	- :white_check_mark:Send share invite emails with accept/decline workflow and scheduled task reminder emails

As an admin I should be able to: 
- :white_check_mark:Save user emails in the database through Django's user model

:point_right: Link to Kanban board of ` User Stories` : :point_right: https://github.com/users/Michael-77cm/projects/5 :point_left:

### Additional Features / Future enhancements: 
Notifications:
Within the website notifications are included to give feedback and enhance the user experience. With a pop up at the top of the screen a user is notified once: 

A task is Created 
<img width="2886" height="153" alt="image" src="https://github.com/user-attachments/assets/a085a778-4260-4ef5-bb49-6aae96917d1b" />
A task is Edited 
<img width="2838" height="141" alt="image" src="https://github.com/user-attachments/assets/be4eb028-4a17-4c2d-a90e-0666a2756e19" />
An attempt to delete a task is made 

<img width="300" height="155" alt="image" src="https://github.com/user-attachments/assets/5433df75-6972-4849-a7f4-580147a1dacf" />


A task is Deleted 
<img width="2832" height="141" alt="image" src="https://github.com/user-attachments/assets/70667d53-d0f5-4f5f-83d0-6ed344c3d679" />
Additional Features: 
- Three vibes on the weather app to select from, these would be: realistic, playful or dramatic. 
- A tab that shows you what today
- A tab that shows you the time with the seconds counting down
- As a requirement without filling the Title field a user is unable create a task. 


  
Future Enhancements: 
- Being able to create a Large number of tasks in a day
- Being able to click to the next task as an added functionality and in order to be space efficient. 

##
## 4. 🎨 Design / User Experience 🎨  
---
# :chart_with_upwards_trend: Wireframe Diagram :chart_with_upwards_trend:
<img width="3342" height="1443" alt="image" src="https://github.com/user-attachments/assets/455b4789-5199-4266-b4ad-97447e9a4fbe" />


# :newspaper: Entity Relationship Diagram (ERD) :newspaper:
I have made some changes to the model as it developed, such as removing the created at and updated on timestamps. This is because I didn't believe they were necessary or added to the UX.
<img width="2688" height="1398" alt="image" src="https://github.com/user-attachments/assets/70519142-8b3b-4da5-a9ea-9ebb917932c8" />

## 🌦️ User Flow Diagram — Weather To‑Do List App
This diagram shows how a typical user moves through the website from entry → authentication → dashboard → tasks & weather features.
<img width="4345" height="3909" alt="user flow diagram weather todo list" src="https://github.com/user-attachments/assets/05793e7f-8a68-429f-b8ae-1bcf68d7a15b" />


---



**1. Landing Page (Home)**
- User sees marketing message:
  “One place for weather, calendar planning, and shared tasks.”
- Options:
  • Log In  
  • Create Account (Sign Up)

       ↓

**2. Authentication**
    ├── **Log In**
    │       • Enter username + password  
    │       • Option: Forgot password → Password Reset Page  
    │       • On success → Dashboard  
    │
    └── **Sign Up**
            • Create new account  
            • On success → Log In → Dashboard

    ↓

**3. Dashboard**
- Displays:
  • Weather information (via Open‑Meteo API)  
  • Calendar planning tools  
  • Shared task lists  
  • Email notifications for task reminders 
  • Email notifications for group tasks if there are collaborators

      ↓
    
**4. Core User Actions**
    ├── **View Weather**
    │       • Location-based forecast  
    │       • Geocoding + forecast API calls  
    │
    ├── **Manage Tasks**
    │       • Add tasks  
    │       • Edit tasks  
    │       • Delete tasks  
    │       • Mark tasks complete  
    │       • View previous completed tasks   
    │       • Shared group tasks sync with collaborators  
    │
    ├── **Use Calendar**
    │       • View daily/weekly/monthly plans  
    │       • Add events  
    │       • Organize personal + work items  
    │
    └── **Receive Notifications**
            • Email alerts for task reminders 
            • Email shared task updates

    ↓

**5. Account Management**
- Change password  
- Log out  
- Return to dashboard anytime

##
## 5. Testing 
---
### <div align="center"> 🛠️Manual Testing🛠️</div>

| `Feature` | `Test Case` | `Expected Result` | `Actual Result` |
|---|---|---|---|
| Sign up | User registers with valid credentials | Account is created and verification sent | ✅`Pass`|
| Login | Existing user logs in | User redirected to dashboard | ✅`Pass` |
| Create Task | User creates a task | Task appears in selected category | ✅`Pass` |
| Edit Task | User edits own task | Changes save successfully | ✅`Pass` |
| Delete Task | User deletes own task | Task gets deleted from todolist | ✅`Pass` |
| Share Task | User shares a task | Recipients receive an email with details to view the task | ✅`Pass` |
| Complet Task | User clicks on task complete | Task moves to completed section | ✅`Pass` |
| Delete Task | User deletes own task | Thread removed from forum | ✅`Pass` |
| Comment create | User adds comment | Comment appears in thread | ✅`Pass` |
| Recurring Task | User ticks box for recurring task | Task appears multiple times on the calendar for the tasks duration | ✅`Pass` |
| Upload Attachment | User clicks on upload attachment | Attachements gets uploaded to the task | ✅`Pass` |
| Delete Attachment | User clicks deletes on an attachment | Attachment gets deleted | ✅`Pass` |
| Search a City | User starts typing the name of a city | Autocomplete helps to displays the full name of the city | ✅`Pass` |
| Date & Time | User logs into the dashboard | Date & Time is displayed | ✅`Pass` |
| Display Weather condition | User clicks on search button after typing a city | The weather in that city appears | ✅`Pass` |
| Change of Weather Vibes | User clicks on realistic, playful or dramatic vibe | Weather conditions changes to realistic, playful or dramatic vibe | ✅`Pass` |

Lighthouse Test 
<img width="1881" height="498" alt="image" src="https://github.com/user-attachments/assets/d1368099-cacd-4e9b-9f59-177bb51b869e" />


HTML/CSS/JAVASCRIPT VALIDATION TEST 
<div style="display: flex; gap: 32px; align-items: flex-start; margin-bottom: 16px; justify-content: center;">
	<div>
		<img src="https://github.com/user-attachments/assets/3b763d9c-f21a-4d09-a586-8421ebf03021" width="480" alt="HTML Validator Screenshot" />
		<p style="text-align:center; font-size:14px;">HTML Validator Screenshot</p>
	</div>
  <div>
		<img src="https://github.com/user-attachments/assets/54fe15e8-e5f6-45d5-bd3e-d43ea93f2791" width="480" alt="CSS Validator Screenshot" />
		<p style="text-align:center; font-size:14px;">CSS Validator Screenshot</p>
	</div>
	
  <div>
		<img src="https://github.com/user-attachments/assets/5f762cc6-f262-45c9-8906-f1dd60271baa" width="480" alt="HTML Validator Screenshot" />
		<p style="text-align:center; font-size:14px;">JS Validator Screenshot</p>
	</div>
</div>






### Automated Testing 

| **Category** | **Test Class**             | **Tests** | **Focus Areas**                                      | **Status** |
|--------------|-----------------------------|-----------|-------------------------------------------------------|------------|
| Forms        | TaskFormValidationTests     | 4         | Title requirements, whitespace, recurrence logic      | ✅ Pass    |
| Models       | TaskModelTests              | 3         | Creation, is_done and is_recurring properties         | ✅ Pass    |
| Identity     | SignUpTests                 | 3         | Email validation, duplicates, DB persistence          | ✅ Pass    |
| Security     | AuthenticationTests         | 3         | Login redirects, dashboard access, logout             | ✅ Pass    |
| Data         | TaskCRUDTests               | 4         | Create, Update, Delete, Toggle status                 | ✅ Pass    |
| AuthZ        | PermissionTests             | 3         | Cross-user access denial, ownership                   | ✅ Pass    |
| API          | CitySearchAPITests          | 2         | Query length, result formatting                       | ✅ Pass    |
| API          | WeatherAPITests             | 2         | Parameters, response structure                        | ✅ Pass    |
| **Total**    | **8 Categories**            | **24**    |                                                       | **100%**   |

- Key Coverage: 
  - `Form validation & error handling`
  - `Model CRUD operations`
  - `User authentication & session management`
  - `Task-level permission enforcement`
  - `External API integration`
  - `Database persistence`

##
## 6. Deployment 
---
The project is currently deployed on Heroku, you can find it by following the link below: :point_down:
:point_down: :point_down: :point_down: :point_down:

:point_right:(https://weather-to-do-list-e7b16ee62076.herokuapp.com/) :point_left:

Cloning and Setting Up Locally
Follow these steps to clone the repository and set it up on your local machine:

Clone the Repository:

Open your terminal and run:
git clone https://github.com/Michael-77cm/Weather-To-Do_List.git 
cd weather-to-do_List

Set Up a Virtual Environment:
Create and activate a virtual environment:
```
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

Install Dependencies:
Install the required Python packages:
```
pip install -r requirements.txt
```

Set Up Environment Variables:
- Create a .env file in the root directory and add the following:
```
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3  # Or your database URL
DEBUG=True
```

Run Migrations:
Apply database migrations:
```
python manage.py migrate
```
Run the Development Server:
Start the Django development server:
```
python manage.py runserver
```
Access the App:
Open your browser and go to:
```
http://127.0.0.1:8000/
```
Your app is now running locally!

`DEPLOYING TO HEROKU` 
```
Open Settings.py and set DEBUG back to False
Git add, commit and push your updated code to Github 
Return to Heroku dashboard, go to the Deploy tab and click on deploy from main branch
```
Once deployed,
```
from settings tab click on Reveal Config Vars
Add Database_url and the value of the PostgreSQL from CI url
```
Now your deployed app is connected to your PostgreSQL cloud database. 


##
## 📖 7. Credits 📖
---
Use of Ai
AI and Github Copit were used throughout this project to generate the basic structure of code, debug and resolve code errors, automate repetitive tasks, create automated tests on the website and improve the responsiveness of the website. I manually reviewed the code for accuracy, suitability, ensured there were no security issues and made changes to the code before deployment.    

Author: Michael Bello
GitHub: https://github.com/Michael-77cm/ 






















