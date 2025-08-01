import Image from 'next/image'

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hello, Next.js!</h1>
      <p>This is a test page to verify Next.js is working correctly.</p>
      <p>If you can see this, Next.js is working properly!</p>
      
      {/* 画像の読み込みテスト */}
      <div style={{ marginTop: '20px' }}>
        <h2>Image Test</h2>
        <p>Testing Next.js Image component:</p>
        <Image 
          src="/next.svg" 
          alt="Next.js Logo" 
          width={200} 
          height={100}
          priority
          unoptimized
        />
        <br />
        <Image 
          src="/vercel.svg" 
          alt="Vercel Logo" 
          width={100} 
          height={50}
          unoptimized
        />
      </div>
      
      {/* 通常のimgタグでのテスト */}
      <div style={{ marginTop: '20px' }}>
        <h2>Regular img tag test</h2>
        <p>Testing regular img tags:</p>
        <img src="/globe.svg" alt="Globe" width="50" height="50" />
        <img src="/file.svg" alt="File" width="50" height="50" />
        <img src="/window.svg" alt="Window" width="50" height="50" />
      </div>
      
      {/* デバッグ情報 */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Debug Info</h3>
        <p>Base Path: /kenji-hub</p>
        <p>Asset Prefix: /kenji-hub/</p>
        <p>Build Time: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}