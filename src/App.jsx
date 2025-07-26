import { useState } from 'react'
import styled from 'styled-components'
import AllInOneForm from './components/AllInOneForm'
import PreviewPanel from './components/PreviewPanel'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border-bottom: 1px solid #f1f5f9;
`

const HeaderContent = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.025em;
`

const MainLayout = styled.main`
  flex: 1;
  display: flex;
  height: calc(100vh - 65px);
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`

const LeftColumn = styled.div`
  width: 480px;
  background-color: white;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  
  @media (max-width: 1024px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
`

const LeftColumnContent = styled.div`
  padding: 2rem;
  
  @media (max-width: 640px) {
    padding: 1.5rem 1rem;
  }
`

const RightColumn = styled.div`
  flex: 1;
  background-color: #f8fafc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

function App() {
  const [formData, setFormData] = useState({
    siteTitle: '',
    name: '',
    iconImage: null,
    content: '',
    blurContent: '',
    lineUrl: '',
    unpublishedNum1: '',
    unpublishedNum2: ''
  })
  
  const [isComplete, setIsComplete] = useState(false)

  const handleFormComplete = (data) => {
    setFormData(data)
    setIsComplete(true)
  }

  const handleFormUpdate = (data) => {
    setFormData(data)
  }

  const handleReset = () => {
    setFormData({
      siteTitle: '',
      name: '',
      iconImage: null,
      content: '',
      blurContent: '',
      lineUrl: '',
      unpublishedNum1: '',
      unpublishedNum2: ''
    })
    setIsComplete(false)
  }

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Title>かんたんLINE誘導ページ作成ツール</Title>
        </HeaderContent>
      </Header>
      
      <MainLayout>
        <LeftColumn>
          <LeftColumnContent>
            <AllInOneForm 
              formData={formData}
              onComplete={handleFormComplete}
              onUpdate={handleFormUpdate}
              isComplete={isComplete}
              onReset={handleReset}
            />
          </LeftColumnContent>
        </LeftColumn>
        
        <RightColumn>
          <PreviewPanel 
            data={formData}
            isComplete={isComplete}
          />
        </RightColumn>
      </MainLayout>
    </AppContainer>
  )
}

export default App
