# LinkedInBot

<img src="https://github.com/Ram-lankada/LinkedInBot/assets/91232198/e9eba0dc-df57-4d12-9cd8-3e1f8c862908" width="60" height="60" />
<img src="https://github.com/Ram-lankada/LinkedInBot/assets/91232198/2945f152-2a80-49a1-b96a-3b64c522ef91" width="60" height="70" />
<img src="https://github.com/Ram-lankada/LinkedInBot/assets/91232198/124ae337-b748-4149-a12a-b16bdd99dff8" width="60" height="60" />

<br>
LinkedInBot enables you to automatically connect to people being employed at multiple MNCs based on topic search, and accepts all the Connection invitations you've received. 
Written both in JavaScript & Python

## Demonstration
https://www.linkedin.com/posts/ram-ganesh-1b2189208_linkedinautomation-linkedinbot-connections-activity-7124272181374590976-uMtp?utm_source=share&utm_medium=member_desktop

## Disclaimer 
As per my findings a user can have at max of **100 connections** and **250 actions per week** on LinkedIn. 
And **you may get banned** if you've exceeded them. 

And i've programmed explicit time waits to let the page completely before any performing any action. 
You can change those time waits in the code, if you want the process to be faster. 

## How to run

1. Fork this repo --> Clone --> cd into the folder
2. Install chrome driver onto your system
3. Run 'npm install'
4. Conda environment setup
```
conda create -n bot python=3.12.0
```
```
conda activate bot
```
```
pip install -r requirements.txt
```
## Chrome Driver installation
1. Download chrome driver from below link
```
https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6045.105/win64/chromedriver-win64.zip
```
2. Paste the extracted folder in your C Drive

## Chrome Driver path
**Linux users** 
<br> 
Find for executable_path in `connect.py` file and paste the below `executable_path` w.r.t your OS. 
```
executable_path='/usr/bin/chromedriver'
```
**windows users** 
<br> 
You need to install chrome Driver and paste the chrome driver path in `executable_path`
```
executable_path='/path/to/your/chromedriver/chromedriver.exe'
```

### Connections Bot 
**Python**
<br> 
Syntax : 
```
python3 connect.py topic1 topic2 topic3 option
```
Options : 
- **0** = Connect **without** sending a note
- **1** = Connect **With** sending a note 

Command : 
```
python3 connect.py Google Amazon Zoho 0
```

**JavaScript**
<br> 
Syntax : 
```
node connect.js topic1 topic2 topic3 
```
Command
```
node connect.js Google Amazon Zoho
```

### Invitations accepting Bot 
**Python**
<br> 
Command : 
```
python3 accept.py
```

**JavaScript**
<br> 
Command : 
```
node acceptInvite.js 
```
