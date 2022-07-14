all: build
	make -j 2 watch start-server


build:
	@echo "Building..."
	deno run \
		--import-map=import-map.json \
		--allow-read \
		--allow-write=./dist \
		--lock=lock.json \
		--allow-net=esm.sh,cdn.esm.sh,deno.land,fonts.googleapis.com \
		src/generate/main.ts


watch:
	@echo "Watching ./src..."
	fswatch  -o src | xargs -n1 -I{} make build


start-server:
	@echo "Serving ./dist..."
	live-server --port=8088 -q dist --wait 300


lock:
	@echo "Locking dependencies..."
	deno run \
		--import-map=import-map.json \
		--allow-read \
		--allow-write=./dist \
		--reload \
		--lock=lock.json \
		--lock-write \
		--allow-net=esm.sh,cdn.esm.sh,deno.land,fonts.googleapis.com \
		src/generate/main.ts


install-deps:
	npm i -g live-server
	brew install fswatch
