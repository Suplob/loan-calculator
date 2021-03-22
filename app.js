

document.getElementById('loan-form').addEventListener('submit', (e)=>{
    document.querySelector('.results').style.display = 'none';

    document.getElementById('loading').style.display= 'block';

    setTimeout(calculateResult, 800);

    e.preventDefault();
});

function calculateResult(){
   
    
    const amount = document.getElementById('amount');
    const years = document.getElementById('years');
    const interest = document.getElementById('interest');
    const monthlyPayment = document.getElementById('monthly-payment'); 
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100/12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const a = Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly = (principal * a * calculatedInterest) / (a-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly *calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)- principal).toFixed(2);

        document.querySelector('.results').style.display = 'block';
        document.getElementById('loading').style.display= 'none';


    }else{
        error('Check Your Number');
    }

        function error(error){
            document.querySelector('.results').style.display = 'none';
            document.getElementById('loading').style.display= 'none';

            const card = document.querySelector(".card");
            const heading = document.querySelector('.heading');


            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger';
            errorDiv.appendChild(document.createTextNode(error));
            card.insertBefore(errorDiv, heading);

            const errorCancel = document.createElement('i');
            errorCancel.className = 'float-right';
            errorCancel.innerHTML = '<i class="far fa-times-circle" style="cursor:pointer;"></i>';
            errorDiv.appendChild(errorCancel);

            errorCancel.addEventListener('click', ()=>{
                errorDiv.remove();
            })
        }


}