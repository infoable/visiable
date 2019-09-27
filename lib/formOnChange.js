function formOnChange(setter) {
  return e => {
    setter(e.target.value);
  };
}

export default formOnChange;
