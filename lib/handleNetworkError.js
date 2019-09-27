function handleNetworkError(e) {
  if (e.response && e.response.data && e.response.data.error) {
    alert(e.response.data.error);
    return;
  }
  alert("오류가 발생했습니다. 다시 시도해주세요.");
}

export default handleNetworkError;
