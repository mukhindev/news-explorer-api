module.exports = (slug) => {
  switch (slug) {
    case 'SERVER_ERROR': return 'На сервере произошла ошибка';
    case 'NOT_FOUND': return 'Не найдено';
    case 'WRONG_PARAMS_IN_REQUEST': return 'Неверные параметры в запросе';
    case 'WAS_CONFLICT': return 'Возник конфликт';
    case 'AUTHHORIZATION_REQUIRED': return 'Требуется авторизация';
    case 'HANDLE_NOT_FOUND': return 'Запрашиваемый ресурс не найден';
    case 'CARD_NOT_FOUND': return 'Карточка не найдена';
    case 'ALREADY_REGISTERED': return 'Пользователь уже зарегистрирован';
    case 'WRONG_LOGIN_OR_PASSWORD': return 'Неверный логин или пароль';
    case 'CANNOT_DELETE_NON_OWN_CARD': return 'Нельзя удалить чужую карточку';
    default: return slug;
  }
};
