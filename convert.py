from selenium import webdriver
from selenium.webdriver.common.by import By
import sys
import time

if( len( sys.argv ) < 2  ) : 
    print("No topic Declared!!!") 
    exit(1) 

service = webdriver.ChromeService(executable_path='/usr/bin/chromedriver')
driver = webdriver.Chrome(service=service)

driver.get('https://www.linkedin.com')
time.sleep(2)

username = driver.find_element(By.NAME, "session_key")
password = driver.find_element(By.NAME, "session_password")

username.send_keys('Ramganeshlankada@gmail.com')
password.send_keys('Ramganesh@100***')
time.sleep(2)

submit = driver.find_element(By.XPATH, "//button[@type='submit']").click()
time.sleep(35)

count = 0

try: 
    for i in range( 1 , len( sys.argv ) ) :
        for num in range( 1 , 10 ) : 
            site = "https://www.linkedin.com/search/results/people/?keywords=" + sys.argv[i] + "&origin=GLOBAL_SEARCH_HEADER&page=" + str(num)
            driver.get(site) 
            time.sleep(2)

            all_buttons = driver.find_elements(By.TAG_NAME, "button")
            connect_buttons = [btn for btn in all_buttons if ( btn.text == "Connect" ) ]

            for btn in connect_buttons:

                driver.execute_script("arguments[0].click();", btn)
                time.sleep(2)

                # # SEND WITHOUT NOTE 
                send = driver.find_element(By.XPATH, "//button[@aria-label='Send now']")
                driver.execute_script("arguments[0].click();", send)

                count += 1                 

                if( count == 100 ) : 
                    print("Made 100 Connections - Come again after a week")
                    exit(1) 
   
except KeyboardInterrupt : 
    print(f"Successfully accomplished {count} connections")

print(f"Successfully accomplished {count} connections")