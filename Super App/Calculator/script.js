const numbers = document.querySelectorAll('.numbers');
const operator = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const top_section = document.querySelector('.top_section');
const bottom_section = document.querySelector('.bottom_section');
const clear_all = document.querySelector('.clear-all');
const clear = document.querySelector('.clear');

let final = "";
let input = "";

for(i=0; i<numbers.length; i++)
{
    // console.log(numbers[i]);
    numbers[i].addEventListener('click',function(e){
        // console.log(e.srcElement.innerText);
        input = input + e.srcElement.innerText;
        bottom_section.innerText = input;
        // numbers[i].innerText;
    })
}
for(i=0; i<operator.length;i++)
{
    // console.log(numbers[i]);
    operator[i].addEventListener('click',function(e){

        if(input == '')
        {
            final = final.substring(0,final.length-1) + e.srcElement.innerText;
            top_section.innerText = final;
        }
        else{
            final = final+bottom_section.innerText+e.srcElement.innerText;
            top_section.innerText = final;
            input = "";
            bottom_section.innerText = "";
        }
    })
}

equal.addEventListener('click',function(){
    final = final+input;
    input = eval(final);
    bottom_section.innerText = input;
    final = "";
    top_section.innerText = "";
})

clear_all.addEventListener('click',function(){
    input = "";
    final = "";
    top_section.innerText = "";
    bottom_section.innerText = "";
})

clear.addEventListener('click',function(){
    input = input.substring(0,input.length-1);
    bottom_section.innerText = input;
})