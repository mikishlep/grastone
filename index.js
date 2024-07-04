const accordion = document.querySelectorAll(".content-box");

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.classList.toggle('active');
    })
}

// const connection = document.querySelector(".form-button");
// connection.addEventListener('click', function () {
//     alert('Спасибо, заявка отправлена! Присоединяйтесь к нам в группу ВК и Телеграм!');
// })

// ТЕЛЕГРАМ ОТПРАВКА

const TELEGRAM_BOT_TOKEN = '6933058501:AAHX7642eIYfLtMbd1Rq09CXhfAmWZ3Ldbo';
const TELEGRAM_CHAT_ID = '@grastone_feedback';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formButton = document.querySelector('.form-button button');

    // const formData = new FormData(form);
    // const formDataObject = Object.fromEntries(formData.entries());
    // console.log(formDataObject);

    const { name, number, theme, message } = Object.fromEntries(new FormData(form).entries());

    const text = `Пришла заявка от ${name}!\nНомер телефона: ${number}\nТема: ${theme}\nСообщение: ${message}\n\nПожалуйста, дайте обратную связь в ближайшее время!`;

    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,

            })
        });

        if (response.ok) {
            alert('Спасибо, заявка отправлена! Присоединяйтесь к нам в группу ВК и Телеграм!');
            form.reset();
        } else {
            alert('Ой ой, что то пошло не так!');

            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error();
    }
}
