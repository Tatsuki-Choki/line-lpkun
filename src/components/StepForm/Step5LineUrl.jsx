import { useState } from 'react'
import styled from 'styled-components'

const StepContainer = styled.div`
  min-height: 200px;
`

const StepTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`

const StepDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #06C755;
  }
  
  &.error {
    border-color: #ff4444;
  }
`

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const SuccessMessage = styled.div`
  color: #06C755;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const Step5LineUrl = ({ value, onChange }) => {
  const [error, setError] = useState('')

  const validateUrl = (url) => {
    if (!url) {
      setError('')
      return
    }

    try {
      const urlObj = new URL(url)
      if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
        setError('有効なURLを入力してください')
      } else if (!url.includes('line.me')) {
        setError('LINE公式アカウントのURLを入力してください')
      } else {
        setError('')
      }
    } catch {
      setError('有効なURLを入力してください')
    }
  }

  const handleChange = (e) => {
    const newValue = e.target.value
    onChange(newValue)
    validateUrl(newValue)
  }

  return (
    <StepContainer>
      <StepTitle>ステップ 5: LINE友達追加URL</StepTitle>
      <StepDescription>
        LINE公式アカウントの友達追加URLを入力してください。
        このURLがボタンのリンク先になります。
      </StepDescription>
      <Input
        type="url"
        value={value}
        onChange={handleChange}
        placeholder="例: https://line.me/R/ti/p/@abc123"
        className={error ? 'error' : ''}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && value && <SuccessMessage>✓ 有効なURLです</SuccessMessage>}
    </StepContainer>
  )
}

export default Step5LineUrl