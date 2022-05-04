import { context, u128, ContractPromiseBatch, RNG } from "near-sdk-as";
import { ONE_NEAR } from "../../utils";
import { LuckyNumber, games} from "./model";
//
//
//-----   CREATE A GAME   ----- //
//
/*  -->   near call $CONTRACT createLucky --accountId <your_account.testnet> --amount 1   <--    */
//
//
export function createLucky(): string {
  assert(context.attachedDeposit == ONE_NEAR, 'Pay 1 NEAR for luck ;) ');
  const luck = new LuckyNumber();
  games.set(luck.id, luck);

  return luck.id;
}
//
//
//-----   FIND A GAME    ----- //
//
/*  -->   near call $CONTRACT findLuck '{"id":"<gameId>"}' --accountId <player2.testnet> --amount 1   <--      */
//
//
export function findLuck(id: string): string {
  assert(games.contains(id), 'You are not Lucky :( ');
  assert(context.attachedDeposit == ONE_NEAR, 'Pay 1 NEAR for luck ;) ');

  let luck = games.getSome(id);
  assert(luck.player2 == "", "Already has two lucky."), 
  assert(luck.player1 != context.sender, "Please find another lucky");
  

  luck.betAmount = u128.add(luck.betAmount, context.attachedDeposit);

  luck.player2 = context.sender;

  games.set(id, luck);

  return `Game is ready! Bet Amount: ${luck.betAmount} Good Luck!`;
}
//
//
//-----   GAMEPLAY    ----- //
//
/*    -->  near call $CONTRACT fortune '{"id": "<gameId>"}' --accountId <any_player.testnet>   <--       */
//
//
export function fortune(id:string): string {

  let luck = games.getSome(id);
 
  
  let randomNum = new RNG<u8>(1,10);
  luck.num1 = randomNum.next();
  luck.num2 = randomNum.next();
  
  let info = "";
  let LuckyNumbers = [luck.num1, luck.num2];
  


  if (luck.num1 > luck.num2){
    info = `${luck.player1} Won! 2NEAR sent to ${luck.player1}.` 
    const winPlayer1 = ContractPromiseBatch.create(luck.player1);
    winPlayer1.transfer(luck.betAmount);
  }
  else if (luck.num1 < luck.num2){
    info = `${luck.player2} Won! 2NEAR sent to ${luck.player2}.`
    const winPlayer2 = ContractPromiseBatch.create(luck.player2);
    winPlayer2.transfer(luck.betAmount);
  }
  else if (luck.num1 == luck.num2){
    info = `Double Chance! 1NEAR deposit has been refunded to your acount.`

    const to_player1 = ContractPromiseBatch.create(luck.player1);
    const to_player2 = ContractPromiseBatch.create(luck.player2);
    const payBack = u128.sub(luck.betAmount, ONE_NEAR);
    to_player1.transfer(payBack);
    to_player2.transfer(payBack);
  }

  games.set(luck.id, luck);
  return info + " " + `${luck.player1}'s Number --> ${luck.num1}` + " " + `${luck.player2}'s Number --> ${luck.num2}`
}
//
//
//-----   VIEW    ----- //
//
/*    --> near call $CONTRACT viewLucky '{"id": "<game_id>"}' --accountId <your_account.testnet>   <--     */
//
//
export function viewLucky(id: string): LuckyNumber {
  return games.getSome(id);
} 
//
/*    --> near call $CONTRACT allLucky --accountId <your_account.testnet>   <--     */
//
export function allLucky(): Array<LuckyNumber> {
  return games.values();
}
