import React from 'react';

const FileViewerComponent = ({ base64File }) => {
  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const byteArray = new Uint8Array(Math.min(1024, byteCharacters.length - offset));
      for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = byteCharacters[offset + i].charCodeAt(0);
      }
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
  };

  const mimeType = 'application/pdf';
  const blob = base64ToBlob(base64File, mimeType);
  const fileUrl = URL.createObjectURL(blob);

  return (
    <div>
      <iframe
        src={fileUrl}
        width="100%"
        height="1000px"
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export default FileViewerComponent;