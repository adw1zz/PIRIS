import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { newClient, updateClient, getClients } from '../../services/clients-service';
import { CLIENT_REGEX_INPUT_PETTERN, CLIENT_REGEX_INPUT_PETTERN_TITLE } from "../../consts/client/client-regex";

const FormModalWindow = ({ show, data, modif }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                show(false)
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    const submitHandle = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValue = {};
        for (let pair of formData.entries()) {
            formValue[pair[0]] = pair[1]
        }
        formValue['liable'] = e.target['liable'].checked;
        formValue['retiree'] = e.target['retiree'].checked;
        data.title === 'Редактирование' ? dispatch(updateClient({...formValue, id: data.defaultData.id})) : dispatch(newClient(formValue));
        show(false);
        modif(true);
    }

    return (
        <div className="form-modal-window">
            <div className="form-modal-header">Esc - закрыть</div>
            <form onSubmit={submitHandle}>
                <div className="title"><span>{data.title}</span></div>
                <div className="form-inputs">
                    <div className="inp-overlay">
                        <label htmlFor='name'>Имя</label>
                        <input id="name" type="text" defaultValue={data.defaultData.name ? data.defaultData.name : ''} name="name" required={true} pattern={CLIENT_REGEX_INPUT_PETTERN.FCs.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.FCs}/>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='surname'>Фамилия</label>
                        <input id='surname' defaultValue={data.defaultData.surname ? data.defaultData.surname : ''} type="text" name="surname" required={true} pattern={CLIENT_REGEX_INPUT_PETTERN.FCs.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.FCs}/>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='patronymic'>Отчество</label>
                        <input id='patronymic' defaultValue={data.defaultData.patronymic ? data.defaultData.patronymic : ''} type="text" name="patronymic" required={true} pattern={CLIENT_REGEX_INPUT_PETTERN.FCs.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.FCs}/>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='birthdate'>Дата рождения</label>
                        <input type="date" defaultValue={data.defaultData.birthdate ? data.defaultData.birthdate : ''} id='birthdate' name="birthdate" required={true} />
                    </div>
                    <div className="inp-overlay-spec">
                        <div>
                            <label htmlFor="male">Муж.</label>
                            <input id='male' defaultChecked={data.defaultData.gender === 'Мужчина'} name="gender" value={'Мужчина'} type="radio" required={true}/>
                            <label htmlFor="female">Жен.</label>
                            <input id='female' defaultChecked={data.defaultData.gender === 'Женщина'} name="gender" value={'Женшщина'} type="radio" required={true} />
                        </div>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='city_of_actual_residence' >Город фактического проживания</label>
                        <select id='city_of_actual_residence' name="city_of_actual_residence" defaultValue={data.defaultData.city_of_actual_residence ? data.defaultData.city_of_actual_residence : ''} required={true}>
                            <option value=''>Выберите Город</option>
                            <option value='Минск'>Минск</option>
                            <option value='Гомель'>Гродно</option>
                            <option value='Брест'>Брест</option>
                            <option value='Витебск'>Витебск</option>
                            <option value='Гомель'>Гомель</option>
                        </select>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='address_of_the_actual_residence'>Адрес фактического проживания</label>
                        <input type="text" id='address_of_the_actual_residence' name="address_of_the_actual_residence" defaultValue={data.defaultData.address_of_the_actual_residence ? data.defaultData.address_of_the_actual_residence : ''} required={true} pattern={CLIENT_REGEX_INPUT_PETTERN.text_address.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.text_address}/>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='home_phone'>Телефон дом.</label>
                        <input type="text" id='home_phone' name="home_phone" defaultValue={data.defaultData.home_phone ? data.defaultData.home_phone : ''} required={false} pattern={CLIENT_REGEX_INPUT_PETTERN.home_phone.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.home_phone}/>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='mob_phone'>Телефон моб.</label>
                        <input type="text" id='mob_phone' name="mob_phone" defaultValue={data.defaultData.mob_phone ? data.defaultData.mob_phone : '+375'} required={false} pattern={CLIENT_REGEX_INPUT_PETTERN.mob_phone.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.mob_phone}/>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='email'>Email</label>
                        <input type="email" id='email' defaultValue={data.defaultData.email ? data.defaultData.email : ''} name="email" required={false} />
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='workplace'>Место работы</label>
                        <input type="text" id='workplace' defaultValue={data.defaultData.workplace ? data.defaultData.workplace : ''} name="workplace" pattern={CLIENT_REGEX_INPUT_PETTERN.job.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.job} required={false} />
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='post'>Должность</label>
                        <input type="text" id='post' defaultValue={data.defaultData.post ? data.defaultData.post : ''} name="post" pattern={CLIENT_REGEX_INPUT_PETTERN.job.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.job} required={false} />
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='city_of_residence'>Город прописки</label>
                        <select id='city_of_residence' name="city_of_residence" defaultValue={data.defaultData.city_of_residence ? data.defaultData.city_of_residence : ''} required={true}>
                            <option value=''>Выберите город</option>
                            <option value='Минск'>Минск</option>
                            <option value='Гродно'>Гродно</option>
                            <option value='Брест'>Брест</option>
                            <option value='Витебск'>Витебск</option>
                            <option value='Гомель'>Гомель</option>
                        </select>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='address_of_residence'>Адрес прописки</label>
                        <input type="text" id='address_of_residence' defaultValue={data.defaultData.address_of_residence ? data.defaultData.address_of_residence : ''} pattern={CLIENT_REGEX_INPUT_PETTERN.text_address.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.text_address} name="address_of_residence" required={true} />
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='marital_status'>Семейное положение</label>
                        <select id='marital_status' name="marital_status" defaultValue={data.defaultData.marital_status ? data.defaultData.marital_status : ''} required={true}>
                            <option value=''>Выберите нужное</option>
                            <option value='Женат'>Женат</option>
                            <option value='Замужем'>Замужем</option>
                            <option value='Не женат'>Не женат</option>
                            <option value='Не замужем'>Не замужем</option>
                        </select>
                    </div>
                    <div className="inp-overlay">
                        <label className="label" htmlFor='citizenship'>Гражданство</label>
                        <select id='citizenship' name="citizenship" required={true} defaultValue={data.defaultData.citizenship ? data.defaultData.citizenship : ''}>
                            <option value=''>Выберите гражданство</option>
                            <option value='РБ'>РБ</option>
                            <option value='РФ'>РФ</option>
                        </select>
                    </div>
                    <div className="inp-overlay">
                        <label htmlFor='monthly_cash_income'>Ежемесячный доход</label>
                        <input id='monthly_cash_income' type="text" defaultValue={data.defaultData.monthly_cash_income ? data.defaultData.monthly_cash_income : ''} name="monthly_cash_income" placeholder="BYN" pattern={CLIENT_REGEX_INPUT_PETTERN.money.source} title={CLIENT_REGEX_INPUT_PETTERN_TITLE.money} required={false} />
                    </div>
                    <div className="inp-overlay-spec">
                        <div>
                            <label htmlFor='liable'>Военнобязанный</label>
                            <input id='liable' type="checkbox" defaultChecked={data.defaultData.liable} name="liable" required={false} />
                        </div>
                    </div>
                    <div className="inp-overlay-spec">
                        <div>
                            <label>Пенсионер</label>
                            <input id='retiree' type="checkbox" defaultChecked={data.defaultData.retiree} name="retiree" required={false} />
                        </div>
                    </div>
                </div>
                <div className="submit-btn">
                    <button type="submit">Подтвердить</button>
                </div>
            </form>
        </div>
    )
}

export default FormModalWindow;