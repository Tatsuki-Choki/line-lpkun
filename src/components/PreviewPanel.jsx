import { useState } from 'react'
import styled from 'styled-components'
import Preview from './Preview'
import Output from './Output'
import { generateLandingPageHtml } from '../utils/htmlGenerator'

const PanelContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TabContainer = styled.div`
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 2rem;
  
  @media (max-width: 640px) {
    padding: 0 1rem;
  }
`

const TabList = styled.div`
  display: flex;
  gap: 2rem;
`

const Tab = styled.button`
  padding: 1rem 0;
  background: none;
  border: none;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.active ? '#3b82f6' : '#1e293b'};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #3b82f6;
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.2s ease;
  }
`

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  
  @media (max-width: 640px) {
    padding: 1.5rem 1rem;
  }
`

const EmptyState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #94a3b8;
`

const EmptyStateContent = styled.div`
  max-width: 320px;
`

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`

const EmptyTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
`

const EmptyDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
`

const PreviewPanel = ({ data, isComplete }) => {
  const [activeTab, setActiveTab] = useState('preview')

  // HTML生成
  const generateHtml = () => {
    return generateLandingPageHtml(data)
  }

  if (!data.siteTitle && !data.name && !data.content) {
    return (
      <PanelContainer>
        <TabContainer>
          <TabList>
            <Tab active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>
              プレビュー
            </Tab>
            <Tab active={activeTab === 'code'} onClick={() => setActiveTab('code')}>
              コード
            </Tab>
          </TabList>
        </TabContainer>
        
        <ContentArea>
          <EmptyState>
            <EmptyStateContent>
              <EmptyIcon>📝</EmptyIcon>
              <EmptyTitle>まだ入力がありません</EmptyTitle>
              <EmptyDescription>
                左側のフォームに情報を入力すると、ここにプレビューが表示されます
              </EmptyDescription>
            </EmptyStateContent>
          </EmptyState>
        </ContentArea>
      </PanelContainer>
    )
  }

  return (
    <PanelContainer>
      <TabContainer>
        <TabList>
          <Tab active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>
            プレビュー
          </Tab>
          <Tab active={activeTab === 'code'} onClick={() => setActiveTab('code')}>
            コード
          </Tab>
        </TabList>
      </TabContainer>
      
      <ContentArea>
        {activeTab === 'preview' ? (
          <Preview data={data} />
        ) : (
          <Output 
            htmlContent={generateHtml()} 
            onReset={() => {}}
            hideResetButton={true}
          />
        )}
      </ContentArea>
    </PanelContainer>
  )
}

export default PreviewPanel