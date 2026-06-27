// =================================
// Spanish GPA Pro V2
// Year Calculator
// =================================



const term1GPA =
parseFloat(localStorage.getItem("term1_gpa")) || 0;


const term2GPA =
parseFloat(localStorage.getItem("term2_gpa")) || 0;



// عرض الترمين

document.getElementById("term1").textContent =
term1GPA.toFixed(2);


document.getElementById("term2").textContent =
term2GPA.toFixed(2);




// الساعات المعتمدة

const term1Hours = 16;

const term2Hours = 18;





// حساب المعدل السنوي

const yearGPA =
((term1GPA * term1Hours) + 
(term2GPA * term2Hours))
/
(term1Hours + term2Hours);





document.getElementById("yearGpa").textContent =
yearGPA.toFixed(2);






// التقدير النهائي

function getYearGrade(gpa){


    if(gpa >= 4)
        return "A";


    if(gpa >= 3.7)
        return "A-";


    if(gpa >= 3.3)
        return "B+";


    if(gpa >= 3)
        return "B";


    if(gpa >= 2.7)
        return "B-";


    if(gpa >= 2.3)
        return "C+";


    if(gpa >= 2)
        return "C";


    if(gpa >= 1.3)
        return "D+";


    if(gpa >= 1)
        return "D";


    return "F";

}




document.getElementById("finalGrade").textContent =
getYearGrade(yearGPA);
