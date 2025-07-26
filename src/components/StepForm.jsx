import { useState } from 'react'
import styled from 'styled-components'
import Step1Title from './StepForm/Step1Title'
import Step2Name from './StepForm/Step2Name'
import Step3Content from './StepForm/Step3Content'
import Step4Blur from './StepForm/Step4Blur'
import Step5LineUrl from './StepForm/Step5LineUrl'
import Step6Metadata from './StepForm/Step6Metadata'

const FormContainer = styled.div`
  width: 100%;
`

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 0.75rem;
`

const StepDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#3b82f6' : '#e2e8f0'};
  transition: all 0.3s ease;
  
  ${props => props.active && `
    transform: scale(1.2);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  `}
`

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  gap: 1rem;
`

const Button = styled.button`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`

const BackButton = styled(Button)`
  background-color: #f1f5f9;
  color: #475569;
  
  &:hover:not(:disabled) {
    background-color: #e2e8f0;
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

const NextButton = styled(Button)`
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

const StepForm = ({ initialData, onComplete, onUpdate, isComplete, onReset }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialData)

  const updateFormData = (field, value) => {
    const newData = {
      ...formData,
      [field]: value
    }
    setFormData(newData)
    if (onUpdate) {
      onUpdate(newData)
    }
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.siteTitle.trim().length > 0
      case 2:
        return formData.name.trim().length > 0
      case 3:
        return formData.content.trim().length > 0
      case 4:
        return formData.blurContent.trim().length > 0
      case 5:
        return formData.lineUrl.trim().length > 0
      case 6:
        return formData.unpublishedNum1 !== '' && formData.unpublishedNum2 !== ''
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Title value={formData.siteTitle} onChange={(value) => updateFormData('siteTitle', value)} />
      case 2:
        return <Step2Name value={formData.name} onChange={(value) => updateFormData('name', value)} />
      case 3:
        return <Step3Content value={formData.content} onChange={(value) => updateFormData('content', value)} />
      case 4:
        return <Step4Blur value={formData.blurContent} onChange={(value) => updateFormData('blurContent', value)} />
      case 5:
        return <Step5LineUrl value={formData.lineUrl} onChange={(value) => updateFormData('lineUrl', value)} />
      case 6:
        return <Step6Metadata 
          num1={formData.unpublishedNum1} 
          num2={formData.unpublishedNum2}
          onChangeNum1={(value) => updateFormData('unpublishedNum1', value)}
          onChangeNum2={(value) => updateFormData('unpublishedNum2', value)}
        />
      default:
        return null
    }
  }

  return (
    <FormContainer>
      <StepIndicator>
        {[1, 2, 3, 4, 5, 6].map(step => (
          <StepDot key={step} active={step <= currentStep} />
        ))}
      </StepIndicator>

      {renderStep()}

      <NavigationButtons>
        {isComplete ? (
          <NextButton onClick={onReset} style={{ width: '100%' }}>
            最初からやり直す
          </NextButton>
        ) : (
          <>
            <BackButton onClick={handleBack} disabled={currentStep === 1}>
              戻る
            </BackButton>
            <NextButton onClick={handleNext} disabled={!isStepValid()}>
              {currentStep === 6 ? '生成する' : '次へ'}
            </NextButton>
          </>
        )}
      </NavigationButtons>
    </FormContainer>
  )
}

export default StepForm