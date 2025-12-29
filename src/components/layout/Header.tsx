"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { navigationConfig } from '@/config/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // メニューが開いている間、ボディのスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // クリーンアップ
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-20">
          {/* 左側: サイトタイトルとナビゲーション */}
          <div className="flex items-center">
            {/* サイトタイトル */}
            <h1 className="text-base sm:text-2xl lg:text-3xl font-bold text-gray-900 mr-2 sm:mr-8 whitespace-nowrap tracking-wide sm:tracking-widest">
              <Link href="/projects" className="hover:text-blue-600 transition-colors">
                HOSODA KENJI
              </Link>
            </h1>
            {/* メインナビゲーション - デスクトップのみ表示 */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6">
              {navigationConfig.main.map((item) => (
                <strong key={item.href}>
                  {item.href === '#' ? (
                    <span
                      className="text-gray-400 cursor-not-allowed text-sm lg:text-base"
                      title="準備中"
                    >
                      {item.title}
                    </span>
                  ) : item.isActive ? (
                    <span className="text-gray-700 text-sm lg:text-base">{item.title}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base"
                    >
                      {item.title}
                    </Link>
                  )}
                </strong>
              ))}
            </nav>
          </div>

          {/* 右側: SNSリンクとハンバーガーメニュー */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-12">
            {/* SNSリンク - デスクトップのみ表示（モバイルでは非表示） */}
            <div className="hidden md:flex space-x-4 sm:space-x-6 lg:space-x-12">
              <span
                className="text-gray-400 cursor-not-allowed"
                aria-label="Twitter (未作成)"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </span>
              <a
                href={navigationConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <span
                className="text-gray-400 cursor-not-allowed"
                aria-label="Zenn (未作成)"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.264 23.771h4.984c.264 0 .498-.147.642-.382L19.614.874c.176-.293-.029-.667-.372-.667H14.24c-.264 0-.498.147-.642.382L.264 23.771zM17.916 23.419l3.254-5.436a.641.641 0 0 0-.642-.382h-4.984l5.436 5.818c.144.235.378.382.642.382h1.744z" />
                </svg>
              </span>
            </div>

            {/* ハンバーガーメニューボタン - メニューが開いている間は常に表示、閉じている時はモバイルのみ表示 */}
            <button
              onClick={toggleMenu}
              className={`${isMenuOpen ? 'z-[70]' : 'md:hidden'} p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors relative`}
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* フルスクリーンメニュー - メニューが開いている間は画面サイズに関係なく表示、下から上へスライド */}
      <div
        className={`fixed inset-0 bg-white z-[60] transition-all duration-500 ease-in-out ${isMenuOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible translate-y-full'
          }`}
        onClick={closeMenu}
      >
        <div className="h-full flex flex-col items-center justify-center">
          {/* 閉じるボタン */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors z-[70]"
            aria-label="メニューを閉じる"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* メニューアイテム */}
          <nav className="flex flex-col items-center space-y-8">
            {navigationConfig.main.map((item, index) => (
              <div
                key={item.href}
                className={`transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.href === '#' ? (
                  <span
                    className="block text-3xl sm:text-4xl font-bold text-gray-400 cursor-not-allowed"
                    title="準備中"
                  >
                    {item.title}
                  </span>
                ) : item.isActive ? (
                  <span className="block text-3xl sm:text-4xl font-bold text-gray-700">
                    {item.title}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-3xl sm:text-4xl font-bold text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* SNSアイコン */}
          <div
            className={`flex items-center justify-center space-x-8 mt-12 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionDelay: `${navigationConfig.main.length * 100}ms` }}
          >
            {/* Twitter */}
            {navigationConfig.social.twitter !== 'https://twitter.com/your_twitter' ? (
              <a
                href={navigationConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-500 transition-colors"
                aria-label="Twitter"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            ) : (
              <span
                className="text-gray-400 cursor-not-allowed"
                aria-label="Twitter (未作成)"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </span>
            )}

            {/* GitHub */}
            <a
              href={navigationConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Zenn */}
            {navigationConfig.social.zenn !== 'https://zenn.dev/your_zenn' ? (
              <a
                href={navigationConfig.social.zenn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-500 transition-colors"
                aria-label="Zenn"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.264 23.771h4.984c.264 0 .498-.147.642-.382L19.614.874c.176-.293-.029-.667-.372-.667H14.24c-.264 0-.498.147-.642.382L.264 23.771zM17.916 23.419l3.254-5.436a.641.641 0 0 0-.642-.382h-4.984l5.436 5.818c.144.235.378.382.642.382h1.744z" />
                </svg>
              </a>
            ) : (
              <span
                className="text-gray-400 cursor-not-allowed"
                aria-label="Zenn (未作成)"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.264 23.771h4.984c.264 0 .498-.147.642-.382L19.614.874c.176-.293-.029-.667-.372-.667H14.24c-.264 0-.498.147-.642.382L.264 23.771zM17.916 23.419l3.254-5.436a.641.641 0 0 0-.642-.382h-4.984l5.436 5.818c.144.235.378.382.642.382h1.744z" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 