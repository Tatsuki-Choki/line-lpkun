import styled from 'styled-components'

const PreviewContainer = styled.div`
  width: 100%;
`

const PreviewFrame = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  min-height: 600px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  overflow: hidden;
`

const PreviewContent = styled.div`
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  color: #333;
`

const PreviewHeader = styled.div`
  background-color: white;
  padding: 2rem;
  border-bottom: 1px solid #f1f5f9;
`

const PreviewTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.3;
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthorIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const AuthorName = styled.span`
  font-size: 1rem;
  color: #666;
`

const ContentSection = styled.div`
  padding: 2rem;
`

const FreeContent = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1rem;
  }
  
  strong {
    font-weight: 600;
    color: #1a1a1a;
  }
  
  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
`

const BlurredSection = styled.div`
  position: relative;
  padding: 2rem 0;
  margin-bottom: 0.5rem;
`

const BlurredContent = styled.div`
  position: relative;
  color: #666;
  line-height: 1.8;
  user-select: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 30%,
      rgba(255, 255, 255, 0.8) 60%,
      rgba(255, 255, 255, 0.95) 100%
    );
    z-index: 1;
  }
  
  & > * {
    filter: blur(3px);
  }
`

const PriceNote = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`

const LoginPrompt = styled.div`
  text-align: center;
  padding: 1rem 0;
`


const LoginLink = styled.a`
  display: inline-block;
  padding: 1rem 3rem;
  background-color: #06C755;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(6, 199, 85, 0.3);
  
  &:hover {
    background-color: #05a647;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(6, 199, 85, 0.4);
  }
`

const Preview = ({ data }) => {
  const getInitial = (name) => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : ''
  }

  const formatContent = (content) => {
    if (!content) return ''
    
    // 段落を分割
    const paragraphs = content.split(/\n\n+/)
    
    // 各段落を処理
    return paragraphs.map((paragraph, index) => {
      // **強調**を<strong>に変換
      let formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      
      // 箇条書きの処理
      if (formatted.startsWith('・') || formatted.startsWith('- ')) {
        const items = formatted.split('\n').filter(item => item.trim())
        const listItems = items.map(item => {
          const text = item.replace(/^[・\-]\s*/, '')
          return `<li>${text}</li>`
        }).join('')
        return <ul key={index} dangerouslySetInnerHTML={{ __html: listItems }} />
      }
      
      // 通常の段落
      return <p key={index} dangerouslySetInnerHTML={{ __html: formatted }} />
    })
  }

  return (
    <PreviewContainer>
      <PreviewFrame>
        <PreviewContent>
          <PreviewHeader>
            <PreviewTitle>{data.siteTitle || 'タイトルを入力してください'}</PreviewTitle>
            <AuthorInfo>
              <AuthorIcon>
                {data.iconImage ? (
                  <img src={data.iconImage} alt={data.name} />
                ) : (
                  getInitial(data.name)
                )}
              </AuthorIcon>
              <AuthorName>{data.name || '名前を入力してください'}</AuthorName>
            </AuthorInfo>
          </PreviewHeader>
          
          <ContentSection>
            <FreeContent>
              {formatContent(data.content)}
            </FreeContent>
            
            {data.blurContent && (
              <BlurredSection>
                <BlurredContent>
                  {data.blurContent}
                </BlurredContent>
              </BlurredSection>
            )}
            
            {(data.unpublishedNum1 || data.unpublishedNum2) && (
              <PriceNote>
                続きは{data.unpublishedNum1 || '0'}文字 + 画像{data.unpublishedNum2 || '0'}枚
              </PriceNote>
            )}
            
            <LoginPrompt>
              <LoginLink href={data.lineUrl || '#'}>
                LINE友達追加して続きを読む
              </LoginLink>
            </LoginPrompt>
          </ContentSection>
        </PreviewContent>
      </PreviewFrame>
    </PreviewContainer>
  )
}

export default Preview