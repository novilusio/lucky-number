#!/usr/bin/env bash

set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$GAMEID" ] && echo "Missing \$GAMEID environment variable" && exit 1
[ -z "$PLAYER2" ] && echo "Missing \$PLAYER2 environment variable" && exit 1



echo 'About to call findLuck(id: string) on the contract'
echo near call \$CONTRACT findLuck '{"id": '\$GAMEID'}' --account_id \$PLAYER2 --amount 1
echo
echo \$CONTRACT is $CONTRACT
echo \$GAMEID is $GAMEID
echo \$PLAYER2 is $PLAYER2
echo
near call $CONTRACT findLuck '{"id": "'"$GAMEID"'"}' --account_id $PLAYER2 --amount 1
