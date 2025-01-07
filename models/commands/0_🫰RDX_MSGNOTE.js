const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosentWithImage',
    version: '1.1.0',
    hasPermssion: 0,
    credits: 'RDX_ZAIN',
    description: 'Automatically sends a message with an image every hour, including an important note',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

// Messages array with corresponding image URLs and the important note
const messages = [
    { 
        message: 'Good Night! 🥀', 
        image: 'https://example.com/image1.jpg' 
    },
    { 
        message: 'Stay Blessed! 🌟', 
        image: 'https://example.com/image2.jpg' 
    },
    { 
        message: 'Have a Great Day! 🌞', 
        image: 'https://example.com/image3.jpg' 
    },
    { 
        message: 'Keep Smiling! 😊', 
        image: 'https://example.com/image4.jpg' 
    },
    { 
        message: `
💎━━━━━🌟━━━━━💎
✨ IMPORTANT NOTE ✨
💎━━━━━🌟━━━━━💎

📌 YA BOT ID MAXIMUM 5 DIN CHLY GI.  
📌 PHR BAND HO JY GI.  
📌 NEW BOT ADD KRWANE K LY BOT KA ADMIN KO ADD KIA JY.  
📌 JB ES ID MA PROBLEM HO TO NEW ID SA BOT RUN KR SKY. 😊  

BOT KA OWNER KI ID KA LINK YA RHA:  
👉 [Click Here](https://www.facebook.com/profile.php?id=100086033644262)  

AGR AP KO APNE GROUP MA ADMIN KA NAME KA BOT CHAHIE TO WHATSAPP PA CONTACT KR SAKTY:  
Telegram: @Toma123

💖 𝑻𝑯𝑨𝑵𝑲𝑺 𝑭𝑶𝑹 𝑼𝑺𝑰𝑵𝑮 𝑻𝑶𝑴𝑨 𝑩𝑶𝑻💖  
💎━━━━━🌟━━━━━💎
        `, 
        image: 'https://example.com/important-note-image.jpg' // Optional image for the note
    }
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ AUTO MESSAGE WITH IMAGE AND NOTE LOADED ============"));

    messages.forEach(({ message, image }, index) => {
        const scheduledTime = moment.tz({ hour: index % 24, minute: 0 }, 'Asia/Karachi').toDate(); // Hourly rotation

        schedule.scheduleJob(scheduledTime, () => {
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(
                    { 
                        body: message, 
                        attachment: image ? [api.getExternalImage(image)] : undefined 
                    }, 
                    threadID, 
                    (error) => {
                        if (error) {
                            console.error(`Failed to send message to ${threadID}:`, error);
                        }
                    }
                );
            });
        });
    });
};

module.exports.run = () => {
    // This function can be left empty as the main logic is handled in onLoad
};
