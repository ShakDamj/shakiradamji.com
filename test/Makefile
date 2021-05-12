build:
	deno run --allow-read=. --allow-write=./dist tools/build.tsx

# run me as
# make -j2 dev
dev: start-server watch

watch:
	deno run --allow-read=. --allow-write=./dist --allow-run tools/dev.tsx

start-server: build
	cd dist && live-server
