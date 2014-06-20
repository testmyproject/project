//////////////////////////////////////////////////////////////////////////
/// Copyright, (c) Ims Inc., 2013 
/// All rights reserved. 
/// 
/// \author jhmiao@cn.imshealth.com
//
/// \file DBOperation.cs
///
/// \brief interface to operate db
/// 
/// \version 1
/// \data  Feb 16, 2013 
//////////////////////////////////////////////////////////////////////////
using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.Text;
using System.Collections;
using System.Configuration;

namespace Senparc.Weixin.MP.Pfizer.CommonService
{
    public class AccessMSSql
    {
        //与SQL Server的连接字符串设置
        private static string _connString = @"Server=Localhost,1433; Database=PfizerWeiXin; User Id=sa; password=Mjh811006;Connect Timeout=600;";
        //private static string _connString = @"Server=54.244.220.174,1433; Database=Test; User Id=ChineseStock; password=ChineseStock123456$;Connect Timeout=600;";
        private static bool _logFlag=false;
        private static SqlConnection _connection = null;

        public AccessMSSql()
        {
            // _logFlag = false;
            //_connString = @"Server=localhost; Database=ChineseStock; User Id=ChineseStock; password=ChineseStock123456$;Connect Timeout=30;";
            //_connString = @"Server=localhost; Database=Test; User Id=sa; password=Mjh811006;Connect Timeout=30;"; 
        }

       
        /// <summary>
        /// Get DB Connection
        /// </summary>
        /// <returns></returns>
        private static SqlConnection GetDBConnection()
        {
            try
            {
                if (_connection == null || _connection.State == ConnectionState.Closed)
                {
                    _connection = new SqlConnection(_connString);
                    _connection.Open();
                }
                return _connection;
            }
            catch (Exception ex)
            {
                // MessageBox.Show(ex.Message, "数据库连接失败");
                Console.WriteLine(ex.Message);
                throw;
            }
        }


        /// <summary>
        /// 用于执行Insert,delete,truncate,update
        /// </summary>
        /// <param name="strSql"></param>
        /// <returns></returns>
        public static int  DBExecute(string strSql)
        {
            int result = 0;

            string errMsg = string.Empty;

            //需要改动
            SqlConnection conn = GetDBConnection();

            SqlTransaction trans = conn.BeginTransaction();
            try
            {

                SqlCommand cmd = new SqlCommand(strSql, conn, trans);
                result = cmd.ExecuteNonQuery();
                trans.Commit();
            }
            catch (Exception e)
            {
                trans.Rollback();
                conn.Close();
                Console.WriteLine(e.Message);
            }
            finally
            {
                conn.Close();
            }

            conn.Close();
            return result;
        }


        /// <summary>
        /// execute procedure
        /// </summary>
        /// <param name="strSql"></param>
        /// <param name="username"></param>
        public static void procedureExecute(string strSql, string username)
        {
            int result = 0;
            string errMsg = string.Empty;

            //需要改动
            SqlConnection conn = GetDBConnection();

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }

            SqlTransaction trans = conn.BeginTransaction();
            try
            {

                SqlCommand cmd = new SqlCommand(strSql, conn, trans);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@usr", SqlDbType.VarChar).Value = username.ToString();
                cmd.Parameters.Add("@para", SqlDbType.VarChar).Value = "";
                result = cmd.ExecuteNonQuery();
                trans.Commit();
            }
            catch (Exception e)
            {
                trans.Rollback();
                conn.Close();
                Console.WriteLine(e.Message);
            }
            finally
            {
                conn.Close();
            }

            conn.Close();
            /*return result;*/
        }

        /// <summary>
        /// Excute sql 
        /// </summary>
        /// <param name="strSql"></param>
        /// <param name="recordLog">if ture, write log</param>
        /// <returns></returns>
        public static DataTable DBSelect(string strSql, string title = null)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(_connString))
            {
                using (SqlCommand cmd = new SqlCommand(strSql, con))
                {
                 
                    cmd.CommandType = CommandType.Text;
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(ds);
                    }
                }
                return ds.Tables[0];
            }
        }
    }

    public class WeiXinUser
    {
        string _code;
        string _date;
        string _open;
        string _heigh;
        string _low;
        string _close;
        string _volume;
        string _value;

        public WeiXinUser()
        {

        }

        public WeiXinUser(string[] item)
        {
            _code = item[0];
            _date = item[1];
            _open = item[2];
            _heigh = item[3];
            _low = item[4];
            _close = item[5];
            _volume = item[6];
            _value = item[7];
        }

        public bool Insert(string type)
        {
            string sql;

            if (type == "SH")
                sql = "insert into shase ";
            else
                sql = "insert into sznse ";

            sql += "values ('" + _code + "','" + _date + "','" + _open + "','" + _heigh
                        + "','" + _low + "','" + _close + "','" + _volume + "','" + _value + "')";

            AccessMSSql.DBExecute(sql);
            return true;
        }

        public bool IsCertified(string formUserName)
        {
            string sql;
            sql = "select * from weixin_users where openid='" + formUserName + "' and certified =1";

            DataTable db = AccessMSSql.DBSelect(sql);
            if (db.Rows == null || db.Rows.Count == 0)
                return false;

            return true;
        }

    }

}
