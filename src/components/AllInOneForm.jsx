import { useState, useRef } from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
  width: 100%;
`

const Section = styled.section`
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SectionNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #3b82f6;
  color: white;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 500;
`

const SectionDescription = styled.p`
  color: #64748b;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.75rem 1rem;
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

const CharCount = styled.div`
  text-align: right;
  color: #94a3b8;
  font-size: 0.75rem;
  margin-top: 0.5rem;
`

const FileUploadArea = styled.div`
  margin-top: 1rem;
`

const FileUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const UploadButton = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
`

const FileInput = styled.input`
  display: none;
`

const FileInfo = styled.p`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
  line-height: 1.4;
  
  br {
    display: block;
    content: "";
    margin: 0.2rem 0;
  }
`

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const NameInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const IconImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
`

const InitialCircle = styled.div`
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
`

const RemoveButton = styled.button`
  padding: 0.25rem 0.75rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #dc2626;
  }
`

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const InputWrapper = styled.div`
  flex: 1;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #475569;
  font-size: 0.875rem;
`

const SingleInputWrapper = styled.div`
  margin-bottom: 1rem;
`

const GenerateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 3rem;
  
  &:hover:not(:disabled) {
    background-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PreviewText = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f1f5f9;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #64748b;
  text-align: center;
  
  strong {
    color: #1e293b;
  }
`

const BlurredText = styled.div`
  color: #64748b;
  line-height: 1.6;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 25%,
      rgba(255, 255, 255, 0.4) 40%,
      rgba(255, 255, 255, 0.8) 60%,
      rgba(255, 255, 255, 0.95) 80%,
      white 100%
    );
    pointer-events: none;
  }
