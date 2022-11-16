//get text from code.txt as utf 8

const fs = require('fs');
let code = fs.readFileSync(process.argv[2], 'utf8');
const https = require('https');
code = code.replace(/;/gui,'\n').split('\n')


//lowercase chars are 97-122
/*
r<register number, only 1 or 2 is allowed> <command, specified after>
commands {
+  adds 1 to the register
-  subtracts 1 from the register
*  multiplies the register by the other register
=  sets the register to 0
#  sets the register to a random number between 0 and 255
r1/r2  sets the register to the value of the other register
}
cmp: only runs the next line if register 1 is more than register 2, otherwise it skips the next line
outn: outputs the value of register 1 as a number
outc: outputs the value of register 1 as a string
jmp: jumps to the label specified
swap: swaps the values of register 1 and register 2
lbl: makes a label to jump to
rjmp: jumps to a line
cope: ends the program
src: prints the source code of the interpreter
*/

//implement the progamming language here
let r1 = 0;
let r2 = 0;
let line = 0;
let labels = {};

while (line < code.length) {
    let command = code[line].split(' ');
    switch (command[0]) {
        case 'r1':
            r1 = Number(command[1]);
            break;
        case 'r2':
            r2 = Number(command[1]);
            break;
        case 'out':
            process.stdout.write(r1.toString());
            break;
        case 'outc':
            process.stdout.write(String.fromCharCode(r1));
            break;
        case 'swap':
            let temp = r1;
            r1 = r2;
            r2 = temp;
            break;
        case 'cmp':
            if (r1 <= r2) {
                line++;
            }
            break;
        case 'r1+':
            r1++;
            break;
        case 'r1-':
            r1--;
            break;
        case 'r2+':
            r2++;
            break;
        case 'r2-':
            r2--;
            break;
        case 'r1*':
            r1 *= r2;
            break;
        case 'r2*':
            r2 *= r1;
            break;
        case 'r1/':
            r1 /= r2;
            break;
        case 'r2/':
            r2 /= r1;
            break;
        case 'r1=':
            r1 = 0;
            break;
        case 'r2=':
            r2 = 0;
            break;
        case 'r1#':
            r1 = Math.floor(Math.random() * 256);
            break;
        case 'r2#':
            r2 = Math.floor(Math.random() * 256);
            break;
        case 'r1r2':
            r1 = r2;
            break;
        case 'r2r1':
            r2 = r1;
            break;
        case 'lbl':
            labels[command[1]] = line;
            break;
        case 'jmp':
            line = labels[command[1]];
            break;
        case 'rjmp':
            //jump to a random line in the code
            line = Math.floor(Math.random() * code.length);
            break;
        case 'quit':
            process.exit();
            break;
        case 'src':
            //get and print the contents of this file
            process.stdout.write(fs.readFileSync(__filename, 'utf8'));
        

    }
    line++;
}
