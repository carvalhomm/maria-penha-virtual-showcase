export function downloadFile(name: string, file: Blob): void {
  const url = window.URL.createObjectURL(file);
  const fileLink = document.createElement('a');
  fileLink.setAttribute('download', name);
  fileLink.setAttribute('href', url);
  fileLink.href = url;
  document.body.appendChild(fileLink);
  fileLink.click();
}
