import config from './config/config';
import TelegramBot from 'node-telegram-bot-api';
import {LocaleService} from './services/locales/localeService';
import {join} from 'path';

const unionToken = config.unionBotToken;
const unionUrl = config.unionBotPublicUrl;
const regWebhook = config.registerWebhook;

const unionBot = new TelegramBot(unionToken, {
    webHook: {
        port: 8444, 
    }
});
if (regWebhook) {
    unionBot.setWebHook(`${unionUrl}/bot${unionToken}`);
}

const localeService = new LocaleService({
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    updateFiles: false,
    directory: join(__dirname, 'infrastructure/locales'),
});

export {
    localeService,
    unionBot,
    unionToken
};
