


status \ buttons| roll | 6 dice | finish roll | finish turn | Farkle
:-- | :--: |:--: |:--: | :--: | :--:
!roll |  | x | x | x | x
roll - !dice | x|  | x | x | 
dice - !finish | x | |  | x | x
finish roll - !finish turn |   | x | x | | x
finish turn |  | x| x| x| x

x = disabled, otherewise enabled

* !roll
  - The player is ready to play (roll) but has not pressed the `roll n` button yet.
* roll - !dice
  - The player has pressed `roll n` button. But has not selected any dice.  This means that the player wanted to play but just has not chosen which dice to use for points on this roll.
  - might be a `Farkle!`
* dice - !finish
  - tue player has pressed 1 or more die, but has not pressed `finish roll`.  Player is still thinking if they want to add more dice (possibly a 5 or 2-2-2 are still in play )
* finish roll - !finish turn
  - The Player has pressed `finished roll` but has not pressed `roll n` again, player may want end the turn.
* finish turn
  - The Player has pressed `finished turn` button and pass the die on to next player.