$('.menu_screen_choose').show();
$('.coffe_menu').hide();
$('.tea_menu').hide();
$('.progress_menu').hide();
$('.startNotification_menu').hide();
$('.fluidFlow').hide();
$('.cupSteam').hide();
$('.coffe_holder').click(function(){
    $('.menu_screen_choose').hide();
    $('.coffe_menu').fadeIn();
});
$('.tea_holder').click(function(){
    $('.menu_screen_choose').hide();
    $('.tea_menu').fadeIn();
});
$('.arrowImg').click(function(){
    $('.menu_screen_choose').fadeIn();
    $('.tea_menu').hide();
    $('.coffe_menu').hide();
});
$('.btn_addWater').mousedown(function(){
    $('.btn_addWater').css('box-shadow', '0px 0px 4px rgba(0, 0, 0, 0.50)')
});
$('.btn_addWater').mouseup(function(){
    $('.btn_addWater').css('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.50)')
});
$('.btn_addMilk').mousedown(function(){
    $('.btn_addMilk').css('box-shadow', '0px 0px 4px rgba(0, 0, 0, 0.50)')
});
$('.btn_addMilk').mouseup(function(){
    $('.btn_addMilk').css('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.50)')
});

// main function st

function CoffeMachine() {
    let db = [
        {
            name: 'americano',
            code: 0,
            needsWater: 20,
            needsMilk: 0
        },
        {
            name: 'latte',
            code: 1,
            needsWater: 0,
            needsMilk: 20
        },
        {
            name: 'hot choko',
            code: 2,
            needsWater: 0,
            needsMilk: 20
        },
        {
            name: 'expresso',
            code: 3,
            needsWater: 20,
            needsMilk: 0
        },
        {
            name: 'dark tea',
            code: 4,
            needsWater: 20,
            needsMilk: 0
        },
        {
            name: 'green tea',
            code: 5,
            needsWater: 20,
            needsMilk: 0
        },
        {
            name: 'fruit tea',
            code: 6,
            needsWater: 20,
            needsMilk: 0
        },
        {
            name: 'tea + milk',
            code: 7,
            needsWater: 10,
            needsMilk: 10
        },

    ];

    const power = 1450;
    this.waterAmount;
    this.milkAmount;
    const WATER_HEAT_CAPACITY = 4200;
    let drinkCode;
    let boilTime;
    let timerId;
    this.allLiquids;
    let runCur = true;


    let getBoilTime = function() {
        this.allLiquids = this.waterAmount + this.milkAmount;
        console.log((this.allLiquids*WATER_HEAT_CAPACITY*80/power)/1000)
        return this.allLiquids*WATER_HEAT_CAPACITY*80/power;
    }.bind(this);

    function onReady() {
        $('.menu__startBtn').css('border', '3px solid #fff');
        $('.menu__pauseBtn').css('border', '3px solid #fff');
        $('.menu_screen_choose').fadeIn();
        $('.progress_menu').hide();
        $('.liquids').css('transition', '3s')
        console.log(machine.waterAmount-=db[drinkCode].needsWater);
        console.log(machine.milkAmount-=db[drinkCode].needsMilk);
        machine.checkLiquid();
        $('.fluidFlow').fadeIn();
        let z = setTimeout(function(){
            $('.fluidFlow').fadeOut();
            // $('.cupSteam').fadeIn();
        },3000);
        let y = setTimeout(function(){
            $('.cupSteam').fadeIn();
            $('.cupImg').css('left', '-10%');
            $('.cupSteam').css('left', '-10%');
        },4000);
        let e = setTimeout(function(){
            $('.cupSteam').hide();
        },5000);
        let x = setTimeout(function(){
            $('.cupImg').css('left', '50%');
            $('.cupSteam').css('left', '50%');
        },7000)
    }
    let runSwitch;
    this.run = function() {
        if(!runCur) {
        if(db[drinkCode].needsMilk <= this.milkAmount && db[drinkCode].needsWater <= this.waterAmount) {
        runCur = true;
        $('.liquids').css('transition', '0.4s')
        $('.menu__startBtn').css('border', '3px solid #0047FF');
        $('.menu__pauseBtn').css('border', '3px solid #fff');
        runSwitch = setTimeout(onReady, getBoilTime());
        $('.progress_menu').fadeIn();
        let boilTime = getBoilTime();
        console.log(boilTime)
        function progressCount() {
            let progress = 0;
            let timePersent = boilTime / 100;
            timerId = setInterval(function() {
                if(progress < 100) {
                    progress++;
                    $('.percents__span').text(progress + '%')
                    $('.progressBar_bar').css('width', progress + '%')
                } else {
                    clearInterval(timerId);
                }
            }, timePersent)
        }
        progressCount();
        $('.startNotification_menu').hide()
        } else if(db[drinkCode].needsMilk > this.milkAmount){
            alert('You need more milk');
        } else if(db[drinkCode].needsWater > this.waterAmount) {
            alert('You need more water');
        };
    } else if(runCur) {
        alert('choose drink')
    }
        // drinkCode = null;
        // console.log(drinkCode)
    }

    this.stop = function() {
        clearTimeout(runSwitch);
        clearInterval(timerId)
            $('.menu__pauseBtn').css('border', '3px solid #0047FF');
            $('.menu__startBtn').css('border', '3px solid #fff');
    }

    this.addWater = function() {
        this.waterAmount+=10;
        $('.waterAmount').css('height', `${machine.waterAmount}%`);
    }
    this.addMilk = function(){
        this.milkAmount+=10;
        $('.milkAmount').css('height', `${machine.milkAmount}%`);
    }
    this.checkLiquid = function() {
        $('.waterAmount').css('height', `${machine.waterAmount}%`);
        $('.milkAmount').css('height', `${machine.milkAmount}%`);
    }
    this.findDrinkCode = function() {
        $('.drinkOptions').click(function(){
            runCur = false;
            drinkCode = parseInt($(this).attr('id'));
            console.log(drinkCode);
            $('.tea_menu').hide();
            $('.coffe_menu').hide();
            $('.startNotification_menu').fadeIn()
        });
    }

}

// main function end


let machine = new CoffeMachine();
machine.waterAmount = 20;
machine.milkAmount = 20;
machine.checkLiquid();
machine.findDrinkCode();

$('.btn_addWater').click(function(){
    if(machine.waterAmount < 100) {
        $('.liquids').css('transition', '0.4s');
        machine.addWater()
    }
});

$('.btn_addMilk').click(function(){
    if(machine.milkAmount < 100) {
        $('.liquids').css('transition', '0.4s');
        machine.addMilk();
    }
});

$('.menu__startBtn').click(function(){
    machine.run();
});

$('.menu__pauseBtn').click(function(){
    machine.stop();
});
















