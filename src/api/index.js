import Request from "@/request";
import {REACT_APP_FIREBASE_API_KEY} from "@/config";

//登录
export const login = (params) => Request.post('/Login/login',params);

//注册
export const register = (params) => Request.post('/Login/register',params);

//修改密码
export const changePwd = (params) => Request.post('/Login/findPassword',params);

//发送验证码
export const sendCode = (params) => Request.post('/Sms/sendRegMsg',params);

//发送验证码(忘记密码)
export const sendCodeForgot = (params) => Request.post('/Sms/findPwdMsg',params);

//会员信息
export const userInfo = (params) => Request.post('/User/getUserInfo',params);

//订单列表
export const orderList = (params) => Request.post('/Product/getUserOrder',params);

//用户订单列表
export const getUserOrderlis = (params) => Request.post('/Product/getUserOrderlis',params);

//积分奖励
export const integral = (params) => Request.post('/User/myWpReward',params);

//商品列表
export const proList = (params) => Request.post('/Product/getIndexGoodsList',params);

//轮播图
export const banner = (params) => Request.post('/Index/banner',params);

//下单
export const pay = (params) => Request.post('/Product/buyProduct',params);

//商品详情
export const proDetail = (params) => Request.post('/Product/getGoodsDetail',params);

//修改登录/支付密码
export const editPwd = (params) => Request.post('/User/editPassword',params);

//关于我们
export const about = (params) => Request.post('/Help/aboutus',params);

//公告列表
export const notice = (params) => Request.post('/News/index',params);

//上传图片
export const upload = (params) => Request.post('/Upload/uploadImg',params,{error:false},{config:'multipart/form-data'});

//实名认证
export const realname = (params) => Request.post('/User/certification',params);

//充值信息
export const depositInfo = (params) => Request.post('/Coin/rechanginIndex',params);

//充值
export const deposit = (params) => Request.post('/Coin/rechangeint',params);

//充值记录
export const depositRecord = (params) => Request.post('/Coin/rechanginLog',params);

//提现信息
export const withdrawInfo = (params) => Request.post('/Coin/transferOutIndex',params);

//提现
export const withdraw = (params) => Request.post('/Coin/withdrawalOut',params);

//提现记录
export const withdrawRecord = (params) => Request.post('/Coin/withdrawalOutLog',params);

//收藏
export const collet = (params) => Request.post('/Product/setCollect',params);

//收藏列表
export const colletList = (params) => Request.post('/Product/collectList',params);

//邮箱
export const ourEmail = (params) => Request.post('/Contact/contactmail',params);

//联系我们
export const contactUs = (params) => Request.post('/Contact/addMessage',params);

//faq
export const faqList = (params) => Request.post('/Contact/faList',params);

//faq详情
export const faqContent = (params) => Request.post('/Contact/faInfo',params);

//订单卖出
export const sellOrder = (params) => Request.post('/Product/confirmOrder',params);
//确认订单
export const confirmOrder = (params) => Request.post('/Product/confirmOrder',params);
//隐私政策
export const privacy = (params) => Request.post('/Login/regnews',params);

export const sendGoogleSms = (data) => fetch(
  `https://www.googleapis.com/identitytoolkit/v3/relyingparty/sendVerificationCode?key=${REACT_APP_FIREBASE_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
)

export const verifyGoogleMsg = (data) => fetch(
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=${REACT_APP_FIREBASE_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
)