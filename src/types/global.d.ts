// Mermaidライブラリのグローバル型定義
interface Window {
  mermaid?: {
    initialize: (config: any) => void;
    run: (config?: { nodes?: Element[]; suppressErrors?: boolean }) => Promise<void>;
  };
}
