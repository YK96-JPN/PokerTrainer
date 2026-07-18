# ポーカー道場 PWA パッケージ

トーナメント版(dojo.html)とライブキャッシュ版(cash.html)を、Androidにアプリとしてインストールできる形にした一式です。

## 中身

```
index.html            ポータル(2つの道場への入口+インストール案内)
dojo.html             ♠ 特訓道場(トーナメント特化)
cash.html             ♦ キャッシュ道場(ライブキャッシュ特化)
manifest.webmanifest  アプリ名・アイコン・全画面表示の定義
sw.js                 サービスワーカー(オフライン対応)
icons/                アプリアイコン(192px / 512px)
```

## 公開手順(GitHub Pages・無料)

1. GitHubアカウントで新しいリポジトリを作成(例: `poker-dojo`。Publicにする)
2. このフォルダの中身を全部アップロード(Web画面の「Add file → Upload files」でドラッグ&ドロップでOK)
3. リポジトリの Settings → Pages → Branch を `main` / `(root)` にして Save
4. 数分後に `https://<ユーザー名>.github.io/poker-dojo/` が公開される

### 代替: Netlify(こちらも無料)
[Netlify Drop](https://app.netlify.com/drop) にこのフォルダをドラッグ&ドロップするだけ。

## Androidにインストール

1. 公開URLをChromeで開く
2. 右上メニュー(⋮) → **「ホーム画面に追加」**(または「アプリをインストール」)
3. ホーム画面のアイコンから全画面のアプリとして起動

- オフラインでも動作します(初回表示時にキャッシュされる)
- 進捗(レート・XP・ライトナー箱)は端末のlocalStorageに自動保存
- クローズドテスト等は一切不要です

## 更新のしかた

1. 新しい `dojo.html` / `cash.html` をリポジトリにアップロードして上書き
2. `sw.js` の1行目 `poker-dojo-pwa-v1` の数字を上げる(v1→v2)
3. アプリを開き直せば新版に切り替わる(HTMLはネットワーク優先で取得する設計)

## メモ

- サービスワーカーはHTTPS(またはlocalhost)でのみ動作します。file://で直接開いた場合、アプリ自体と進捗保存は動きますが、オフラインキャッシュとインストールは無効です。
- 進捗はブラウザ(オリジン)ごとの保存です。URLが変わると進捗は引き継がれません。
