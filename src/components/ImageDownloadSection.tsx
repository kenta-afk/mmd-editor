import { useRef, useState, type ReactNode } from 'react'
import { toPng } from 'html-to-image'
import {
  containerStyle,
  diagramWrapperStyle,
  downloadButtonStyle,
  errorTextStyle,
} from '../styles/imageDownloadStyles'

type ImageDownloadSectionProps = {
  children: ReactNode
  fileName?: string
  buttonText?: string
  loadingText?: string
  backgroundColor?: string
}

export function ImageDownloadSection({
  children,
  fileName = 'sequence-diagram.png',
  buttonText = 'PNGをダウンロード',
  loadingText = '生成中...',
  backgroundColor = '#ffffff',
}: ImageDownloadSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleDownload = async () => {
    if (!wrapperRef.current || isDownloading) {
      return
    }

    setIsDownloading(true)
    setErrorMessage(null)

    try {
      const dataUrl = await toPng(wrapperRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor,
      })

      const link = document.createElement('a')
      link.download = fileName
      link.href = dataUrl
      document.body.appendChild(link)
      try {
        link.click()
      } finally {
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('画像の生成に失敗しました。もう一度お試しください。')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section className={containerStyle}>
      <div ref={wrapperRef} className={diagramWrapperStyle}>
        {children}
      </div>
      <button
        type="button"
        className={downloadButtonStyle}
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? loadingText : buttonText}
      </button>
      {errorMessage && <p className={errorTextStyle}>{errorMessage}</p>}
    </section>
  )
}
