import {Markup, Telegraf, Scenes, session} from 'telegraf';
import dotenv from "dotenv";
import * as fs from 'fs';
import * as path from 'path';
import weather from 'weather-js'
import {awaitTextScene, scene1} from "./scenes.js";
import {DataBase} from "../db/db.js";
dotenv.config({path:'bot/.botSettings'});
const fileName = path.resolve('assets', 'rar.zip')
console.log(fileName)
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session())

export const db = new DataBase()

let stage = new Scenes.Stage([scene1,awaitTextScene])
bot.use(stage.middleware());
bot.start(async (ctx) => {
    let data = ctx.update.message
    let id = data.from.id
    let username = data.from.username
    let firstName = data.from.first_name
    console.log(data)
    await ctx.reply(`Привет, ${firstName}.`,Markup.keyboard([['Погода в Канаде', 'Хочу почитать!', 'Сделать рассылку']]))
    db.newUser(id,username)
})

bot.on('text', async (ctx) => {
    let data = ctx.update.message

    switch (data.text){
        case "Хочу почитать!":
            try{
                await ctx.replyWithPhoto({
                    url: 'https://pythonist.ru/wp-content/uploads/2020/03/photo_2021-02-03_10-47-04-350x2000-1.jpg',
                });
            }catch (e) {

            }
            await ctx.reply(process.env.Read_text)

            try{
                await ctx.telegram.sendDocument(ctx.from.id, {
                    url:"https://drive.google.com/u/0/uc?id=1Xs_YjOLgigsuKl17mOnR_488MdEKloCD&export=download",
                    filename: 'rar.rar'
                })
            }catch (e) {

            }

            break;
        case "Погода в Канаде":
            await weather.find({search: 'Canada', degreeType: 'C'}, async function (err, result) {
                if (err) console.log(err);
                let temp = result[0].current.temperature
                await ctx.reply(`${temp} °С`)
            });
            break;
        case "Сделать рассылку":
            await ctx.scene.enter('test1')
            break;
        default:
            break;
    }
});
bot.launch();
