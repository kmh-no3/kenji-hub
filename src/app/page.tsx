import Image from 'next/image'

export default function Home() {
  const basePath = '/kenji-hub'
  
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
          src={`${basePath}/next.svg`}
          alt="Next.js Logo" 
          width={200} 
          height={100}
          priority
          unoptimized
        />
        <br />
        <Image 
          src={`${basePath}/vercel.svg`}
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
        <img src={`${basePath}/globe.svg`} alt="Globe" width="50" height="50" />
        <img src={`${basePath}/file.svg`} alt="File" width="50" height="50" />
        <img src={`${basePath}/window.svg`} alt="Window" width="50" height="50" />
      </div>
      
      {/* デバッグ情報 */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Debug Info</h3>
        <p>Base Path: {basePath}</p>
        <p>Asset Prefix: {basePath}/</p>
        <p>Build Time: {new Date().toLocaleString()}</p>
        <p>Image URLs:</p>
        <ul>
          <li>Next.js Logo: {basePath}/next.svg</li>
          <li>Vercel Logo: {basePath}/vercel.svg</li>
          <li>Globe: {basePath}/globe.svg</li>
          <li>File: {basePath}/file.svg</li>
          <li>Window: {basePath}/window.svg</li>
        </ul>
      </div>
    </div>
  )
}