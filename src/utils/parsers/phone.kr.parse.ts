export const phoneKrParser = (phone: string) => {
  if (phone) {
    const formatPhone = phone.replace(/[^0-9]/g, '');
    const phoneLength = formatPhone.length;
    if (phoneLength === 10) {
      return formatPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (phoneLength === 11) {
      return formatPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      return formatPhone;
    }
  }
};
