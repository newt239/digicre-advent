# digicre-advent

https://advent-25.digicre.net/

## 開発方法

Node.js v24 以上、 pnpm v10 以上が必要です。

### 依存パッケージのインストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

### ビルド

```bash
pnpm build
```

ビルド後、静的ファイルは `.next/out` ディレクトリに出力されます。

**注意**: ビルド時にはデータベースからデータを取得します。`DATABASE_URL` 環境変数が設定されている必要があります。

## デプロイ

このアプリは完全にSSG（Static Site Generation）としてビルドされ、Cloudflare Pagesにデプロイされます。

### Cloudflare Pagesへのデプロイ

1. Cloudflareダッシュボードにログインし、**Workers & Pages** に移動します
2. **Create application** > **Pages** > **Connect to Git** を選択します
3. GitHubリポジトリを選択して接続します
4. ビルド設定：
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `pnpm build`
   - **Build output directory**: `.next/out`
   - **Root directory**: `/` (プロジェクトルート)
5. 環境変数の設定：
   - **Environment variables** セクションで `DATABASE_URL` を追加します
   - 値はNeonデータベースの接続URLを設定します
6. **Save and Deploy** をクリックします

### 自動デプロイ

`main` ブランチにpushすると、Cloudflare Pagesが自動的にビルドしてデプロイします。

### データの更新

データはデータベース（Neon）から取得されます。ビルド時にデータベースに接続してデータを取得し、静的HTMLとして出力します。

データを更新する場合は、データベースの内容を変更してから、GitHubにpushして再デプロイしてください。

### 編集機能の有効化

編集機能は `lib/config.ts` の `ENABLE_EDIT_MODE` フラグで制御できます。ただし、SSGモードでは編集機能は動作しません（静的サイトとして配信されるため、サーバーサイドの処理が実行されません）。編集機能を有効にする場合は、SSGモードを無効にし、サーバーサイドレンダリング（SSR）またはAPIルートを使用する必要があります。
