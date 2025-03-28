determine the target from a range i.e. `2, 10`

to determine the big number, determine a multiplier between `2 and 10`
since the maximum big number is `100`

the small number is the multiplier

to determine the other numbers, get all numbers from a range `2 and 100`
explore each number in the range while allNumbers.length < numsNeeded

for each number, check if it's in avoid
check if (number * target) is in avoid
check if (number / target) is in avoid


