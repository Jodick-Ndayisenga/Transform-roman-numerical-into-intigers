document.addEventListener('DOMContentLoaded', function(){
    let lis = 0;
    document.querySelector('.sb').disabled = true;
    document.querySelector(".style").focus();
    const submit = document.querySelector('#sub');
    
    let roman = document.querySelector('#roman');
    const romanButtons = document.querySelectorAll('#valeur');
    const delet = document.querySelector('#delete');

    const romanNumerals = {
        I:1,
        V:5,
        X:10,
        L:50,
        C:100,
        D:500,
        M:1000
    };
    function romanToInt(typedString){
        let total = 0;
        for(let i=0;i<typedString.length;i++){
            let currentRoman = typedString[i];
            let nextRoman = typedString[i+1];
            if(currentRoman in romanNumerals){
                if(nextRoman in romanNumerals){
                    if(romanNumerals[currentRoman]<romanNumerals[nextRoman]){
                        total-=romanNumerals[currentRoman]
                    }else{
                        total +=romanNumerals[currentRoman]
                    }
                }else{
                    total+=romanNumerals[currentRoman]
                }
            }else{
                total = "Roman does not exist!"
            } 
        }
        return total;
    }

    roman.addEventListener('keyup',()=>{
        if(roman.value.length>0){
            submit.disabled = false;
        }else{
            submit.disabled = true;
        }
    })

    delet.addEventListener('click', ()=>{
        roman.value = roman.value.slice(0,-1)
        if(roman.value.length<=0)submit.disabled = true;
        roman.focus();
    })

    romanButtons.forEach(button =>{
        button.addEventListener('click', ()=>{
            let textValue = roman.value;
            roman.value = textValue + button.innerText;
            submit.disabled = false;
            roman.focus();
            
        })
    })

    document.querySelector('form').onsubmit = function (){
        const integ = (document.querySelector('#roman').value).toUpperCase();
        lis++;
        const num = romanToInt(integ);
        let li = document.createElement('li');
        if(Number.isInteger(num)){
            li.textContent = (lis.toString()+" . " + integ+ "  =   " + num)
            
        }else{
            li.textContent = (lis.toString()+" . " + num) 
        }
        document.querySelector('ul').append(li);
        roman.value= "";
        roman.focus();
        submit.disabled = true;
        return false
    }
})