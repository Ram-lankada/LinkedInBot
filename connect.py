from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import sys
import time
import curses
import random

# # Live count Animation with color
# stdscr = curses.initscr()
# curses.curs_set(0)  
# stdscr.nodelay(1)  
# stdscr.timeout(100)
# colors = [curses.COLOR_RED, curses.COLOR_GREEN, curses.COLOR_BLUE, curses.COLOR_YELLOW]

if( len( sys.argv ) < 2  ) : 
    print("No topic Declared!!!") 
    exit(1) 

# linux path : executable_path='/usr/bin/chromedriver'
# windows path : executable_path='/path/to/your/chromedriver/chromedriver.exe'
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
    for i in range( 1 , len( sys.argv ) ) :
        for num in range( 11 , 100 ) : 
            site = "https://www.linkedin.com/search/results/people/?keywords=" + sys.argv[i] + "&origin=GLOBAL_SEARCH_HEADER&page=" + str(num)
            driver.get(site) 
            time.sleep(2)

            all_buttons = driver.find_elements(By.TAG_NAME, "button")
            connect_buttons = [btn for btn in all_buttons if ( btn.text == "Connect" ) ]

            for btn in connect_buttons:

                # stdscr.clear()
                # stdscr.addstr(0, 0, "Live Count: {}".format(count), curses.color_pair(random.choice(colors)))
                # stdscr.refresh()

                driver.execute_script("arguments[0].click();", btn)
                time.sleep(2)

                if( sys.argv[ len(sys.argv) - 1 ] == '0' ) :  
                    # # SEND WITHOUT NOTE 
                    send = driver.find_element(By.XPATH, "//button[@aria-label='Send now']")
                    driver.execute_script("arguments[0].click();", send)
                    time.sleep(2) 
                    print("Connections made : " , count) 

                    # # Finding connection name
                    # name = driver.find_element(By.TAG_NAME, "strong").text
                    # print( name + "\n" ) 
                    # print(f"Connected to {name} \n")

                else : 
                    # # SEND WITH NOTE 
                    sendWithNote = driver.find_element(By.XPATH, "//button[@aria-label='Add a note']")
                    driver.execute_script("arguments[0].click();", sendWithNote)
                    time.sleep(3) 

                    # Finding person name
                    name = driver.find_element(By.TAG_NAME, "strong").text
                    print( name + "\n" ) 

                    # Paste message 
                    inputBox = driver.find_element(By.ID, "custom-message")
                    input_text = f"Hi {name}, Please allow me to be a part of your connection family"
                    inputBox.send_keys(input_text)
                    time.sleep(3)

                    # Final send 
                    send = driver.find_element(By.XPATH, "//button[@aria-label='Send now']")
                    driver.execute_script("arguments[0].click();", send)

                    print(f"clicked on {name} \n")


                count += 1 
                close = driver.find_element(By.XPATH, "//button[@aria-label='Dismiss']")
                driver.execute_script("arguments[0].click();", close)
                time.sleep(2)

                

                if( count == 100 ) : 
                    print("Made 100 Connections - Come again after a week")
                    exit(1) 

            print(f"Made {count} connections till page-{num}")
            print(f"-------------TURNING INTO PAGE : {num}-------------")

except (KeyboardInterrupt, NoSuchElementException ):
    print("\n")
    print(f"Successfully accomplished {count} connections")
    print(f"You'll get banned on LinkedIn if you exceed {100-count} more connections this week")
    exit(1) 
else : 
    print(f"Successfully accomplished {count} connections")
    print(f"You'll get banned on LinkedIn if you exceed {100-count} more connections this week")