import React from 'react';
import { useLocation } from 'react-router-dom'

import './user-guide.css'


function UserGuide() {

    const location = useLocation();

    const textInTitle = (currentUrl) => {
        if (currentUrl == "/lots") {return 'Привет, рады тебя видеть. Все просто. Здесь представлены все лоты, в которых мы видим хороший потенциал для перепродажи. Ты можешь выбрать какой-нибудь из них. Для этого просто нажми кнопку "Инвестировать". Важно! За каждый лот мы ждем от тебя ту сумму, которая указана в поле "Инвестцена". Здесь не тот случай, когда все скидываются по чуть-чуть на каждый лот. По крайней мере - пока. Также важно, что цена продажи и доходность оценочные т.е. мы рассчитываем на них исходя из нашего опыта. В реальности сделка может быть завершена дешевле и с меньшей доходность. Мы ориентируемся на то, что ты получишь 10 - 20% с каждого лота. После нажатия кнопки "Инвестировать" лот окажется в разделе "Выбранные вами лоты". Переходи туда. Если засомневался с лотом, всегда можно отказаться до тех пор пока ты не перевел нам деньги, и мы не выкупили лот. Как это сделать смотри в разделе "Выбранные вами лоты". Твои риски - в самом крайнем случае, когда лот не перепродается дольше двух месяцев, ты можешь забрать его себе, еще ждать пока он продастся с прибылью, или мы вернем тебе деньги за него в размере инвестцены.'}
        else if (currentUrl == '/saved-lots') {return 'Здесь ты видишь выбранные тобой лоты. Теперь мы можем их выкупить и перепродать. Для этого нам необходимо получить от тебя деньги на покупку лота. Дальше всю работу мы берем на себя. Деньги можно перевести на карту Сбербанка: 4274 2700 1792 4101. Как только мы их увидим (2-4 часа), статус карточки изменится на "В работе" - это означает, что мы выкупаем лот и начинаем его перепродавать. Мы планируем продать лот в течение 1-2 месяцев, но бывают случаи и в течение 1-2 недель. После продажи лота статус карточки изменится на "Реализован" - это означает, что ты можешь получить все или часть денег (на твое усмотрение) обратно или продолжить их инвестировать в нашем Клубе. Если ты передумал - нажми "Отказаться" и лот снова попадет в общий каталог.'}
    }
    

    return (

        <div className = 'user-guide'>
            <h1 className = 'user-guide__text'>{textInTitle(location.pathname)}</h1>
        </div>
    )
    
};
export default UserGuide;