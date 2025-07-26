export const generateLandingPageHtml = (formData) => {
  // テンプレートHTML
  const template = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.siteTitle || 'ランディングページ'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background-color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        
        .article-title {
            font-size: 2rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 1rem;
            line-height: 1.3;
        }
        
        .author-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .author-icon {
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
        }
        
        .author-icon img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .author-name {
            font-size: 1rem;
            color: #666;
        }
        
        .content-section {
            background-color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        
        .free-content {
            font-size: 1rem;
            line-height: 1.8;
            color: #333;
            margin-bottom: 2rem;
        }
        
        .free-content p {
            margin-bottom: 1rem;
        }
        
        .free-content strong {
            font-weight: 600;
            color: #1a1a1a;
        }
        
        .blurred-section {
            position: relative;
            padding: 2rem 0;
            margin-bottom: 0.5rem;
        }
        
        .blurred-content {
            position: relative;
            color: #666;
            line-height: 1.8;
            user-select: none;
        }
        
        .blurred-content::before {
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
        
        .blurred-content > * {
            filter: blur(3px);
        }
        
        .price-note {
            text-align: center;
            color: #666;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
        }
        
        .login-prompt {
            text-align: center;
            padding: 1rem 0;
        }
        
        
        .login-link {
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
        }
        
        .login-link:hover {
            background-color: #05a647;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(6, 199, 85, 0.4);
        }
        
        @media (max-width: 640px) {
            .container {
                padding: 10px;
            }
            
            .article-title {
                font-size: 1.5rem;
            }
            
            .header, .content-section {
                padding: 1.5rem;
            }
            
            .login-link {
                padding: 0.875rem 2rem;
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="article-title">${escapeHtml(formData.siteTitle)}</h1>
            <div class="author-info">
                ${generateAuthorIcon(formData)}
                <span class="author-name">${escapeHtml(formData.name)}</span>
            </div>
        </div>
        
        <div class="content-section">
            <div class="free-content">
                ${formatContent(formData.content)}
            </div>
            
            <div class="blurred-section">
                <div class="blurred-content">
                    ${escapeHtml(formData.blurContent)}
                </div>
            </div>
            
            <div class="price-note">
                続きは${formData.unpublishedNum1 || '0'}文字 + 画像${formData.unpublishedNum2 || '0'}枚
            </div>
            
            <div class="login-prompt">
                <a href="${escapeHtml(formData.lineUrl)}" class="login-link">LINE友達追加して続きを読む</a>
            </div>
        </div>
    </div>
</body>
</html>`

  return template
}

// HTMLエスケープ関数
const escapeHtml = (str) => {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// 著者アイコンの生成
const generateAuthorIcon = (formData) => {
  if (formData.iconImage) {
    return `<div class="author-icon"><img src="${formData.iconImage}" alt="${escapeHtml(formData.name)}" /></div>`
  } else {
    const initial = formData.name ? formData.name.charAt(0).toUpperCase() : ''
    return `<div class="author-icon">${initial}</div>`
  }
}

// コンテンツのフォーマット
const formatContent = (content) => {
  if (!content) return ''
  
  // 段落を分割
  const paragraphs = content.split(/\n\n+/)
  
  // 各段落を処理
  const formattedParagraphs = paragraphs.map(paragraph => {
    // **強調**を<strong>に変換
    let formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // 箇条書きの処理
    if (formatted.startsWith('・') || formatted.startsWith('- ')) {
      const items = formatted.split('\n').filter(item => item.trim())
      const listItems = items.map(item => {
        const text = item.replace(/^[・\-]\s*/, '')
        return `<li>${escapeHtml(text)}</li>`
      }).join('')
      return `<ul style="margin-bottom: 1rem; padding-left: 1.5rem;">${listItems}</ul>`
    }
    
    // 通常の段落
    return `<p>${escapeHtml(formatted)}</p>`
  })
  
  return formattedParagraphs.join('')
}