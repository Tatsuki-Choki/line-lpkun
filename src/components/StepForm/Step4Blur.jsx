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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #06C755;
  }
`

const PreviewBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`

const BlurredText = styled.div`
  filter: blur(4px);
  color: #666;
  line-height: 1.6;
`

const Step4Blur = ({ value, onChange }) => {
  return (
    <StepContainer>
      <StepTitle>ステップ 4: ぼかし文章</StepTitle>
      <StepDescription>
        LINE登録後に公開される部分のプレビューとして表示される文章を入力してください。
        この部分は実際にぼかし処理されて表示されます。
      </StepDescription>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例: 実は、LINE集客で成功するためには、誰も教えてくれない3つの秘密があります..."
      />
      {value && (
        <PreviewBox>
          <strong>プレビュー:</strong>
          <BlurredText>{value}</BlurredText>
        </PreviewBox>
      )}
    </StepContainer>
  )
}

export default Step4Blur