for addition, 
    between `20 and 100`, select a random number, `target`
    you want two numbers that add up to `target`
    for the first number, `uno`
    select a random number between `2 and target-2`
        `2 <= uno <= target-2` because you want each number to be at least `2`

    determine `dos = target - uno`

    your target numbers are `(uno, dos)`
    

    now you need `vacancy_count` random numbers that do not sum up to `target`
    
    to obtain the random numbers,
    create a list, `random numbers`
        add `uno`
        add `dos`
    create a set, `avoid`
        add `uno`
        add `dos`
    create a range `(2, target-2)` and shuffle it
    iterate through the range
        skip any number in `avoid`
        for each `num` not in `avoid`
            append `num` to `random numbers`
            if `num < target`
            get `compliment = target - num`
            add `compliment` to `avoid`

        once `len(random_numbers) == total_needed`
        end it

    the return type should be
    `target`
    `numbers[2]`
    `allNumbers[total_needed]`


