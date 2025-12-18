# ブランチ戦略の設定ガイド

## 概要

このドキュメントでは、Kenji Hubのブランチ戦略をGitHub上で設定する方法を説明します。

## 現在のブランチ構成

Kenji Hubでは、**GitHub Flow**を採用しています：

- **main**: 本番環境にデプロイされるブランチ
- **feature/***: 新機能や修正を開発するブランチ

## GitHub上での設定

### 1. ブランチ保護ルールの設定

`main`ブランチを保護するために、以下の設定を推奨します：

1. GitHubリポジトリの「Settings」→「Branches」に移動
2. 「Add branch protection rule」をクリック
3. ブランチ名パターンに `main` を入力
4. 以下の設定を有効化：
   - ✅ **Require a pull request before merging**
     - Require approvals: 1（個人開発の場合は任意）
   - ✅ **Require status checks to pass before merging**
     - 必要なチェック：
       - `build` (GitHub Actionsのビルドジョブ)
   - ✅ **Require conversation resolution before merging**
   - ✅ **Include administrators**（管理者も保護ルールに従う）

### 2. デフォルトブランチの確認

1. GitHubリポジトリの「Settings」→「Branches」に移動
2. 「Default branch」が `main` になっていることを確認
3. 必要に応じて変更

### 3. ブランチ命名規則

新機能や修正を開発する際は、以下の命名規則に従います：

```
feature/機能名
例: feature/add-blog-search
例: feature/improve-navigation
```

**命名規則のベストプラクティス：**
- 小文字とハイフンを使用
- 簡潔で分かりやすい名前
- 機能を説明する名前

## ブランチの作成と削除

### 新機能ブランチの作成

```bash
# mainブランチから最新の状態を取得
git checkout main
git pull origin main

# 新機能ブランチを作成
git checkout -b feature/新機能名

# 開発開始
```

### ブランチの削除

```bash
# ローカルブランチの削除
git branch -d feature/ブランチ名

# リモートブランチの削除
git push origin --delete feature/ブランチ名
```

### マージ後のブランチ削除

プルリクエストをマージした後、GitHub上で自動削除する設定：

1. GitHubリポジトリの「Settings」→「General」に移動
2. 「Pull Requests」セクションで以下を有効化：
   - ✅ **Automatically delete head branches**

## 現在のブランチ状況

### アクティブなブランチ

- `main`: 本番環境にデプロイされるブランチ

### 削除済みブランチ

- `gh-pages`: GitHub Actionsでデプロイしているため不要（削除済み）

## トラブルシューティング

### ブランチが削除できない場合

```bash
# 強制削除（注意：未マージの変更がある場合）
git branch -D feature/ブランチ名
```

### リモートブランチが表示されない場合

```bash
# リモートブランチ情報を更新
git fetch --prune
```

## 参考資料

- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [GitHub Branch Protection Rules](https://docs.github.com/ja/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)


