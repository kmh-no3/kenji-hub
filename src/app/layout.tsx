import type { Metadata } from 'next'
import './globals.css'
import { GitHubPagesRouter } from '@/components/GitHubPagesRouter'

export const metadata: Metadata = {
  title: 'HOSODA Kenji',
  description: 'Next.js、Docker、TypeScriptなど、モダンなWeb開発技術について実践的な内容を発信する技術ブログです。',
  keywords: ['Next.js', 'React', 'TypeScript', 'Docker', 'Web開発', '技術ブログ'],
  authors: [{ name: '細田健司' }],
  openGraph: {
    title: 'HOSODA Kenji',
    description: 'モダンなWeb開発技術について実践的な内容を発信',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <GitHubPagesRouter />
        {children}
      </body>
    </html>
  )
} 