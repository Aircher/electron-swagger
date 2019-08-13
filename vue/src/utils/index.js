export const copy = function (text) {
  let copyInput = document.createElement('textarea')
  copyInput.innerHTML = text
  document.body.appendChild(copyInput)
  copyInput.select()
  document.execCommand('copy')
  document.body.removeChild(copyInput)
}
