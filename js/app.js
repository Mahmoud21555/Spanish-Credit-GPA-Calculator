// ===============================
// Spanish GPA Pro V2
// App Controller
// ===============================



const themeBtn = document.getElementById("themeBtn");



// تحميل الثيم المحفوظ

window.addEventListener("load",()=>{


    const savedTheme = localStorage.getItem("theme");


    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        if(themeBtn){

            themeBtn.textContent="☀️";

        }

    }


});




// تغيير الوضع

if(themeBtn){


themeBtn.addEventListener("click",()=>{


    document.body.classList.toggle("dark");



    if(document.body.classList.contains("dark")){


        localStorage.setItem("theme","dark");

        themeBtn.textContent="☀️";


    }else{


        localStorage.setItem("theme","light");

        themeBtn.textContent="🌙";


    }



});


}





// حركة ظهور العناصر

const cards=document.querySelectorAll(".main-card");



cards.forEach((card,index)=>{


    card.style.opacity="0";

    card.style.transform="translateY(40px)";



    setTimeout(()=>{


        card.style.transition="0.7s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";



    },index*200);



});
