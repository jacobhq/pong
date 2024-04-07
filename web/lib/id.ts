import {customAlphabet} from "nanoid";

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
export const generateGameId = customAlphabet(alphabet, 6);
