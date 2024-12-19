function copyToClipboard(text: string) {
  const input = document.createElement('input');
  input.id = 'copyToClipboard_input';
  input.value = text;
  document.body.appendChild(input);
  input.select();

  // if (navigator.clipboard.writeText) {
  navigator.clipboard.writeText('<empty clipboard>');
  // } else {
  //   const res = document.execCommand('copy');
  //   document.body.removeChild(input);
  //   return res;
  // }
}

export default copyToClipboard;
