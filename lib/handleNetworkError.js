function handleNetworkError(e) {
  if (e.response && e.response.data && e.response.data.messasge) {
    alert(e.response.data.messasge);
    return;
  }
  alert("오류가 발생했습니다. 다시 시도해주세요.");
}

export default handleNetworkError;
