import React from 'react';
import './about-project/about-project.css'

//  <p className="about-project__timeline_description">Front-end</p>
// <p className="about-project__timeline_description">Back-end</p>

const AboutProject = () => {
    return (
        <section className="about-project" id="aboutProject">
            <h2 className="about-project__main-title">О Клубе</h2>
            <div className="about-project__description">
                <div className="about-project__description_block">
                    <h3 className="about-project__description_title">Инвестирование с высокой доходностью</h3>
                    <p className="about-project__description_text">Участники Клуба имеют возможность инвестировать в приобретение антикварных предметов, чтобы получать прибыль на последующей их перепродаже </p>
                </div>
                <div className="about-project__description_block">
                    <h3 className="about-project__description_title">Систематизация уникальных знаний для роста доходности</h3>
                    <p className="about-project__description_text">Учредители клуба стремятся углублять экспертизу на рынке антиквариата и наращивать применение современных технологий для увеличения дохода всех членов Клуба</p>
                </div>
            </div>
            {
            // <div className="about-project__timeline">
            //     <div className="about-project__timeline_block-short">
            //         <div className="about-project__timeline_period-short">1 неделя</div>
            //         <p className="about-project__timeline_description">Front-end</p>                    
            //     </div>
            //     <div className="about-project__timeline_block-long">
            //         <div className="about-project__timeline_period-long"> 4 недели</div>
            //         <p className="about-project__timeline_description">Back-end</p>                   
            //     </div>
            // </div>
            }
        </section>
    )

};

export default AboutProject;