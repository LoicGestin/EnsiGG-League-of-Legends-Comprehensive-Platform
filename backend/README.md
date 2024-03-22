## Contribution

Please install [Python](https://www.python.org/).

Please install [pipx](https://pipx.pypa.io/stable/installation/).

Please install [poetry](https://python-poetry.org/docs).

Please install VSCode extensions:

- Black Formatter
- isort
- Python
- Pylance
- Even Better TOML

To install or update dependencies:

```shell
poetry install
```

```shell
poetry install --update
```

Make sure to do and have virtualenvs.in-project = true

Change your python interpreter to the .venv one.

```shell
poetry config --list
poetry config virtualenvs.in-project true
poetry config virtualenvs.options.system-site-packages true
```
