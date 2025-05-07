let dayBox = document.getElementById("sm-day-box");
let hrBox = document.getElementById("sm-hr-box");
let minBox = document.getElementById("sm-min-box");
let secBox = document.getElementById("sm-sec-box");
let endTime = 0;
function setMonthCalendar(year, month, day) {
    let monthDays = new Date(year, month + 1, 0).getDate(),
        monthPrefix = new Date(year, month, 0).getDay(),
        monthDaysText = '';


    let dweeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    for (let i = 0; i < 7; i++) {
        monthDaysText += '<span class="sm-cal__weekday">' + dweeks[i] + '</span>';
    }

    if (monthPrefix > 0) {
        for (let i = 1; i <= monthPrefix; i++) {
            monthDaysText += '<span></span>';
        }
    }

    for (let i = 1; i <= monthDays; i++) {
        monthDaysText += '<span ' + ((i == day) ? 'class="sm-wedding"' : '') + '>' + i + '</span>';
    }

    $('.sm-cal__body').html(monthDaysText);
}
function countdown() {
    let todayDate = new Date();
    let todayTime = todayDate.getTime();
    let remainingTime = endTime - todayTime;
    let oneMin = 60 * 1000;
    let oneHr = 60 * oneMin;
    let oneDay = 24 * oneHr;

    let addZeroes = (num) => (num < 10 ? `0${num}` : num);

    if (endTime < todayTime) {
        clearInterval(i);
        dayBox.textContent = addZeroes(0);
        hrBox.textContent = addZeroes(0);
        minBox.textContent = addZeroes(0);
        secBox.textContent = addZeroes(0);
    } else {
        let daysLeft = Math.floor(remainingTime / oneDay);
        let hrsLeft = Math.floor((remainingTime % oneDay) / oneHr);
        let minsLeft = Math.floor((remainingTime % oneHr) / oneMin);
        let secsLeft = Math.floor((remainingTime % oneMin) / 1000);

        dayBox.textContent = addZeroes(daysLeft);
        hrBox.textContent = addZeroes(hrsLeft);
        minBox.textContent = addZeroes(minsLeft);
        secBox.textContent = addZeroes(secsLeft);
    }
}

let i;

function slResize(){
    if($(window).width() < 450){
        if(!$('.sm-hero__gallery').hasClass('slick-initialized')) {
            $('.sm-hero__gallery').slick({
                dots: false,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                prevArrow: "<div class='sm-sl-arrow sm-prev'></div>",
                nextArrow: "<div class='sm-sl-arrow sm-next'></div>",
            })
        }
    } else {
        if($('.sm-hero__gallery').hasClass('slick-initialized')){
            $('.sm-hero__gallery').slick('unslick')
        }

    }
}

function startAll(){
    slResize()
    i = setInterval(countdown, 1000);
    var date =$(".sm-hero__gallery span[data-sm-text='MAIN_DATE']").text().split('.')
    var j = 0;
    $('.sm-hero__gallery .sm-img-wrapp').each(function (){
        $(this).find('span').text(date[j])
        if (j == 2){
            $(this).find('span').text(date[j].substring(2,4))
        }
        j++
    })

    var year = new Date().getFullYear();
    var month = 9;
    var day = 23;
    var nd = parent.d_mdate;
    if(nd != '')
    {
        nd = parent.d_mdate.split('.');
        if(nd.length >= 3 && nd[2] >= new Date().getFullYear()) {
            year = nd[2];
            month = Number(nd[1]) - 1;
            day = nd[0]
        }
    }

    const endDate = new Date(year,month,day);
    endTime = endDate.getTime();

    countdown();
    setMonthCalendar(year,month,day)
}

// $("#sm-form").submit(function(e) {
//
//     e.preventDefault();
//
//     var form = $(this);
//     $.ajax({
//         type: "POST",
//         url: '',
//         data: form.serialize(),
//         success: function(data)
//         {
//             document.querySelector('.sm-modal').classList.add('sm-active');
//             document.body.style.overflow = 'hidden';
//         }
//     });
// });

function thankYou(){
    document.querySelector('.sm-modal').classList.add('sm-active');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){window.location.reload();},3000)
}

jQuery(document).ready(function() {
    jQuery("a.scrollto").click(function () {
        let as = document.querySelectorAll('.scrollto');
        this.remove();
        elementClick = jQuery(this).attr("href")
        destination = jQuery(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
        return false;
    });
});

let closeBtn = document.querySelector('.sm-modal__cross');

closeBtn.addEventListener('click', function(e) {
    document.querySelector('.sm-modal').classList.remove('sm-active');
    document.body.style.overflow = '';
});


$( window ).on( "resize", function() {
    slResize()
})