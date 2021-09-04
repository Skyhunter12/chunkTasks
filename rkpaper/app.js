let process = require('process');
choice = ['rock','paper','scissors'];
let user_choice = process.argv[2];
console.log(user_choice);
let cpu_choice = Math.floor(Math.random()*choice.length);
console.log(cpu_choice);
switch(user_choice){
    case 'rock':
        user_choice = 0
        break;
    case 'paper':
        user_choice = 1
        break;    
    case 'scissors':
        user_choice = 2
        break;
    default:
        console.log('Invalid choice');    
}

if(cpu_choice == user_choice){
    console.log('Result is a draw');
}else if(user_choice> cpu_choice || user_choice ==0 && cpu_choice ==2){
    console.log('User wins over computer');
}else if(cpu_choice > user_choice || cpu_choice == 0 && user_choice ==2){
    console.log('Computer won over user');
}else{
    console.log('Invalid user details');
}