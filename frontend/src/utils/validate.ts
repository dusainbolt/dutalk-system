export default class Validate {
  static require = (fieldName?: string) => `${fieldName} không được để trống`;

  static username = (fieldName?: string) => `${fieldName} chỉ cho phép nhập các ký tự [a-zA-Z0-9_]`;

  static email = () => `Vui lòng nhập địa chỉ email hợp lệ`;

  static min = (value: number) => `Bạn phải nhập ít nhất ${value} ký tự`;

  static _length = (value: number) => `Bạn phải nhập ${value} ký tự`;

  static during = (min: number, max: number) => `Bạn phải nhập từ ${min} đến ${max} ký tự`;

  static notMatch = (fieldName?: string) => `${fieldName} không khớp`;

  static security = (fieldName?: string) => `${fieldName} phải bao gồm cả chữ, số và ký tự đặc biệt`;

  static phone = () => `Vui lòng nhập số điện thoại hợp lệ`;

  static userOrPasswordError = `Tài khoản hoặc mật khẩu không chính xác`;

  static regexPhone =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  static regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  static unique = {
    name: 'testUnique',
    message: (fieldName?: string) => `${fieldName} đã tồn tại`,
  };
}
