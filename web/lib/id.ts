import {customAlphabet} from "nanoid";

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

export const generateGameId = customAlphabet(alphabet, 6);
export const generatePlayerId = customAlphabet(alphabet, 32);