#!/usr/bin/env bash

set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'Defining the $PLAYER1'
export PLAYER1=$OWNER

[ -z "$PLAYER1" ] && echo "Missing \$PLAYER1 environment variable" && exit 1



echo 'About to call createLucky() on the contract'
echo near call \$CONTRACT createLucky --account_id \$PLAYER1 --amount 1
echo
echo \$CONTRACT is $CONTRACT
echo \$PLAYER1 is $PLAYER1
echo
near call $CONTRACT createLucky --account_id $PLAYER1 --amount 1

echo 'Define $GAMEID and $PLAYER2'
echo --------------------------------------------
echo run the following commands
echo
echo 'export GAMEID=<game_Id>'
echo
echo 'export PLAYER2=<player_2>'