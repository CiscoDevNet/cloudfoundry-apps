package main

import (
    "fmt"
    "time"
    "net/http"
    "math/rand"
    appd "appdynamics"
)

func helloWorld(w http.ResponseWriter, r *http.Request){
    bt := appd.StartBT("/", "")
    time.Sleep(time.Duration(rand.Intn(5)) * time.Millisecond)    
    fmt.Fprintf(w, "Hello World")
    appd.EndBT(bt)
}

func main() {
    cfg := appd.Config{}

    cfg.AppName = os.Getenv("APPD_")
    cfg.TierName = "cf-go-tier"
    cfg.NodeName = "cf-go-node"
    cfg.Controller.Host = "master-onprem-controller.e2e.appd-test.com"
    cfg.Controller.Port = 8090
    cfg.Controller.Account = "customer1"
    cfg.Controller.AccessKey = "76d63d49-8e86-42af-91b1-54fbbbd607c2"
    cfg.UseConfigFromEnv = false
    cfg.InitTimeoutMs = 1000

    err := appd.InitSDK(&cfg)
    if err != nil {
        // For the sample, we exit when the SDK doesn't initialize. However, it's
        // perfectly safe to continue your program even when the SDK fails to
        // initialize.
        fmt.Println(err)
        return
    }

    http.HandleFunc("/", helloWorld)
    http.ListenAndServe(":8080", nil)
}
