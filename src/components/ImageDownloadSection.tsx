import { useRef, useState, type ReactNode } from 'react'
import { toPng } from 'html-to-image'
import {
  containerStyle,
  diagramWrapperStyle,
  downloadButtonStyle,
} from '../styles/imageDownloadStyles'

type ImageDownloadSectionProps = {
  children: ReactNode
  fileName?: string
  buttonText?: string
  loadingText?: string
}

export function ImageDownloadSection({
  children,
  fileName = 'sequence-diagram.png',
  buttonText = 'PNGをダウンロード',
  loadingText = '生成中...',
}: ImageDownloadSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!wrapperRef.current || isDownloading) {
      return
    }

    setIsDownloading(true)

    try {
      const dataUrl = await toPng(wrapperRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })

      const link = document.createElement('a')
      link.download = fileName
      link.href = dataUrl
      link.click()
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
    </section>
  )
}
