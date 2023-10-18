from selenium import webdriver
from selenium.webdriver.common.by import By
import sys
import time


service = webdriver.ChromeService(executable_path='/usr/bin/chromedriver')
driver = webdriver.Chrome(service=service)

driver.get('https://www.linkedin.com')
time.sleep(2)

username = driver.find_element(By.NAME, "session_key")
password = driver.find_element(By.NAME, "session_password")

username.send_keys('Enter your email here')
password.send_keys('Enter your password here')
time.sleep(2)

submit = driver.find_element(By.XPATH, "//button[@type='submit']").click()
time.sleep(35)

count = 0

try: 
    site = "https://www.linkedin.com/mynetwork/invitation-manager"
    driver.get(site) 
    time.sleep(2)

    all_buttons = driver.find_elements(By.TAG_NAME, "button")
    connect_buttons = [btn for btn in all_buttons if ( btn.text == "Accept" ) ]

    for btn in connect_buttons:

        driver.execute_script("arguments[0].click();", btn)
        time.sleep(2)


        send = driver.find_element(By.XPATH, "//button[@aria-label='Accept']")
        driver.execute_script("arguments[0].click();", send)

        count += 1         

        if( count == 100 ) : 
            print("Accepted 100 invites - Come again after a week")
            exit(1) 

                
except KeyboardInterrupt : 
    print(f"Successfully accepted {count} connections")


print(f"Successfully accepted {count} connections")



