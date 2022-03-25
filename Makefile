build:
	go build ./cmd/time-travel

build-web:
	cd web && npm run build
	mv web/build static

run:
	go run ./cmd/time-travel

clean:
	rm -f ./time-travel
	rm -rf ./static
