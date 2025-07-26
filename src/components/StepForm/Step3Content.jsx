import { useRef } from 'react'
import styled from 'styled-components'

const StepContainer = styled.div`
  min-height: 300px;
`

const StepTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
  letter-spacing: -0.025em;
`

const StepDescription = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 0.9375rem;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 0.875rem 1rem;
  font-size: 0.9375rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  line-height: 1.6;
  
  &:hover {
    border-color: #cbd5e1;
    background-color: white;
  }
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`

const FileUploadArea = styled.div`
  margin-top: 1.5rem;
  padding: 2rem;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  text-align: center;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #cbd5e1;
    background-color: #f1f5f9;
  }
`

const FileInput = styled.input`
  display: none;
`

const UploadButton = styled.label`
  display: inline-block;
  padding: 0.625rem 1.25rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const FileInfo = styled.p`
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  color: #94a3b8;
  font-weight: 500;
`

const Step3Content = ({ value, onChange }) => {
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        onChange(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  return (
    <StepContainer>
      <StepTitle>ステップ 3: 本文</StepTitle>
      <StepDescription>
        ランディングページの本文を入力してください。
        テキストファイル（.txt）からの読み込みも可能です。
      </StepDescription>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ここに本文を入力してください...

段落分けには空行を使用してください。
・箇条書きも使用可能です
・**強調**したい部分は**で囲んでください"
      />
      <FileUploadArea>
        <FileInput
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          id="file-upload"
        />
        <UploadButton htmlFor="file-upload">
          テキストファイルを選択
        </UploadButton>
        <FileInfo>対応形式: .txt</FileInfo>
      </FileUploadArea>
    </StepContainer>
  )
}

export default Step3Content