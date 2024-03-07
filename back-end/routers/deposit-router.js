const Router = require('express').Router;
const router = new Router();
const { body } = new require('express-validator');
const depositController = require('../controllers/deposit-controller');
const { DEPOSIT_VALIDATION_ERR_MSG, DEPOSIT_ENUMS, DEPOSIT_REGEX } = require('../consts/deposit');

router.post('/create_deposit_contract',
    body('contract_code').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.deposit_line_contract_code).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    body('data.deposit_interest').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).isNumeric().withMessage('Не яляется числом').isFloat({ min: 1, max: 13 }).withMessage('Выход за пределы 1-13'),
    body('data.deposit_amount').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).isCurrency({
        decimal_separator: ',',
        thousands_separator: '.'
    }).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    body('data.birthdate').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).isDate().withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    body('data.full_name').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty),
    body('data.full_name.name').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.full_name).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    body('data.full_name.surname').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.full_name).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    body('data.full_name.patronymic').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.full_name).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    body('data.passport_data').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty),
    body('data.passport_data.passport_number').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.passport_number).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    body('data.passport_data.passport_id_number').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.passport_id_number).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    depositController.createDepositContract
);
router.put('/cash_in',
    body('data.iban').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.iban).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    body('data.sum').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).isCurrency({
        decimal_separator: ',',
        thousands_separator: '.'
    }).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    depositController.cashIn
);
router.put('/cash_out',
    body('data.iban').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.iban).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    depositController.cashOut
);
router.put('/percent',
    body('data.iban').not().isEmpty().withMessage(DEPOSIT_VALIDATION_ERR_MSG.empty).matches(DEPOSIT_REGEX.iban).withMessage(DEPOSIT_VALIDATION_ERR_MSG.invalid),
    depositController.percent
);
router.put('/close_bank_day', depositController.closeBankDay);

module.exports = router;