let num = 123;
let str = "Строка";
let boool = true;
let nuull = null;
let undef;
let obj = {};
function otherFunction() {
    if (typeof num !== 'undefined') {
        document.body.innerHTML += `Переменная num, определенная в документе - Доступна<br>`;
    } else {
        document.body.innerHTML += `Переменная num, определенная в документе - Недоступна<br>`;
    }

    if (typeof str !== 'undefined') {
        document.body.innerHTML += `Константа str, определенная в документе - Доступна<br>`;
    } else {
        document.body.innerHTML += `Константа str, определенная в документе - Недоступна<br>`;
    }

    if (typeof boool !== 'undefined') {
        document.body.innerHTML += `Переменная boool, определенная в документе - Доступна<br>`;
    } else {
        document.body.innerHTML += `Переменная boool, определенная в документе - Недоступна<br>`;
    }

    if (typeof Var !== 'undefined') {
        document.body.innerHTML += `Переменная Var, определенная в mainFunction - Доступна<br>`;
    } else {
        document.body.innerHTML += `Переменная Var, определенная в mainFunction - Недоступна<br>`;
    }

    if (typeof constVar !== 'undefined') {
        document.body.innerHTML += `Константа constVar, определенная в mainFunction - Доступна<br>`;
    } else {
        document.body.innerHTML += `Константа constVar, определенная в mainFunction - Недоступна<br>`;
    }
}
function operands()
{
    document.body.innerHTML += `5 + '1' = '${5+'1'}'<br>`;
    document.body.innerHTML += `+'3' = 3<br>`;
    document.body.innerHTML += `a = 1<br>a++ = 2 Оператор возвращает старое значение<br>++a = 2 Оператор возвращает новое значение<br>`;
}
function interaction()
{
    alert(`Ох, зря ты сюда полез`);
    let userName = prompt(`Ну раз полез, то как звать тебя?`);
    let result =confirm(`Ты счастлив?`);
    document.body.innerHTML += `Имя пользователя -  ${userName}<br>`;
    document.body.innerHTML += `Пользователь счастлив? ${result ?  "Да": "Нет"}<br>`;
}
function cycles()
{
    document.body.innerHTML+= `Цикл for: `    
    for (let i = 0; i < 5; i++) {
        document.body.innerHTML += i + " ";
    }
    document.body.innerHTML+= `<br>Цикл while: `  
    let j = 4;
    while (j)
    {
        document.body.innerHTML += j + " ";
        j--;
    }
    document.body.innerHTML+= `<br>Цикл do while: `  
    j = 4;
    do
    {
        document.body.innerHTML += j + " ";
        j--;
        
    }while(j)
}
function switchee()
{
    let date = new Date();
    let day = date.getDay();
switch (day) {
    case 1:
        document.body.innerHTML += "<br>Сегодня понедельник<br>";
        break;
    case 2:
        document.body.innerHTML += "<br>Сегодня вторник<br>";
        break;
    case 3:
        document.body.innerHTML += "<br>Сегодня среда<br>";
        break;
    case 4:
        document.body.innerHTML += "<br>Сегодня четверг<br>";
        break;
    case 5:
        document.body.innerHTML += "<br>Сегодня пятница<br>";
        break;
    case 6:
        document.body.innerHTML += "<br>Сегодня суббота<br>";
        break;
    default:
        document.body.innerHTML += "<br>Неизвестный день<br>";
}
}
function mainFunction()
{
    let Var = 100;
    const constVar = 200;
    otherFunction();
    operands();
    interaction();
    cycles();
    switchee();
    let sayHi = function() { 
        alert( "Привет" );
    };
    sayHi();
}

mainFunction();
