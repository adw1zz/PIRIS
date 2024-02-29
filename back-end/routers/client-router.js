const Router = require('express').Router;
const router = new Router();
const clientController = require('../controllers/client-controller');
const { body } = new require('express-validator');
const { CLIENT_REGEX, CLIENT_ENUMS, CLIENT_VALIDATION_ERR_MSG } = require('../consts/clients');

router.get('/get', clientController.get)
router.post('/post',
    body('data.name').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.FCs).withMessage(CLIENT_VALIDATION_ERR_MSG.name),
    body('data.surname').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.FCs).withMessage(CLIENT_VALIDATION_ERR_MSG.surname),
    body('data.patronymic').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.FCs).withMessage(CLIENT_VALIDATION_ERR_MSG.patronymic),
    body('data.birthdate').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isDate().withMessage(CLIENT_VALIDATION_ERR_MSG.birthdate),
    body('data.gender').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.gender).withMessage(CLIENT_VALIDATION_ERR_MSG.gender),
    body('data.passport_number').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.passport_number).withMessage(CLIENT_VALIDATION_ERR_MSG.passport_number),
    body('data.issued_by').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty),
    body('data.issue_date').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isDate().withMessage(CLIENT_VALIDATION_ERR_MSG.issue_date),
    body('data.passport_id_number').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.passport_id_number).withMessage(CLIENT_VALIDATION_ERR_MSG.passport_id_number),
    body('data.city_of_actual_residence').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.cities).withMessage(CLIENT_VALIDATION_ERR_MSG.cities),
    body('data.address_of_the_actual_residence').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.text_address).withMessage(CLIENT_VALIDATION_ERR_MSG.text_address),
    body('data.home_phone').optional({ checkFalsy: true }).matches(CLIENT_REGEX.home_phone).withMessage(CLIENT_VALIDATION_ERR_MSG.home_phone),
    body('data.mob_phone').optional({ checkFalsy: true }).isMobilePhone('be-BY').withMessage(CLIENT_VALIDATION_ERR_MSG.mob_phone),
    body('data.email').optional({ checkFalsy: true }).isEmail().withMessage(CLIENT_VALIDATION_ERR_MSG.email),
    body('data.workplace').optional({ checkFalsy: true }).matches(CLIENT_REGEX.job).withMessage(CLIENT_VALIDATION_ERR_MSG.workplace),
    body('data.post').optional({ checkFalsy: true }).matches(CLIENT_REGEX.job).withMessage(CLIENT_VALIDATION_ERR_MSG.post),
    body('data.city_of_residence').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.cities).withMessage(CLIENT_VALIDATION_ERR_MSG.cities),
    body('data.address_of_residence').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.text_address).withMessage(CLIENT_VALIDATION_ERR_MSG.text_address),
    body('data.marital_status').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.marital_status).withMessage(CLIENT_VALIDATION_ERR_MSG.marital_status),
    body('data.citizenship').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.citizenship).withMessage(CLIENT_VALIDATION_ERR_MSG.citizenship),
    body('data.monthly_cash_income').optional({ checkFalsy: true }).isCurrency({
        decimal_separator: ',',
        thousands_separator: '.'
    }).withMessage(CLIENT_VALIDATION_ERR_MSG.monthly_cash_income),
    body('data.liable').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isBoolean().withMessage(CLIENT_VALIDATION_ERR_MSG.liable),
    body('data.disability').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.disability).withMessage(CLIENT_VALIDATION_ERR_MSG.disability),
    body('data.retiree').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isBoolean().withMessage(CLIENT_VALIDATION_ERR_MSG.retiree),
    clientController.post
);
router.put('/put',
    body('data.name').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.FCs).withMessage(CLIENT_VALIDATION_ERR_MSG.name),
    body('data.surname').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.FCs).withMessage(CLIENT_VALIDATION_ERR_MSG.surname),
    body('data.patronymic').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.FCs).withMessage(CLIENT_VALIDATION_ERR_MSG.patronymic),
    body('data.birthdate').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isDate().withMessage(CLIENT_VALIDATION_ERR_MSG.birthdate),
    body('data.gender').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.gender).withMessage(CLIENT_VALIDATION_ERR_MSG.gender),
    body('data.passport_number').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.passport_number).withMessage(CLIENT_VALIDATION_ERR_MSG.passport_number),
    body('data.issued_by').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty),
    body('data.issue_date').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isDate().withMessage(CLIENT_VALIDATION_ERR_MSG.issue_date),
    body('data.passport_id_number').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.passport_id_number).withMessage(CLIENT_VALIDATION_ERR_MSG.passport_id_number),
    body('data.city_of_actual_residence').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.cities).withMessage(CLIENT_VALIDATION_ERR_MSG.cities),
    body('data.address_of_the_actual_residence').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.text_address).withMessage(CLIENT_VALIDATION_ERR_MSG.text_address),
    body('data.home_phone').optional({ checkFalsy: true }).matches(CLIENT_REGEX.home_phone).withMessage(CLIENT_VALIDATION_ERR_MSG.home_phone),
    body('data.mob_phone').optional({ checkFalsy: true }).isMobilePhone('be-BY').withMessage(CLIENT_VALIDATION_ERR_MSG.mob_phone),
    body('data.email').optional({ checkFalsy: true }).isEmail().withMessage(CLIENT_VALIDATION_ERR_MSG.email),
    body('data.workplace').optional({ checkFalsy: true }).matches(CLIENT_REGEX.job).withMessage(CLIENT_VALIDATION_ERR_MSG.workplace),
    body('data.post').optional({ checkFalsy: true }).matches(CLIENT_REGEX.job).withMessage(CLIENT_VALIDATION_ERR_MSG.post),
    body('data.city_of_residence').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.cities).withMessage(CLIENT_VALIDATION_ERR_MSG.cities),
    body('data.address_of_residence').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).matches(CLIENT_REGEX.text_address).withMessage(CLIENT_VALIDATION_ERR_MSG.text_address),
    body('data.marital_status').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.marital_status).withMessage(CLIENT_VALIDATION_ERR_MSG.marital_status),
    body('data.citizenship').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.citizenship).withMessage(CLIENT_VALIDATION_ERR_MSG.citizenship),
    body('data.monthly_cash_income').optional({ checkFalsy: true }).isCurrency({
        decimal_separator: ',',
        thousands_separator: '.'
    }).withMessage(CLIENT_VALIDATION_ERR_MSG.monthly_cash_income),
    body('data.liable').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isBoolean().withMessage(CLIENT_VALIDATION_ERR_MSG.liable),
    body('data.disability').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isIn(CLIENT_ENUMS.disability).withMessage(CLIENT_VALIDATION_ERR_MSG.disability),
    body('data.retiree').not().isEmpty().withMessage(CLIENT_VALIDATION_ERR_MSG.empty).isBoolean().withMessage(CLIENT_VALIDATION_ERR_MSG.retiree),
    clientController.put)
router.delete('/delete',
    body('data.ids').custom((value) => {
        if (!Array.isArray(value)) {
            throw new Error(CLIENT_VALIDATION_ERR_MSG.type + 'array');
        } else if (value.length < 1) {
            throw new Error(CLIENT_VALIDATION_ERR_MSG.empty);
        }
        return true;
    }),
    clientController.delete
)

module.exports = router;