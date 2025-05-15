export function generateEmailTemplate({
  senderEmail,
  numberOfFiles,
  link,
  message,
  fileSize
}: {
  senderEmail: string;
  numberOfFiles: number;
  link: string;
  message: string;
  fileSize: number
}) {
  return `
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Files Shared via GigaSend</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
              color: #333333;
          }
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
              background-color: #f8f8f8;
              text-align: center;
              padding: 20px;
              border-bottom: 1px solid #eeeeee;
          }
          .logo {
              width: 180px;
              height: auto;
          }
          .email-content {
              padding: 30px;
          }
          .email-footer {
              background-color: #f8f8f8;
              text-align: center;
              padding: 15px;
              font-size: 12px;
              color: #777777;
              border-top: 1px solid #eeeeee;
          }
          h1 {
              color: #333333;
              font-size: 22px;
              margin-top: 0;
              font-weight: 600;
          }
          .sender-info {
              background-color: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
              border-left: 4px solid #0d6efd;
          }
          .file-count {
              font-weight: 600;
              margin-bottom: 20px;
              color: #333333;
          }
          .files-container {
              margin-bottom: 25px;
          }
          .file-item {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              padding: 12px 20px;
              background-color: #f8f9fa;
              border-radius: 8px;
              transition: all 0.2s ease;
          }
          .file-item:hover {
              background-color: #f1f3f5;
          }
          .file-icon {
              margin-right: 15px;
              color: #0d6efd;
          }
          .file-size {
              font-size: 14px;
              color: #777777;
              margin-right: auto;
          }
          .download-button {
              background-color: #0d6efd;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 6px;
              font-weight: 600;
              cursor: pointer;
              text-decoration: none;
              font-size: 14px;
              transition: background-color 0.2s ease;
              white-space: nowrap;
          }
          .download-button:hover {
              background-color: #0b5ed7;
          }
          .expiry-notice {
              font-size: 13px;
              background-color: #fff8e6;
              padding: 12px;
              border-radius: 8px;
              border-left: 4px solid #ffc107;
              margin-top: 25px;
          }
          .message-section {
              margin-top: 20px;
          }
          .message-section h4 {
              margin-bottom: 10px;
              color: #333333;
          }
          @media only screen and (max-width: 620px) {
              .email-container {
                  width: 100%;
                  border-radius: 0;
              }
              .email-content {
                  padding: 20px;
              }
              .file-item {
                  flex-wrap: wrap;
                  gap: 10px;
              }
              .file-size {
                  margin-right: 0;
                  flex-basis: 100%;
                  margin-left: 35px;
                  margin-top: -5px;
              }
              .download-button {
                  margin-left: auto;
                  margin-top: 10px;
              }
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <img src="https://www.gigasend.us/logo.png" alt="GigaSend" class="logo">
          </div>
          
          <div class="email-content">
              <h1>Files Shared with You</h1>
              
              <div class="sender-info">
                  <strong>From:</strong> ${senderEmail}
              </div>
              
              <div class="file-count">
                  <span>${numberOfFiles} files shared</span>
              </div>
              
              <div class="files-container">
                  <div class="file-item">
                      <div class="file-icon">
                          <img src="https://res.cloudinary.com/dj3vgnj0u/image/upload/v1747313102/yfhlce4k1h0qkjfph3xk.png" alt="file" />
                      </div>
                      <div class="file-size">${formatBytes(fileSize)}</div>
                      <a href="${link}" class="download-button" style="color:white;" target="_blank">Download</a>
                  </div>
              </div>
              
              <div class="message-section">
                  <h4>Message</h4>
                  <p>${message}</p>
              </div>
              
              <div class="expiry-notice">
                  <strong>Note:</strong> These download links will expire in 3 days. Please download your files before then.
              </div>
          </div>
          
          <div class="email-footer">
              <p>Sent securely via GigaSend</p>
              <p>&copy; 2025 GigaSend. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  
  `
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
