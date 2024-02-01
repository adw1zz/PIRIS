const Router = require('express').Router;
const router = new Router();
const clientController = require('../controllers/client-controller');
const { body } = new require('express-validator');

router.get('/get', clientController.get)
router.post('/post',
    body('data.name').not().isEmpty().withMessage('Имя не должно быть пустым'),
    body('data.surname').not().isEmpty().withMessage('Фамилия не должна быть пустой'),
    body('data.patronymic').not().isEmpty().withMessage('Отчество не должно быть пустым'),
    body('data.birthdate').not().isEmpty().withMessage('Дата рождения не должна быть пустой').isDate().withMessage('Невалидная дата рождения'),
    body('data.gender').not().isEmpty().withMessage('Пол не должен быть пустым').isIn(['Мужчина', 'Женщина']).withMessage('Пол должен быть "Мужчина" или "Женщина"'),
    body('data.city_of_actual_residence').not().isEmpty().withMessage('Город проживания не должен быть пустым').isIn(['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель']).withMessage('Такого города нет в списке'),
    body('data.address_of_the_actual_residence').not().isEmpty().withMessage('Адрес проживания не должен быть пустым'),
    body('data.home_phone').optional({ checkFalsy: true }).isLength({ min: 7, max: 7 }).withMessage('Неверная дом. телефон'),
    body('data.mob_phone').optional({ checkFalsy: true }).isLength({ min: 13, max: 13 }).withMessage('Неверный номер').isMobilePhone('be-BY').withMessage('Должен быть действительным номером мобильного телефона в Беларуси'),
    body('data.email').optional({ checkFalsy: true }).isEmail().withMessage('Почта должны быть валидной'),
    body('data.city_of_residence').not().isEmpty().withMessage('Город прописки не должен быть пустым').isIn(['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель']).withMessage('Такого города нет в списке'),
    body('data.address_of_residence').not().isEmpty().withMessage('Адрес прописки не должен быть пустым'),
    body('data.marital_status').not().isEmpty().withMessage('Семейоное положение не должно быть пустым').isIn(['Женат', 'Замужем', 'Не женат', 'Не замужем']).withMessage('Такого в списке нет'),
    body('data.citizenship').not().isEmpty().withMessage('Гражданство не должно быть пустым').isIn(['РБ', 'РФ']).withMessage('Такого гражданства в списке нет'),
    body('data.retiree').not().isEmpty().withMessage('Статус пенсионер не должен быть пустым'),
    body('data.monthly_cash_income').optional({ checkFalsy: true }).isCurrency({
        symbol: 'Br',
        require_symbol: true,
        decimal_separator: ',',
        thousands_separator: '.'
    }).withMessage('Должна быть валдиная строка с символом Br в конце'),
    body('data.liable').not().isEmpty().withMessage('Поле военнообязаный не должно быть пустым').isBoolean().withMessage('Поле военнообязанный должно быть "true" / "false"'),
    body('data.retiree').not().isEmpty().withMessage('Поле пенсионер не должно быть пустым').isBoolean().withMessage('Поле пенсионер должно быть "true" / "false"'),
    clientController.post
);
router.put('/put',
    body('data.name').not().isEmpty().withMessage('Имя не должно быть пустым'),
    body('data.surname').not().isEmpty().withMessage('Фамилия не должна быть пустой'),
    body('data.patronymic').not().isEmpty().withMessage('Отчество не должно быть пустым'),
    body('data.birthdate').not().isEmpty().withMessage('Дата рождения не должна быть пустой').isDate().withMessage('Невалидная дата рождения'),
    body('data.gender').not().isEmpty().withMessage('Пол не должен быть пустым').isIn(['Мужчина', 'Женщина']).withMessage('Пол должен быть "Мужчина" или "Женщина"'),
    body('data.city_of_actual_residence').not().isEmpty().withMessage('Город проживания не должен быть пустым').isIn(['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель']).withMessage('Такого города нет в списке'),
    body('data.address_of_the_actual_residence').not().isEmpty().withMessage('Адрес проживания не должен быть пустым'),
    body('data.home_phone').optional({ checkFalsy: true }).isLength({ min: 7, max: 7 }).withMessage('Неверная дом. телефон'),
    body('data.mob_phone').optional({ checkFalsy: true }).isLength({ min: 13, max: 13 }).withMessage('Неверный номер').isMobilePhone('be-BY').withMessage('Должен быть действительным номером мобильного телефона в Беларуси'),
    body('data.email').optional({ checkFalsy: true }).isEmail().withMessage('Почта должны быть валидной'),
    body('data.city_of_residence').not().isEmpty().withMessage('Город прописки не должен быть пустым').isIn(['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель']).withMessage('Такого города нет в списке'),
    body('data.address_of_residence').not().isEmpty().withMessage('Адрес прописки не должен быть пустым'),
    body('data.marital_status').not().isEmpty().withMessage('Семейоное положение не должно быть пустым').isIn(['Женат', 'Замужем', 'Не женат', 'Не замужем']).withMessage('Такого в списке нет'),
    body('data.citizenship').not().isEmpty().withMessage('Гражданство не должно быть пустым').isIn(['РБ', 'РФ']).withMessage('Такого гражданства в списке нет'),
    body('data.retiree').not().isEmpty().withMessage('Статус пенсионер не должен быть пустым'),
    body('data.monthly_cash_income').optional({ checkFalsy: true }).isCurrency({
        symbol: 'Br',
        require_symbol: true,
        decimal_separator: ',',
        thousands_separator: '.'
    }).withMessage('Должна быть валдиная строка с символом Br в конце'),
    body('data.liable').not().isEmpty().withMessage('Поле военнообязаный не должно быть пустым').isBoolean().withMessage('Поле военнообязанный должно быть "true" / "false"'),
    body('data.retiree').not().isEmpty().withMessage('Поле пенсионер не должно быть пустым').isBoolean().withMessage('Поле пенсионер должно быть "true" / "false"'),
    clientController.put)
router.delete('/delete', clientController.delete)

module.exports = router;