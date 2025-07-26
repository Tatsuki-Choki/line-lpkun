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

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 0.9375rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  
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

const CharCount = styled.div`
  text-align: right;
  color: #94a3b8;
  font-size: 0.8125rem;
  margin-top: 0.75rem;
  font-weight: 500;
`

const Step1Title = ({ value, onChange }) => {
  return (
    <StepContainer>
      <StepTitle>ステップ 1: サイトタイトル</StepTitle>
      <StepDescription>
        ランディングページのタイトルを入力してください。
        これは記事のメインタイトルとして表示されます。
      </StepDescription>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例: LINE集客の極意"
        maxLength={100}
      />
      <CharCount>{value.length} / 100</CharCount>
    </StepContainer>
  )
}

export default Step1Title