`

const AllInOneForm = ({ formData, onUpdate, onComplete, isComplete, onReset }) => {
  const [iconFile, setIconFile] = useState(null)
  const [iconPreview, setIconPreview] = useState(null)
  const [iconError, setIconError] = useState('')
  const [contentFile, setContentFile] = useState(null)
  const fileInputRef = useRef(null)
  const iconInputRef = useRef(null)

  const updateField = (field, value) => {
    onUpdate({
      ...formData,
      [field]: value
    })
  }

  const handleIconUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // ファイルサイズチェック（2MB）
      if (file.size > 2 * 1024 * 1024) {
        setIconError('画像サイズは2MB以下にしてください')
        return
      }
      
      // ファイルタイプチェック
      if (!file.type.startsWith('image/')) {
        setIconError('画像ファイルを選択してください')
        return
      }
      
      setIconError('')
      setIconFile(file)
      
      // プレビュー生成
      const reader = new FileReader()
      reader.onload = (e) => {
        setIconPreview(e.target.result)
        updateField('iconImage', e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeIcon = () => {
    setIconFile(null)
    setIconPreview(null)
    updateField('iconImage', null)
    if (iconInputRef.current) {
      iconInputRef.current.value = ''
    }
  }

  const handleContentFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateField('content', e.target.result)
      }
      reader.readAsText(file)
      setContentFile(file)
    }
  }

  const getInitial = (name) => {
    return name.length > 0 ? name.charAt(0).toUpperCase() : ''
  }

  const isFormValid = () => {
    return formData.siteTitle && 
           formData.name && 
           formData.content && 
           formData.blurContent && 
           formData.lineUrl && 
           formData.unpublishedNum1 && 
           formData.unpublishedNum2
  }

  if (isComplete) {
    return (
      <FormContainer>
        <Section>
          <SectionTitle>
            ✅ 生成完了
          </SectionTitle>
          <SectionDescription>
            ランディングページの生成が完了しました。右側のプレビューとコードをご確認ください。
          </SectionDescription>
          <GenerateButton onClick={onReset}>
            最初からやり直す
          </GenerateButton>
        </Section>
      </FormContainer>
    )
  }

  return (
    <FormContainer>
      <Section>
        <SectionTitle>
          <SectionNumber>1</SectionNumber>
          サイトタイトル
        </SectionTitle>
        <Input
          type="text"
          value={formData.siteTitle}
          onChange={(e) => updateField('siteTitle', e.target.value)}
          placeholder="例: LINE集客の極意"
          maxLength={100}
        />
        <CharCount>{formData.siteTitle.length} / 100</CharCount>
      </Section>

      <Section>
        <SectionTitle>
          <SectionNumber>2</SectionNumber>
          お名前とアイコン
        </SectionTitle>
        <NameInputWrapper>
          {iconPreview ? (
            <IconImage src={iconPreview} alt="アイコン" />
          ) : (
            <InitialCircle>{getInitial(formData.name)}</InitialCircle>
          )}
          <div style={{ flex: 1 }}>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="例: 田中太郎"
              maxLength={50}
            />
            <CharCount>{formData.name.length} / 50</CharCount>
          </div>
        </NameInputWrapper>
        
        <FileUploadWrapper>
          <FileInput
            ref={iconInputRef}
            type="file"
            accept="image/*"
            onChange={handleIconUpload}
            id="icon-upload"
          />
          <UploadButton htmlFor="icon-upload">
            画像を選択
          </UploadButton>
          <FileInfo>
            対応形式:<br />
            JPG, PNG, GIF, WebP, BMP<br />
            SVG（最大2MB）
          </FileInfo>
          {iconPreview && (
            <RemoveButton onClick={removeIcon}>削除</RemoveButton>
          )}
        </FileUploadWrapper>
        
        {iconError && <ErrorMessage>{iconError}</ErrorMessage>}
      </Section>

      <Section>
        <SectionTitle>
          <SectionNumber>3</SectionNumber>
          本文
        </SectionTitle>
        <SectionDescription>
          ランディングページの本文を入力してください。テキストファイルからの読み込みも可能です
        </SectionDescription>
        <TextArea
          value={formData.content}
          onChange={(e) => updateField('content', e.target.value)}
          placeholder="ここに本文を入力してください...

段落分けには空行を使用してください。
・箇条書きも使用可能です
・**強調**したい部分は**で囲んでください"
          style={{ minHeight: '200px' }}
        />
        
        <FileUploadArea>
          <FileUploadWrapper>
            <FileInput
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleContentFileUpload}
              id="content-upload"
            />
            <UploadButton htmlFor="content-upload">
              テキストファイルを選択
            </UploadButton>
            <FileInfo>対応形式: .txt</FileInfo>
          </FileUploadWrapper>
        </FileUploadArea>
      </Section>

      <Section>
        <SectionTitle>
          <SectionNumber>4</SectionNumber>
          ぼかし文章
        </SectionTitle>
        <SectionDescription>
          LINE登録後に公開される部分のプレビューとして表示される文章を入力してください
        </SectionDescription>
        <TextArea
          value={formData.blurContent}
          onChange={(e) => updateField('blurContent', e.target.value)}
          placeholder="例: 実は、LINE集客で成功するためには、誰も教えてくれない3つの秘密があります..."
        />
        {formData.blurContent && (
          <BlurredText>
            {formData.blurContent.split('\n').map((line, index) => (
              <div key={index} style={{
                filter: index === 0 ? 'none' : 
                       index === 1 ? 'blur(2px)' : 
                       'blur(6px)',
                marginBottom: '0.5rem'
              }}>
                {line || '\u00A0'}
              </div>
            ))}
          </BlurredText>
        )}
      </Section>

      <Section>
        <SectionTitle>
          <SectionNumber>5</SectionNumber>
          LINE友達追加URL
        </SectionTitle>
        <SectionDescription>
          LINE公式アカウントの友達追加URLを入力してください
        </SectionDescription>
        <Input
          type="url"
          value={formData.lineUrl}
          onChange={(e) => updateField('lineUrl', e.target.value)}
          placeholder="例: https://line.me/R/ti/p/@abc123"
        />
      </Section>

      <Section>
        <SectionTitle>
          <SectionNumber>6</SectionNumber>
          未公開情報の詳細
        </SectionTitle>
        <SectionDescription>
          ぼかし文章の下に表示される情報を入力してください
        </SectionDescription>
        
        <SingleInputWrapper>
          <Label>文字数</Label>
          <Input
            type="number"
            value={formData.unpublishedNum1}
            onChange={(e) => updateField('unpublishedNum1', e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="例: 2000"
            min="0"
          />
        </SingleInputWrapper>
        
        <SingleInputWrapper>
          <Label>画像の枚数</Label>
          <Input
            type="number"
            value={formData.unpublishedNum2}
            onChange={(e) => updateField('unpublishedNum2', e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="例: 5"
            min="0"
          />
        </SingleInputWrapper>
        
        {formData.unpublishedNum1 && formData.unpublishedNum2 && (
          <PreviewText>
            表示例: <strong>続きは{formData.unpublishedNum1}文字 + 画像{formData.unpublishedNum2}枚</strong>
          </PreviewText>
        )}
      </Section>

      <GenerateButton 
        onClick={() => onComplete(formData)} 
        disabled={!isFormValid()}
      >
        ランディングページを生成する
      </GenerateButton>
    </FormContainer>
  )
}

export default AllInOneForm