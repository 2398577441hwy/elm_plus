import fetch from "../config/fetch";

// 获取首页所有城市
export const groupcity = () => fetch('/v1/cities', {
	type: 'group'
});

// 获取密码登录的图片验证码
export const getcaptchas = () => fetch('/v1/captchas', {},'POST');

// 密码登录
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');

