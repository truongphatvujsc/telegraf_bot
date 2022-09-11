const { Telegraf } = require("telegraf");
const TOKEN = "5743333382:AAFwmtECfYfSndY_QYxLTdmPDm8VBYIF14c";
const bot = new Telegraf(TOKEN);

const web_link = "https://gleaming-liger-99ff37.netlify.app/";
//const web_link = "http://localhost:3000";
// bot.start((ctx) =>
//   ctx.reply("Welcome :)))))", {
//     reply_markup: {
//       keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
//     },
//   })
// );
bot.command('start', ctx =>{
    let startMessage = 'Welcome, this bot order foods';
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
           keyboard: [[{ text: "Order", web_app: { url: web_link }  }]],
         }
    })
    console.log("bot ", bot)
})
bot.on('message', ctx =>{
    console.log(ctx.update.message.web_app_data)
    const orderButton = ctx.update.message.web_app_data.button_text;
    if(orderButton && orderButton === 'Order' ){
        let message = 'Your order: #202209xxx\n'
        const items = JSON.parse(ctx.update.message.web_app_data.data);
        items.forEach((item)=>{
            message += item.title+"--"+item.price+"--"+item.quantity+"\n";
        })
        bot.telegram.sendMessage(ctx.chat.id, message);
    }
})

bot.launch();
