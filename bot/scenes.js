import {Markup, Scenes} from "telegraf";
import {db} from "./index.js";
export const scene1 = new Scenes.BaseScene('test1');
scene1.enter(async (ctx) => {
    await ctx.reply('Вы выбрали рассылку всем пользователям. Вы уверен что хотите это сделать?',
        Markup.keyboard([['Да', 'Отмена']]))
    console.log('Enter to Scene 1');
})
scene1.on('text', async (ctx) => {
    let data = ctx.update.message
    switch (data.text){
        case "Да":
            return  ctx.scene.enter('awaitText')
        case "Отмена":
            ctx.reply('Вы отменили отправку сообщений',Markup.keyboard([['Погода в Канаде', 'Хочу почитать!', 'Сделать рассылку']]))
            return ctx.scene.leave()
    }
})

export const awaitTextScene = new Scenes.BaseScene('awaitText');
awaitTextScene.enter(async (ctx) => {
    await ctx.reply('Введите текст который хотите отправить')
})
awaitTextScene.on('text', async (ctx) => {
    let data = ctx.update.message
    let arrUsers  = await db.selectAll()
    console.log(arrUsers)
    arrUsers.rows.map((element) => {
        ctx.telegram.sendMessage(element.userid, `${data.text}`)
    })
    // ctx.telegram.sendMessage()
    await ctx.reply('Сообщение отправлено',Markup.keyboard([['Погода в Канаде', 'Хочу почитать!', 'Сделать рассылку']]))
    return ctx.scene.leave()
})