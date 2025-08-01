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
        <Image 
          src="/next.svg" 
          alt="Next.js Logo" 
          width={200} 
          height={100}
          priority
        />
        <br />
        <Image 
          src="/vercel.svg" 
          alt="Vercel Logo" 
          width={100} 
          height={50}
        />
      </div>
      
      {/* 通常のimgタグでのテスト */}
      <div style={{ marginTop: '20px' }}>
        <h2>Regular img tag test</h2>
        <img src="/globe.svg" alt="Globe" width="50" height="50" />
        <img src="/file.svg" alt="File" width="50" height="50" />
      </div>
    </div>
  )
}