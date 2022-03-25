package config

import (
	"encoding/json"
	"os"
	"path"

	"github.com/kirsle/configdir"
)

type Config[c any] struct {
	Config     c
	configDir  string
	configPath string
}

func (c *Config[conf]) Update(newConfig conf) {
	c.Config = newConfig

	if _, err := os.Stat(c.configPath); os.IsNotExist(err) {
		fh, err := os.Create(c.configPath)
		if err != nil {
			panic(err)
		}
		defer fh.Close()

		encoder := json.NewEncoder(fh)
		encoder.Encode(newConfig)
	} else {
		fh, err := os.OpenFile(c.configPath, os.O_WRONLY, os.ModeType)
		if err != nil {
			panic(err)
		}
		defer fh.Close()

		encoder := json.NewEncoder(fh)
		encoder.Encode(newConfig)
	}
}

func GetConfigPath(name string) (string, string) {
	configDir := configdir.LocalConfig(name)
	err := configdir.MakePath(configDir)
	if err != nil {
		panic(err)
	}

	configPath := path.Join(configDir, "config.json")

	return configDir, configPath
}

func Load[c any](name string, defaultConfig c) Config[c] {
	configDir, configPath := GetConfigPath(name)

	config := Config[c]{defaultConfig, configDir, configPath}

	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		fh, err := os.Create(configPath)
		if err != nil {
			panic(err)
		}
		defer fh.Close()

		encoder := json.NewEncoder(fh)
		encoder.Encode(defaultConfig)
	} else {
		fh, err := os.Open(configPath)
		if err != nil {
			panic(err)
		}
		defer fh.Close()

		decoder := json.NewDecoder(fh)
		decoder.Decode(&config.Config)
	}

	return config
}
