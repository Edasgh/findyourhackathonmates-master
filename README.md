# Find Your HackathonMates - An app for finding a team when you wish to join hackathons & to find appropriate team members for your hackathon team

## Live link : will be updated sortly

## Demo Video :
### Overall Demo
https://www.loom.com/share/ec456b20bcc347749fad542a389ab0aa?sid=bf9e9a6c-f664-4945-a4a8-eb5ac91ecae5
### Create a new Team
https://www.loom.com/share/22d94c6c33884fada9ed29a90450a5c5?sid=f6f5075a-3bbb-467c-ab0e-a6bb6c13392a
### The Send Application & Send Invite part (lagged a bit in previous part, now fixed)
https://www.loom.com/share/a9c28922e5444784b39fd6c565f246a0?sid=90b94634-0e92-48d6-aeda-4c97e7281ab2
### Update group links , Remove members from group
https://www.loom.com/share/f408ed648489452cacbe3279f6d4b18f?sid=2e73ebde-b7a5-4bb3-b204-c87c89fd8528

## UI:
 ### Home Page
![image](https://github.com/user-attachments/assets/fc4e5ad2-c161-44ce-8223-3ace828edf9e)
 ### Teams Page
![image](https://github.com/user-attachments/assets/60f71dcb-e913-49a0-bd6d-51aee56591c2)
 ### Team Mates Page
![image](https://github.com/user-attachments/assets/39eace22-37c8-457b-8e57-d45f48aa0a6e)
### Profile Page
![image](https://github.com/user-attachments/assets/92b56017-aa65-4694-bc2e-d9061b922400)
 ### Teams Page
![image](https://github.com/user-attachments/assets/401ffc07-7a51-4ca5-83ca-f518ebd29dbf)
 ### Notifications Page
![image](https://github.com/user-attachments/assets/0ce361ce-c0bd-4735-8790-112c041a5f95)




 



## Features :

1. At first Signup then, Login to view all the teams.
2. `Only the teams of which the logged in user is not a member is shown in the "Teams" Page`.
3. Send Join Requests to teams by simply clicking on the `"Apply"` button.
4. Go to the TeamMates page to `"Invite"` team mates into your team (if you haven't already created a team then create one to Invite the team mates).
5. `The application data (notification) is sent to the "Team email"` & `The invitation data (notification) is sent to the "User's email"`.
6. After Joining the team, chat with team members `[go to the "/profile/myTeams" route to find all your teams, you can chat in a specific team chat after going to the "/profile/myTeams/[teamId]" route]`, add various links into your team links to add Github Link or Design Links etc.
7. View all the team members, remove any team member from team by clicking the "-" sign button (only admin can remove members)
8. Accept or Reject the join requests or invitations , view all types of requests in the `"/profile/joinRequests"` route.
9. `Fully responsive web app`

## Motivation:

I myself find it challenging to find any team mates whenever I want to join any hackathon.So, I wanted to create myself an app where hackathon participants can create their own team, find another team mate who fulfill the team's skill requirements, chat with members,have all the links related to hackathons inside their team for referrence.

**Inspiration** : `Hackbud`

## Challenges I faced :

1. I myself found it a bit difficult to understand the `"Next.js"` folder structure, how server-side rendering occurs here cause, this is my first time creating a full stack "Next.js" application (I made `"MERN"` Apps before but not the `"Next.js"` ones),
2. Since, it's my first full stack "Next.js" app so, It was pretty hard for me to understand how to configure server apis or setup socket servers in a "Next.js" app,
3. I'm using `"Nodemailer"` for the first time, so it took a bit longer time for me to understand how "Nodemailer" work and how to handle "Nodemailer" requests.

## Tech Stack :

1. `Next.js`;
2. Design : `CSS3`, `Tailwind CSS`, `FontAwesome Icons`, `React-Toastify`;
3. `MongoDb` (DataBase);
4. `Socket.io` (WebSocket integration);
5. `Nodemailer` (To send emails);

## Future Feature Plans :

1. I plan to add video calling feature here so that team mates can discuss their project better
2. Some file sharing feature (image, videos) via chat
3. Users will be able to add their profile picture (instead of showing avatars)
