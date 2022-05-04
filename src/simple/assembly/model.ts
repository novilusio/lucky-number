import { PersistentUnorderedMap, context, u128, RNG } from "near-sdk-as"

@nearBindgen

export class LuckyNumber {
  id: string;
  player1: string;
  player2: string;
  betAmount: u128;
  num1: u8;
  num2: u8;


  constructor() {

    let randomId = new RNG<u32>(1, u32.MAX_VALUE);
    let idroll = randomId.next();
    
    this.id = idroll.toString();

    this.player1 = context.sender;
    this.player2 = "";
    this.betAmount = context.attachedDeposit;
    this.num1 = this.num1;
    this.num1 = this.num2;
  }
}

export const games = new PersistentUnorderedMap<string, LuckyNumber>('g');