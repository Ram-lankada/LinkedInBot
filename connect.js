const {Builder, By, until} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const BasePage = require("./src");

async function sleep(timeInS) {
    await new Promise((resolve) => setTimeout(resolve, timeInS * 1000))
}

async function startBot() {
    const page = new BasePage();
    let site = "https://www.linkedin.com";
    await page.visit(site);

    await sleep(5)

    await page.signin();
    await sleep(35)
    var count = 0 ; 

    for( let i = 2 ; i < process.argv.length ; i++ )
    {
        topic = process.argv[i] ; 
        let num = 1 ; 
        site = "https://www.linkedin.com/search/results/people/?keywords=" + topic + "&origin=GLOBAL_SEARCH_HEADER&page=" + num ;
        // &origin=GLOBAL_SEARCH_HEADER&sid=wW%3A
        // &origin=CLUSTER_EXPANSION&sid=J*E
        page.visit(site);
        await sleep(5)
        
        for( num = 1 ; num < 10 ; num++ )
        {
            site = "https://www.linkedin.com/search/results/people/?keywords=" + topic + "&origin=GLOBAL_SEARCH_HEADER&page=" + num ;

            await page.visit(site);
            for (let i = 3; i < 10000; i++) {
                if (i % 10 === 9) {
                    page.visit(site);
                    await sleep(8)
                    page.scrollToBottom();
                    await sleep(2)
                }
                try {

                    // let button = await this.findByClassName("artdeco-button artdeco-button--2 artdeco-button--secondary"); // Replace "your-button-class-name" with the actual class name of the button
                    // let buttonId = await button.getAttribute("id"); // Get the id attribute of the button
                    // let ariaLabel = await buttonId.getAttribute("aria-label"); // Get the aria-label attribute of the button
                  
                    // if ( ariaLabel.includes("Invite") )
                    // {
                    //     await page.pressConnectButton();
                    //     await page.pressConnectButton2();
                    //     count++ ; 
                    // }
                    // else 
                    // {
                    //     await page.pressFollowButton();
                    //     count++ ; 
                    // }

                    await page.pressConnectButton() ; 
                    await new Promise((resolve) => setTimeout(resolve, 3000))
                    page.scrollToBottom();
                    await sleep(3)
                } catch (e) {
                    console.error(e)
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 5000))
        }

    }

    console.log("Total buttons clicked : " , count ) ; 
}
(async () => {
    if( process.argv.length > 2 ) 
        await startBot()
    else
    {
        console.log("No topics Entered!!!") ; 
        process.exit(0) ; 
    } 

})()


    /* 
    ALGORITHM 
    Search input topics --> input from the user in bash terminal
    if( input = 1 ) 
        single string i.e. site 
    else 
        SiteGenr 
    Click on "see all people results" 
    loop( findPages() )
    {
        Only click on follow / connect buttons  
        if( connect_button ) 
        {
            either 
                click( send without a note ) 
                await Promise 2 seconds
            or 
                click( Add a note ) 
                Fill the placeholder with message 
                click( send ) 
                await Promise 7 seconds 
        }
        scrollToBottom()
        clickNextPage() 
    }

    */

    /* 
    
    Search input topics --> input from the user in bash terminal
    if( input = 1 ) 
        single string i.e. site 
    else 
        Sites[] = SiteGenr( ...inputs )  
    Sites.forEach( site => 
    {
        
        Click on "see all people results" 
        loop( findPages() )
        {
            Only click on follow / connect buttons  
            if( connect_button ) 
            {
                either 
                    click( send without a note ) 
                    await Promise 2 seconds
                or 
                    click( Add a note ) 
                    Fill the placeholder with message 
                    click( send ) 
                    await Promise 7 seconds 
            }
            scrollToBottom()
            clickNextPage() 
        }

    })

*/