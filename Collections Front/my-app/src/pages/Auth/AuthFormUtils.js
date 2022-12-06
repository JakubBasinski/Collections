export const checkValidity = (field, cb) => {
  if (field.trim() === '') {
    cb();
  }
  return;
};
