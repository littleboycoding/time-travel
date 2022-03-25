package main

import (
	"bytes"
	"encoding/base64"
	"image/jpeg"
	"os"
	"path"

	"github.com/kbinani/screenshot"
	"github.com/littleboycoding/time-travel/pkg/config"
	"github.com/mitchellh/mapstructure"
	"github.com/sqweek/dialog"
	"github.com/webview/webview"
)

type TimeTravelConfig struct {
	Interval  int    `json:"interval"`
	Monitor   int    `json:"monitor"`
	Directory string `json:"directory"`
}

func main() {
	defaultConfig := TimeTravelConfig{1, 0, "NONE"}
	c := config.Load("time-travel", defaultConfig)

	debug := true
	w := webview.New(debug)
	defer w.Destroy()

	w.Bind("getConf", func() TimeTravelConfig { return c.Config })
	w.Bind("updateConf", func(newConf map[string]any) {
		config := TimeTravelConfig{}
		mapstructure.Decode(newConf, &config)
		c.Update(config)
	})
	w.Bind("monitorInfo", func(display int) []any {
		img, err := screenshot.CaptureDisplay(display)
		if err != nil {
			panic(err)
		}

		buf := new(bytes.Buffer)

		if err := jpeg.Encode(buf, img, nil); err != nil {
			panic(err)
		}

		preview := base64.StdEncoding.EncodeToString(buf.Bytes())

		return []any{screenshot.NumActiveDisplays(), preview}
	})
	w.Bind("selectDirectory", func() string {
		dir, err := dialog.Directory().Title("Select project directory").Browse()
		if err != nil {
			print(err)
			return c.Config.Directory
		}

		return dir
	})
	w.Bind("getLatestSnapshot", func(n int) []string {
		entry, err := os.ReadDir(c.Config.Directory)
		if err != nil {
			panic(err)
		}

		if len(entry) == 0 {
			return []string{}
		}

		files := make([]string, n)
		for i, de := range entry[len(entry)-n:] {
			fullPath := path.Join(c.Config.Directory, de.Name())

			fh, err := os.ReadFile(fullPath)
			if err != nil {
				panic(err)
			}

			preview := base64.StdEncoding.EncodeToString(fh)

			files[i] = preview
		}

		return files
	})

	w.SetTitle("Time Travel")
	w.SetSize(800, 600, webview.HintFixed)
	w.Navigate("http://localhost:3000")
	w.Run()
}
