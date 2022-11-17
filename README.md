# Shakira Damji website

## Prerequisites
- Make
- Homebrew
- Deno

## Get Started

```sh
make install-deps
```

and run with

```sh
make
```


## Structure

Pages are located in `src/pages/`

- `myFolder/index.tsx` defines the page to be shown when you open `domain.com/myFolder`
- `myFolder/_template.tsx` will be used when a markdown file inside `myFolder` is opened (I.E. `domain.com/myFolder/potato` loads `myFolder/potato.md` with `_template.tsx`)


## Troubleshooting

### lock.json file outdated

```
error: The source code is invalid, as it does not match the expected hash in the lock file.
```

Solve with

```sh
make lock
```
