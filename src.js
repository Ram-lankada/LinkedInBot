require("dotenv").config();
const {Builder, By, until} = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

function initOptions(o) { 
    // o.addArguments("headless");
    o.addArguments("disable-infobars");
    o.addArguments("no-sandbox");
    o.addArguments("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 RuxitSynthetic/1.0 v6419931773 t38550 ath9b965f92 altpub");
    o.setUserPreferences({credential_enable_service: false});
}

const BasePage = function (customAudio = null) {
    let o = new chrome.Options();
    initOptions(o);

    this.driver = new Builder().withCapabilities({acceptSslCerts: true, acceptInsecureCerts: true}).setChromeOptions(o).forBrowser("chrome").build();

    this.visit = async function (theUrl) {
        return await this.driver.get(theUrl);
    };

    this.findById = async function (id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, "Looking for element");
        return await this.driver.findElement(By.id(id));
    };

    this.findByClassName = async function (name) {
        const els = await this.driver.wait(until.elementsLocated(By.className(name)), 15000, "Looking for element");
        return els[els.length - 1];
        return await this.driver.findElement(By.className(name));
    };

    this.signin = async function () {
        let name = process.env.USERNAME || "";
        let password = process.env.PASSWORD || "";
        let input = await this.findById("session_key");
        await input.sendKeys(name);
        let input2 = await this.findById("session_password");
        await input2.sendKeys(password);
        let button = await this.findByClassName("sign-in-form__submit-btn--full-width");
        console.log(button);
        await button.click();
    };

    this.pressAcceptButton = async function () {

      let buttons = await this.findByClassName(
        "artdeco-button--secondary invitation-card__action-btn"
        );

        await buttons.click();
    };


    // for( let i = 0 ; i < buttons.length ; i++ )
    // {
    // console.log( buttons[i] ) ;
    // console.log("\n") ;
    // }

    // Follow Button
    this.pressFollowButton = async function () {
        let buttons = await this.findByClassName("artdeco-button artdeco-button--2 artdeco-button--secondary ember-view");
        await buttons.click();
    };

    // // Connect Button
    // this.pressConnectButton = async function () {
    //     let buttons = await this.findByClassName("artdeco-button artdeco-button--2 artdeco-button--secondary ember-view");
    //     await buttons.click();

    // };

    // XPATH connect Button 
        //   var xpathExpression = "//button[@aria-label='Send now']";
        //   var node = document;
        //   let buttons = document.evaluate(xpathExpression, node, null, XPathResult.ANY_TYPE, null);
    
    TODO:
    // Debug the pressConnectButton function      
    this.pressConnectButton = async function () {
        const all_buttons = await this.driver.findElements("button");
    
        var buttons = [];
        
        for (var i = 0; i < all_buttons.length; i++) {
            if (all_buttons[i].textContent === "Connect") {
                buttons.push(all_buttons[i]);
            }
        }

        for (const button of buttons) {
            await button.click();
            await this.pressSendWithoutNote();
        }
    };
    
    // XPATH send without note
    this.pressSendWithoutNote = async function () {
        const button = await this.driver.$x("//button[@aria-label='Send now']");
    
        await button.click();
    };

    
    
    // Connect & Follow Button
    this.pressConnectFollowButton = async function () {

        let buttons = await this.findByClassName("artdeco-button artdeco-button--2 artdeco-button--secondary ember-view");

        for (let i = 0; i < buttons.length; i++) {
            console.log(buttons[i]);
            console.log("\n");
        }

        for (let i = 0; i < buttons.length; i++) {
            await buttons[i].click();
            console.log("Clicked connect Button ! \n");
            const connect2 = await this.findByClassName("artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1");

            if (connect2.length > 0) {
                await connect2[0].click();
                console.log(connect2[i]);
                console.log("\n Clicked connect2 ! \n");
            }
        }

    };

    // AddNote
    this.pressAddNote = async function () {
        let buttons = await this.findByClassName("artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view mr1");
        await buttons.click();
    };


    // TextArea class
    this.fillTextArea = async function (message) {
        let textArea = await this.findByClassName("ember-text-area ember-view connect-button-send-invite__custom-message mb3");
        await textArea.sendKeys(message);
    };

    // Send with note
    this.pressSendWithNote = async function () {
        let buttons = await this.findByClassName("artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1");
        await buttons.click();
    };

    this.scrollToBottom = async function () {
        this.driver.executeScript("window.scrollTo(0," + 0.8 * + " document.body.scrollHeight)");
    };

    // this.scrollToBottom = async function () {
    // const scrollHeight = await this.driver.executeScript("return document.body.scrollHeight");
    // const scrollToHeight = scrollHeight * 0.7;

    // await this.driver.executeScript(`window.scrollTo(0, ${scrollToHeight})`);
    // };

};

module.exports = BasePage;
