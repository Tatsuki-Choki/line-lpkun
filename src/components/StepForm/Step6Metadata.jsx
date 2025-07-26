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

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`

const InputWrapper = styled.div`
  flex: 1;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
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
  
  &[type="number"] {
    -moz-appearance: textfield;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

const Separator = styled.span`
  font-size: 1.2rem;
  color: #666;
  padding-top: 1.5rem;
`

const PreviewText = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  
  strong {
    color: #333;
  }
`

const Step6Metadata = ({ num1, num2, onChangeNum1, onChangeNum2 }) => {
  const handleNumberChange = (value, setter) => {
    const numValue = value.replace(/[^0-9]/g, '')
    setter(numValue)
  }

  return (
    <StepContainer>
      <StepTitle>ステップ 6: 未公開情報の数</StepTitle>
      <StepDescription>
        「他〇〇人が未公開情報を手に入れています」の数字を入力してください。
        範囲を指定することで、よりリアルな表現になります。
      </StepDescription>
      
      <InputGroup>
        <InputWrapper>
          <Label>最小値</Label>
          <Input
            type="number"
            value={num1}
            onChange={(e) => handleNumberChange(e.target.value, onChangeNum1)}
            placeholder="例: 100"
            min="0"
          />
        </InputWrapper>
        
        <Separator>〜</Separator>
        
        <InputWrapper>
          <Label>最大値</Label>
          <Input
            type="number"
            value={num2}
            onChange={(e) => handleNumberChange(e.target.value, onChangeNum2)}
            placeholder="例: 200"
            min="0"
          />
        </InputWrapper>
      </InputGroup>

      {num1 && num2 && (
        <PreviewText>
          表示例: <strong>他{num1}〜{num2}人が未公開情報を手に入れています</strong>
        </PreviewText>
      )}
    </StepContainer>
  )
}

export default Step6Metadata