import { useState } from 'react'
import styled from 'styled-components'

const OutputContainer = styled.div`
  width: 100%;
`

const OutputTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1e293b;
`

const CodeBlock = styled.pre`
  background-color: #1e293b;
  color: #e2e8f0;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.5rem;
  overflow-x: auto;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  max-height: none;
  overflow-y: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const CopyButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

const DownloadButton = styled(Button)`
  background-color: #0084ff;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #0073e6;
  }
`

const ResetButton = styled(Button)`
  background-color: #ff4444;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #e63939;
  }
`

const Message = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  background-color: #06C755;
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`

const Output = ({ htmlContent, onReset, hideResetButton }) => {
  const [showMessage, setShowMessage] = useState(false)
  
  const displayHtml = htmlContent || `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>生成されたランディングページ</title>
</head>
<body>
    <h1>生成されたコンテンツ</h1>
    <p>ここに生成されたHTMLが表示されます</p>
</body>
</html>`

  const handleCopy = () => {
    navigator.clipboard.writeText(displayHtml)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  const handleDownload = () => {
    const blob = new Blob([displayHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'landing-page.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <OutputContainer>
      <OutputTitle>生成されたHTML</OutputTitle>
      <CodeBlock>{displayHtml}</CodeBlock>
      
      <ButtonGroup>
        <CopyButton onClick={handleCopy}>
          コピー
        </CopyButton>
        <DownloadButton onClick={handleDownload}>
          ダウンロード
        </DownloadButton>
        {!hideResetButton && (
          <ResetButton onClick={onReset}>
            最初からやり直す
          </ResetButton>
        )}
      </ButtonGroup>

      {showMessage && <Message>コピーしました！</Message>}
    </OutputContainer>
  )
}

export default Output