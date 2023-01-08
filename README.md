## Agriculture Monitoring System App
An app helps to display agricultural data such as temperature, moisture, and pH level in the form of dashboards. To begin, hardware units must be configured in order for sensor results to be shown on app dashboards. This project is a consolidated version of these components, the following four repositories must be set up in order to test this application.
1. LoRa Node Module  https://github.com/sarbbjeet/LoRa-Node-Module 
2. LoRa Gateway Module https://github.com/sarbbjeet/LoRa-Gateway-Module
3. Cloud Server https://github.com/sarbbjeet/Agro-server
4. Mobile App https://github.com/sarbbjeet/Agro-monitoring-app

Even the authentication system aids in the management of different  dashboards. Every user has various dashboards based on the number of fields, 
a rounded progress bar to display temperature and moisture data, and a button to operate sprinkler on/off status.

<div>
   <img src="https://user-images.githubusercontent.com/9445093/211199764-8c4634c1-d960-4fde-b735-0695e0484c59.png" width="400" height="600">    
   </div>

<div>
 <img src="https://user-images.githubusercontent.com/9445093/211201133-b3c10a55-450e-41c1-8749-0206a1d4c6a2.jpg" width="900" height="500">  
</div>

## Ready to use
This server is hosted on the AWS cloud and may be reached via the domain address shown below.

https://mycodehub.co.uk/

## Getting Started
This repository includes a node.js server and a Next.js-based app. The Node.js server assists in controlling sprinkler real-time on/off auto operation based on moisture percentage measurements compared to stored moisture threshold values.
Follow the below steps to configure repository on your machine
1. Download or pull this repository on your machine.
2. ``` yarn install ``` to install all dependencies 
3. Create .env file in the project root directory. 
Default sample of .env file is wriiten below.
```
DATABASE_URL=mysql://root:password@localhost:3306/mydb12
PORT=3000
STORAGE_PATH=public/_uploads/
PRIVATE_KEY=secure_jwt_key
NEXT_PUBLIC_MQTT_URL =ws://broker.emqx.io:8084/mqtt
NEXT_PUBLIC_MQTT_HOSTNAME=broker.emqx.io
NEXT_PUBLIC_MQTT_USERNAME=sarb
NEXT_PUBLIC_MQTT_PASSWORD=password
NEXT_PUBLIC_MQTT_CLIENTID=mqtt123
```
Change the mqtt settings to reflect the availability of your MQTT broker.
4. As indicated in the root directory, a node server folder contains a node.js server to control the above-mentioned sprinkler auto on/off activities.
To launch the node.js server with the nextjs application, make a few changes to the package.json file.
```
"scripts": {
        "server": "node node_server/index.js",
        "dev": "concurrently \"npm run server\" \"npm run generate && next\"",
        "generate": "npx prisma generate",
        "prisma:migrate": "npx prisma migrate deploy",
        "build": "npm run generate && next build",
        "start": "concurrently \"npm run server\"   \"next start -p 3000\"",
        }
```


5. ``` npm run dev ``` to run development mode of the next.js application 

6. ``` npm run build ``` build the project for hosting 

