import React from "react";

const FormModalWindow = ({ callback, title, defualtValue }) => {
    return (
        <div className="form-modal-window">
            <form>
                <div className="title"><span>Title</span></div>
                <div className="form-inputs">
                    <div className="inp-overlay">
                        <label for='name'>Имя</label>
                        <input id="name" type="text" name="name" required={true} />
                    </div>
                    <div className="inp-overlay">
                        <label for='surname'>Фамилия</label>
                        <input id='surname' type="text" name="surname" required={true} />
                    </div>
                    <div className="inp-overlay">
                        <label for='patronymic'>Отчество</label>
                        <input id='patronymic' type="text" name="patronymic" required={true} />
                    </div>
                    <div className="inp-overlay">
                        <label for='birthdate'>Дата рождения</label>
                        <input type="date" id='birthdate' name="birthdate" required={true} />
                    </div>
                    <div className="inp-overlay">
                        <label for="male">Муж.</label>
                        <input id='male' name="gender" value={'Мужчина'} type="radio" />
                        <label for="female">Жен.</label>
                        <input id='female' name="gender" value={'Мужчина'} type="radio" />
                    </div>
                    <div className="inp-overlay">
                        <label for='city_of_actual_residence' >Город фактического проживания</label>
                        <select id='city_of_actual_residence' name="city_of_actual_residence" required={true}>
                            <option value=''>Выберите Город</option>
                            <option value='Минск'>Минск</option>
                            <option value='Гомель'>Гродно</option>
                            <option value='Брест'>Брест</option>
                            <option value='Витебск'>Витебск</option>
                            <option value='Гомель'>Гомель</option>
                        </select>
                    </div>
                    <div className="inp-overlay">
                        <label for='address_of_the_actual_residence'>Адрес фактического проживания</label>
                        <input type="text" id='address_of_the_actual_residence' name="address_of_the_actual_residence" required={true} />
                    </div>
                    <div className="inp-overlay">
                        <label for='home_phone'>Телефон дом.</label>
                        <input type="text" id='home_phone' name="home_phone" required={false} maxLength={7} minLength={7} />
                    </div>
                    <div className="inp-overlay">
                        <label for='mob_phone'>Телефон моб.</label>
                        <input type="text" id='mob_phone' name="mob_phone" placeholder="+375..." required={false} maxLength={13} minLength={13} pattern="\\+375.*" />
                    </div>
                    <div className="inp-overlay">
                        <label for='email'>Email</label>
                        <input type="email" id='email' name="email" required={false} />
                    </div>
                    <div className="inp-overlay">
                        <label for='workplace'>Место работы</label>
                        <input type="text" id='workplace' name="workplace" required={false} />
                    </div>
                    <div className="inp-overlay">
                        <label for='post'>Должность</label>
                        <input type="text" id='post' name="post" required={false} />
                    </div>
                    <div className="inp-overlay">
                        <label for='city_of_residence'>Город прописки</label>
                        <select id='city_of_residence' name="city_of_residence" required={true}>
                            <option value=''>Выберите город</option>
                            <option value='Миинск'>Минск</option>
                            <option value='Гродно'>Гродно</option>
                            <option value='Брест'>Брест</option>
                            <option value='Витебск'>Витебск</option>
                            <option value='Гомель'>Гомель</option>
                        </select>
                    </div>
                    <div className="inp-overlay">
                        <label for='address_of_residence"'>Адрес прописки</label>
                        <input type="text" id='address_of_residence"' name="address_of_residence" required={true} />
                    </div>
                    <div className="inp-overlay">
                        <label for='marital_status'>Семейное положение</label>
                        <select id='marital_status' name="marital_status" required={true}>
                            <option value=''>Выберите нужное</option>
                            <option value='Женат'>Женат</option>
                            <option value='Замужем'>Замужем</option>
                            <option value='Не женат'>Не женат</option>
                            <option value='Не замужем'>Не замужем</option>
                        </select>
                    </div>
                    <div className="inp-overlay">
                        <label className="label" for='citizenship'>Гражданство</label>
                        <select id='citizenship' name="citizenship" required={true}>
                            <option value=''>Выберите гражданство</option>
                            <option value='РБ'>РБ</option>
                            <option value='РФ'>РФ</option>
                        </select>
                    </div>
                    <div className="inp-overlay">
                        <label for='monthly_cash_income'>Ежемесячный доход</label>
                        <input id='monthly_cash_income' type="text" name="monthly_cash_income" placeholder="BYN" required={false} />
                    </div>
                    <div className="inp-overlay">
                        <label for='liable'>Военнобязанный</label>
                        <input id='liable' type="checkbox" name="liable" required={false} />
                    </div>
                    <div className="inp-overlay">
                        <label>Пенсионер</label>
                        <input id='retiree' type="checkbox" name="retiree" required={true} />
                    </div>
                </div>
                <div className="submit-btn">
                    <button>Подтвердить</button>
                </div>
            </form>
        </div>
    )
}

export default FormModalWindow;