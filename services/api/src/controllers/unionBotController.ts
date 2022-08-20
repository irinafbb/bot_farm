import {Request, Response} from 'express';
import {HttpStatusCodes} from '../helpers/status';
import {unionBot, localeService} from '../container';
import TelegramBot from 'node-telegram-bot-api';
import {getCustomRepository} from 'typeorm';
import {UnionNamesRepository} from '../infrastructure/repositories/UnionNamesRepo';

unionBot.on('message', async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const lang = 'ru';

    if (msg.text == '/start') {
        return unionBot.sendMessage(chatId, localeService.translate({phrase: 'start', locale: lang}));
    }

    const name = String(msg.text);
    const namesRepository = getCustomRepository(UnionNamesRepository);
    const response = await namesRepository.findMembersByLastName(name);
    let message: string;
    if (response.length == 0) {
        message = `${localeService.translate({phrase: 'not_found', locale: lang})} ${name}`;
    } else {
        message = `${localeService.translate({phrase: 'found', locale: lang})} ${name}:`;
        for (const i in response) {
            message = message.concat(`\n${response[i]}`);
        }
    }

    return unionBot.sendMessage(chatId, message);
});

export const onUnionBotMessage = async (req: Request, res: Response) => {
    unionBot.processUpdate(req.body);
    res.status(HttpStatusCodes.SUCCESS).send();
};
