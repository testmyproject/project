using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Entities.Menu;

namespace Senparc.Weixin.MP.Pfizer.CommonService.CustomMessageHandler
{
    public class CustomMenuHandler
    {
        public string CreateMenu()
        {
            //Get Token
            string appId = "wx90bab8d8e908746f";
            string appSecret = "1c3b074bfb204f45eb6621749896cf3d";

            string jsonString= @"{""menu"":
                                        {""button"":
                                            [   {""name"":""会员"",""sub_button"":
                                                        [   {""type"":""click"",""name"":""声明"",""key"":""Pfizer_Declaration"",""sub_button"":[]},
                                                            {""type"":""click"",""name"":""注册"",""key"":""Pfizer_ZhuCe"",""sub_button"":[]},
                                                            {""type"":""click"",""name"":""帮助"",""key"":""Pfizer_Help"",""sub_button"":[]}
                                                        ]
                                                },
                                                {""name"":""MI"",""sub_button"":
                                                        [   {""type"":""click"",""name"":""MI"",""key"":""Pfizer_MI"",""sub_button"":[]},
                                                            {""type"":""click"",""name"":""提出咨询"",""key"":""Pfizer_ProvideQuery"",""sub_button"":[]},
                                                            {""type"":""click"",""name"":""我的咨询"",""key"":""Pfizer_MyQuery"",""sub_button"":[]},
                                                            {""type"":""click"",""name"":""工具箱"",""key"":""Pfizer_ToolBox"",""sub_button"":[]}
                                                        ]
                                                },
                                                {""name"":""互动"",""sub_button"":
                                                        [   {""type"":""click"",""name"":""贺卡"",""key"":""Pfizer_Card"",""sub_button"":[]},
                                                            {""type"":""click"",""name"":""竞答"",""key"":""Pfizer_Competition"",""sub_button"":[]}
                                                        ]
                                                }
                                            ]
                                        }
                                }";
            try
            {
                if (!AccessTokenContainer.CheckRegistered(appId))
                {
                    AccessTokenContainer.Register(appId, appSecret);
                }
                var result = AccessTokenContainer.GetTokenResult(appId); //CommonAPIs.CommonApi.GetToken(appId, appSecret);

                var bg = CommonAPIs.CommonApi.GetMenuFromJson(jsonString).menu;

               WxJsonResult result2 = CommonAPIs.CommonApi.CreateMenu(result.access_token, bg);
               // return "ddddddd";
               return result2.errmsg + result2.errcode;
                //return result.access_token;

                //也可以直接一步到位：
                //var result = AccessTokenContainer.TryGetToken(appId, appSecret);
                //return Json(result, JsonRequestBehavior.AllowGet);
                //return result.access_token;
            }
            catch (Exception ex)
            {
                //TODO:为简化代码，这里不处理异常（如Token过期）
                //return Json(new { error = "执行过程发生错误！" }, JsonRequestBehavior.AllowGet);
                return "执行过程发生错误！" + ex.Message;
            }
        }

        //Set Menu
        
    }
}
