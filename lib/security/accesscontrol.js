const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { MySQLClient, sql } = require("../database/client.js");
const PRIVILEGE = { // 権限
  NORMAL: "normal"// 通常権限
};
let initialize, authenticate, authorize;

passport.serializeUser((user, done) => { // サーバーからクライアントへレスポンスするときセッションへ保持する処理
  done(null, user); // 今回は何もしない
});

passport.deserializeUser((user, done) => { // クライアントからサーバーへれクエストするときにセッションから情報を復元する処理
  done(null, user); // 今回は何もしない
});

passport.use( // 認証方法を設定する
  "local-strategy", // ログイン処理で利用する認証方法を呼び出す為のキー
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done) => {  // 認証方法の具体実装(メインの処理)
    let results, user;
    try {
      results = await MySQLClient.executeQuery(
        await sql("SELECT_USER_BY_EMAIL"),
        [email]
      );
    } catch(err) {
      return done(err);
    }
    if(results.length === 1 && // 成功パターン
      password === results[0].password){
        user = {
          id: results[0].id,
          name: results[0].username,
          email: results[0].email,
          certification: results[0].certifyAt,
          permissions: [PRIVILEGE.NORMAL]
        };
        req.session.regenerate(err => { // ログイン後セッションの再作成
          if(err) // エラーになった場合はエラーで返す
            done(err);  
          else
            done(null, user); // -> authenticate() -> serializeUser()
        });
    } else { // 失敗パターン(パスワードが一致しなかったなどの場合) // -> authenticate() -> serializeUser()
      done(null, false, req.flash("message", "Incorrect username or password"));
    }
  })
);

initialize = _ => {
  return [
    passport.initialize(),
    passport.session(),
    (req, res, next) => { // ログイン状態を確認しやすくするミドルウェア
      if(req.user) // ログイン状態が保存されているオブジェクト
        res.locals.user = req.user; // ユーザーの情報を引き渡す
      next();
    }
  ];
};

authenticate = _ => { // ログイン処理用ミドルウェアの初期化
  return passport.authenticate(
    "local-strategy",
    {
      successRedirect: "/", // 成功時のリダイレクト先
      failureRedirect: "/signin" // 失敗時のリダイレクト先URL
    }
  );
};

module.exports = {
  initialize,
  authenticate,
  authorize
};