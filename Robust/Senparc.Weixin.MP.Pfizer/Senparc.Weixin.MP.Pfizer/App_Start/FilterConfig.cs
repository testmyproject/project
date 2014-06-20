using System.Web;
using System.Web.Mvc;

namespace Senparc.Weixin.MP.Pfizer
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}