package main

import (
	appd "appdynamics"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"
)

func helloWorld(w http.ResponseWriter, r *http.Request) {
	bt := appd.StartBT("/", "")
	time.Sleep(time.Duration(rand.Intn(5)) * time.Millisecond)
	fmt.Fprintf(w, "Hello World")
	appd.EndBT(bt)
}

func main() {
	cfg := appd.Config{}

	cfg.AppName = os.Getenv("APPD_APPLICATION_NAME")
	cfg.TierName = os.Getenv("APPD_TIER_NAME")
	cfg.NodeName = os.Getenv("APPD_NODE_NAME") + ":" + os.Getenv("CF_INSTANCE_INDEX")
	port, err := strconv.ParseInt(os.Getenv("APPD_CONTROLLER_PORT"), 10, 16)

	if err != nil {
		port = 8080
	}
	cfg.Controller.Host = os.Getenv("APPD_CONTROLLER_HOST")
	cfg.Controller.Port = uint16(port)
	cfg.Controller.Account = os.Getenv("APPD_ACCOUNT_NAME")
	cfg.Controller.AccessKey = os.Getenv("APPD_ACCOUNT_ACCESS_KEY")
	cfg.InitTimeoutMs = 1000

	err = appd.InitSDK(&cfg)
	if err != nil {
		fmt.Println(err)
	}

	http.HandleFunc("/", helloWorld)
	http.ListenAndServe(":8080", nil)
}
