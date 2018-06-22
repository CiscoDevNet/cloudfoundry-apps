using System;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Http;

using System.Collections.Generic;
using System.Threading.Tasks;

public partial class _Default : System.Web.UI.Page
{

    protected static HttpClient _httpClient;
    protected static HttpClient HttpClient
    {
        get
        {
            if (_httpClient != null) return _httpClient;
            _httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(30 * 1000) };
            return _httpClient;
        }
    }

    private async Task<string> GetResponse(string uri)
    {
        return await HttpClient.GetStringAsync(new Uri(uri));
    }


    public static bool CheckForInternetConnection()
    {
        try
        {
            using (var client = new System.Net.WebClient())
            using (client.OpenRead("http://clients3.google.com/generate_204"))
            {
                return true;
            }
        }
        catch
        {
            return false;
        }
    }


    protected void Page_Load(object sender, EventArgs e)
    {
        // Get environment variables and dump them
        IDictionary vars = System.Environment.GetEnvironmentVariables();
        System.Environment.GetEnvironmentVariables();
        foreach (DictionaryEntry entry in vars)
        {
            // add to querystring all to dump all environment variables
            if (Request.QueryString["all"]!=null)
                Response.Write(entry.Key + " = " + entry.Value + "<br>");
        }
        //Response.Write(HttpRuntime.AppDomainAppPath + "\n");

        lblTime.Text = DateTime.Now.ToString();
        lblDotNetVersion.Text = Environment.Version.ToString();
        lblPort.Text = Environment.GetEnvironmentVariable("PORT");
        lblInstanceID.Text = Environment.GetEnvironmentVariable("INSTANCE_GUID");
        lblInstanceIndex.Text = Environment.GetEnvironmentVariable("INSTANCE_INDEX");
        lblInstanceStart.Text =  DateTime.Now.Subtract(TimeSpan.FromMilliseconds(Environment.TickCount)).ToString();
        lblBoundServices.Text = Environment.GetEnvironmentVariable("VCAP_SERVICES");


        //GetResponse("http://google.com");
        Response.Write(CheckForInternetConnection());
    }
    protected void btnKill_Click(object sender, EventArgs e)
    {
        log("Kaboom.");
        Environment.Exit(-1);
    }

    private void log(string message)
    {
        Console.WriteLine(message);
    }
}